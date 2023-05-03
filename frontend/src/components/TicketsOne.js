import DateTime from "./DateTime";

const TicketsOne = ({ ticket, setTicketId }) => {

    const {
        ticketStatus,
        ticketRate,
        dateTime,
        ticketBet
    } = ticket

    let color;
    let win;

    switch (ticketStatus) {
        case 'won':
            color = 'green'
            win = (ticketBet * ticketRate).toFixed(2)
            break;
        case 'lost':
            color = 'red'
            win = 0
            break;
        case 'pending':
            color = 'orange'
            win = (ticketBet * ticketRate).toFixed(2)
            break;
        default:
            color = 'grey'
            win = 0
    }

    return (
        <a href="/#" onClick={() => {localStorage.setItem('openedTicket', ticket._id); setTicketId(ticket._id)}}>
            <div className="ticketsOne" style={{ borderColor: color }}>
                <div className="ticketsOneItem" style={{ fontSize: 19 }}>{ticketStatus.toUpperCase()}</div>
                <div className="ticketsOneItem"><DateTime dateTime={dateTime} /></div>
                <div className="ticketsOneItem">{ticketBet.toFixed(2)}</div>
                <div className="ticketsOneItem">{ticketRate}</div>
                <div className="ticketsOneItem">{win}</div>
            </div>
        </a>
    )
}

export default TicketsOne