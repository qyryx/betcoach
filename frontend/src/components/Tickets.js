import { useEffect, useState } from 'react'
import httpClient from "../httpClient";
import DisplayTicket from "./DisplayTicket";
import TicketsHeader from './TicketsHeader';
import TicketsOne from "./TicketsOne";

const Tickets = () => {
    const [tickets, setTickets] = useState([])
    const [ticketId, setTicketId] = useState(localStorage.getItem('openedTicket') || null)

    useEffect(() => {
        function fetchTickets() {
            const token = localStorage.getItem("token");
            const headers = { Authorization: token };
            httpClient.get('/ticket/tickets', { headers })
                .then(response => {
                    if (response.data && response.data.length !== 0) {
                        setTickets(response.data.reverse());
                    }
                })
                .catch(error => {
                    window.location.href = "/login";
                    console.log(error)
                });
        }
        fetchTickets();
    }, []);


    const ticketById = ticketId ? tickets.find((ticket) => ticket._id === ticketId) : null

    return (
        <div className='mainBox2'>
            <div className="ticketsBox" style={{ marginRight: 10 }}>
                <TicketsHeader/>
                {tickets.length > 0 && tickets ? tickets.map(ticket => (
                    <TicketsOne ticket={ticket} setTicketId={setTicketId} key={ticket._id}/>
                )) : null}
            </div>
            <DisplayTicket ticket={ticketById} />
        </div>
    )
}

export default Tickets