import axios from 'axios';
import { apiKey, regions, markets, oddsFormat, dateFormat, sportKeys } from '../config';

const requiredOutcomes = (outcomes, title) => {
    const outcomesLength = outcomes.length
    let requiredLength;
    if (title === 'NBA' || title === 'MMA') {
        requiredLength = 2
    } else {
        requiredLength = 3
    }
    return outcomesLength === requiredLength;
}

const parser = (matches) => {
    let newMatches = []
    matches.forEach(match => {
        if (match.bookmakers.length > 3) {
            let newMatch = {}
            newMatch.id = match.id
            newMatch.date = match.commence_time
            newMatch.sport_title = match.sport_title === 'EPL' ? 'Premier League - England' : match.sport_title
            newMatch.title = `${match.home_team} - ${match.away_team}`
            let bookmakers = []
            match.bookmakers.forEach(bookmaker => {
                if (requiredOutcomes(bookmaker.markets[0].outcomes, match.sport_title)) {
                    let newBookmaker = {}
                    let odds = []
                    newBookmaker.bookmaker = bookmaker.title
                    for (let i = 0; i < bookmaker.markets[0].outcomes.length; i++) {
                        odds.push((bookmaker.markets[0].outcomes[i].price).toFixed(2))
                    }
                    newBookmaker.odds = odds
                    bookmakers.push(newBookmaker)
                }
            })
            newMatch.bookmakers = bookmakers
            newMatches.push(newMatch)
        }
    })
    return newMatches
}

const getMatches = async (sportKey) => {
    try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
            params: { apiKey, regions, markets, oddsFormat, dateFormat }
        });
        console.log('Remaining requests', response.headers['x-requests-remaining']);
        return parser(response.data);
    } catch (error) {
        console.log('Error status', error.response.status);
        console.log(error.response.data);
        return [];
    }
};

export const getComparison = async (req, res) => {
    try {
        console.log('fetching comparision...');
        let comparison = []
        for (const sportKey of sportKeys) {
            const matches = await getMatches(sportKey);
            comparison = [...comparison, ...matches];
        }
        console.log('comparison fetched successfully');
        return res.status(200).json(comparison);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}