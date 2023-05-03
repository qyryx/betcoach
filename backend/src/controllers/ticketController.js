import { createTicket, getTicketsById, ticketFeed } from '../db/ticket';
import { getUsernameById, getMoneyById, setMoneyById } from '../db/user.js';

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
        const { matches, input, ticketRate } = req.body;
        if (!input) {
            return res.status(400).json({ message: 'Missing money amount' });
        }
        if (matches.length === 0) {
            return res.status(400).json({ message: 'Ticket is empty' });
        }
        if (!checkIfMatchesHaveNotStarted(matches)) {
            return res.status(400).json({ message: 'Some matches have already started' });
        }
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