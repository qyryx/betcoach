import axios from 'axios';
import { load } from 'cheerio';
import { config, FORTUNA_OFFER_URL, FORTUNA_RESULTS_URL } from '../config';
import { createMatch, getMatches, deleteMatches } from '../db/match';
import { createResult, getResults, deleteResults } from '../db/result';
import { uniqueRates } from '../helpers/help';

function assignRatesToMatches(ids, matches, dates, oldRates, event) {
    try {
        const matchesWithRates = [];
        const rateIds6 = ['1', '0', '2', '10', '02', '12']
        const rateIds2 = ['1', '2']
        const rateIds = event.rates === 6 ? rateIds6 : rateIds2
        const rates = uniqueRates(oldRates, rateIds.length);

        for (let i = 0; i < matches.length; i++) {
            const id = ids[i];
            const match = matches[i];
            const date = dates[i];
            const matchRates = [];

            for (let j = 0; j < rateIds.length; j++) {
                const rateIndex = i * rateIds.length + j;
                const rate = rates[rateIndex];
                matchRates.push({ [rateIds[j]]: rate });
            }

            const matchObject = {
                id: id,
                title: match,
                rates: matchRates,
                date: date,
                category: event.category,
                sport: event.sport,
            };

            matchesWithRates.push(matchObject);
        }
        return matchesWithRates;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getFortunaMatches = async (event) => {
    try {
        const response = await axios(`${FORTUNA_OFFER_URL}${event.link}`);
        const html = response.data;
        const $ = load(html);
        const ids = [];
        const matches = [];
        const dates = [];
        const rates = [];

        $('.event-info-number', html).each(function () {
            let id = $(this).text()
            id = id.trim()
            ids.push(id)
        })

        $('.market-name', html).each(function () {
            let match = $(this).text();
            match = match.trim();
            match = match.substring(0, 32);
            matches.push(match);
        });

        $('.event-datetime', html).each(function () {
            let dateString = $(this).text();
            dateString = dateString.trim();
            let year = new Date().getFullYear();
            let [date, time] = dateString.split(" ");
            let [day, month] = date.split(".");
            let [hours, minutes] = time.split(':');
            let datetime = new Date(year, parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
            dates.push(datetime);
        });

        $('.odds-button', html).each(function () {
            let rate = $(this).text();
            rate = rate.trim();
            rates.push(rate);
        });

        const result = assignRatesToMatches(ids, matches, dates, rates, event);
        return result;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getFortunaResults = async (event) => {
    try {
        const response = await axios(`${FORTUNA_RESULTS_URL}${event.link}`);
        const html = response.data
        const $ = load(html)
        const ids = []
        const scores = []

        $('.event-info-number').each(function () {
            let id = $(this).text()
            id = id.trim()
            ids.push(id)
        })

        $('.col-result', html).each(function () {
            let score = $(this).text()
            score = score.trim()
            if (score === 'vrátený') {
                score = null
            }
            scores.push(score)
        })

        scores.shift()
        let results = []

        for (let i = 0; i < scores.length; i++) {
            const id = ids[i]
            const score = scores[i]
            const match = {
                id: id,
                result: score,
                sport: event.sport
            }
            results.push(match)
        }
        results = results.slice(0, 15)
        return results
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getOfferFromSource = async () => {
    try {
        console.log('fetching offer...');
        let offer = [];
        for (const event of config) {
            const data = await getFortunaMatches(event);
            offer = [...offer, ...data];
        }
        await deleteMatches();
        for (const item of offer) {
            await createMatch(item);
        }
        console.log('offer fetched successfully');
    } catch (err) {
        console.log(err);
    }
}

export const getOfferRefresh = async (req, res) => {
    try {
        const matches = await getMatches();
        return res.status(200).json(matches);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Bad request' });
    }
}

export const getResultsFromSource = async () => {
    try {
        console.log('fetching results...');
        let results = [];
        for (const event of config) {
            const data = await getFortunaResults(event);
            results = [...results, ...data];
        }
        await deleteResults();
        for (const item of results) {
            await createResult(item);
        }
        console.log('results fetched successfully');
    } catch (err) {
        console.log(err);
    }
}

export const getResultsRefresh = async (req, res) => {
    try {
        const results = await getResults();
        return res.status(200).json(results);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Bad request' });
    }
}