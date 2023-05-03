import MainOffer from './MainOffer';
import { useState, useEffect } from 'react';
import Tickets from './Tickets';
import Compare from './Compare';

const Content = ({ content, ticketSubmit }) => {
    const [offer, setOffer] = useState([])
    const [ticket, setTicket] = useState([])

    useEffect(() => {
        fetch("/offer/refresh")
            .then((response) => response.json())
            .then((data) => setOffer(data))
            .catch(error => {
                console.error('Error fetching offer:', error);
            });
    }, []);

    useEffect(() => {
        const fetchData = () => {
            fetch("/offer/refresh")
                .then((response) => response.json())
                .then((data) => setOffer(data))
                .catch(error => {
                    console.error('Error fetching offer:', error);
                });
        };
        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    const matchInMatches = (matches, idToMatch) => {
        for (const match of matches) {
            if (match.id === idToMatch) {
                return true
            }
        }
        return false
    };

    const addMatch = (matchId, bet) => {
        if (matchInMatches(ticket, matchId)) {
            let tmp = structuredClone(ticket)
            const index = tmp.findIndex((match) => match.id === matchId)
            tmp[index] = { id: matchId, bet: bet }
            setTicket(tmp)
        } else setTicket([...ticket, { id: matchId, bet: bet }])
    }

    const removeMatch = (id) => {
        setTicket(ticket.filter((match) => match.id !== id))
    }

    const clearTicket = () => {
        setTicket([])
    }

    return (
        <>
            {content === 'mainOffer' && <MainOffer removeMatch={removeMatch} addMatch={addMatch} offer={offer} ticket={ticket} clearTicket={clearTicket} ticketSubmit={ticketSubmit} />}
            {content === 'tickets' && <Tickets />}
            {content === 'compare' && <Compare />}
        </>
    )
}

export default Content