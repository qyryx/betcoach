import { createTicket, getTicketsById, ticketFeed } from '../db/ticket';
import { getUsernameById, getMoneyById, setMoneyById } from '../db/user.js';
import { getMatch } from '../db/match.js';

const checkIfMatchesHaveNotStarted = (matches) => {
    const date = new Date(Date.now());
    let matchesHaveNotStarted = true;
    matches.forEach(match => {
        const matchDate = new Date(match.date);
        if (matchDate < date) {
            matchesHaveNotStarted = false;
        }
    });
    return matchesHaveNotStarted;
}

export const submitTicket = async (req, res) => {
    try {
        const { matches, input } = req.body;
        console.log(matches);
        if (!input) {
            return res.status(400).json({ message: 'Missing money amount' });
        }
        if (input < 0.5 || input > 1000) {
            return res.status(400).json({ message: 'Amount must be in range 0.5 < EUR < 1000' });
        }
        if (matches.length === 0) {
            return res.status(400).json({ message: 'Ticket is empty' });
        }
        if (matches.length > 30) {
            return res.status(400).json({ message: 'Maximum matches on the ticket is 30' });
        }
        if (!checkIfMatchesHaveNotStarted(matches)) {
            return res.status(400).json({ message: 'Some matches have already started' });
        }

        await Promise.all(matches.map(async match => {
            const matchFromDb = await getMatch(match.id);
            const targetObj = matchFromDb.rates.find(obj => match.bet in obj);
            const rate = targetObj[match.bet];
            match.rate = rate;
        }));

        console.log(matches);

        let ticketRate = matches.reduce((acc, match) => acc * match.rate, 1);
        ticketRate = Math.round((ticketRate + Number.EPSILON) * 100) / 100
        console.log(ticketRate);
        const user_id = req.user.user_id;
        const money = await getMoneyById(user_id);
        if (money.money < input) {
            return res.status(406).json({ message: 'Not enough money' });
        }
        await createTicket({ user_id, matches, dateTime: new Date(Date.now()), ticketBet: input, ticketRate });
        const newMoney = await setMoneyById(user_id, money.money - input);
        return res.status(200).json(newMoney)
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Bad request' });
    }
}

export const getUserTickets = async (req, res) => {
    try {
        const user_id = req.user.user_id
        const tickets = await getTicketsById(user_id)
        return res.status(200).json(tickets)
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Bad request' });
    }
}

const getMatchesTitlesAndBets = async (matches) => {
    let matchesTitlesAndBets = ''
    for (const match of matches) {
        matchesTitlesAndBets += `${match.title} bet: ${match.bet}, `;
    }
    return matchesTitlesAndBets
}

export const getLiveFeed = async (req, res) => {
    try {
        let feeds = ''
        const tickets = await ticketFeed()

        await Promise.all(tickets.map(async ticket => {
            const username = await getUsernameById(ticket.user_id)
            const matches = await getMatchesTitlesAndBets(ticket.matches)
            feeds += `User: ${username.username} - {${matches}}; `
        }))

        return res.status(200).json(feeds)
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'Bad request' });
    }
}