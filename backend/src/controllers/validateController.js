import { getNotWonTickets, updateTickets } from "../db/ticket"
import { getResults } from "../db/result"
import { getMoneyById, setMoneyById } from "../db/user"

const validateResult = (match, result) => {
    if (result.result === null) {
        match.status = 'won';
        match.rate = 1;
        match.score = null;
        return;
    }

    const [home, away] = result.result.split(':');
    match.score = result.result;

    if (result.sport === 'mma' || result.sport === 'tennis') {
        const win = parseInt(home) > parseInt(away) ? '1' : '2';
        if (match.bet === win) {
            match.status = 'won';
        } else {
            match.status = 'lost';
        }
    } else {
        let win;
        if (parseInt(home) > parseInt(away)) {
            win = ['1', '10', '12'];
        } else if (parseInt(home) < parseInt(away)) {
            win = ['2', '02', '12'];
        } else {
            win = ['0', '02', '10'];
        }
        if (win.includes(match.bet)) {
            match.status = 'won';
        } else {
            match.status = 'lost';
        }
    }

}

export const validateTickets = async () => {
    console.log('validating tickets...');
    const date = new Date(Date.now());
    try {
        const tickets = await getNotWonTickets();
        const results = await getResults();

        tickets.forEach(ticket => {
            ticket.matches.forEach(match => {
                const dateObject = new Date(match.date);
                if (dateObject < date) {
                    const result = results.find(result => result.id === match.id);
                    if (result !== undefined) {
                        validateResult(match, result);
                    }
                }
            })
        });

        for (const ticket of tickets) {
            const results = ticket.matches.map(match => match.status);
            if (results.includes('lost')) {
                ticket.ticketStatus = 'lost';
            } else if (results.every(result => result === 'won')) {
                const money = await getMoneyById(ticket.user_id);
                const win = ticket.ticketBet * ticket.ticketRate;
                await setMoneyById(ticket.user_id, money.money + win);
                ticket.ticketStatus = 'won';
            }
        }

        await updateTickets(tickets);
        console.log('tickets validated successfully');
    } catch (err) {
        console.log(err);
    }
}

