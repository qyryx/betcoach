import DisplayMatch from './DisplayMatch'
import DateTime from './DateTime'

const DisplayTicket = ({ ticket }) => {

    let color = 'orange'

    if (ticket) {
        switch (ticket.ticketStatus) {
            case 'won':
                color = 'green'
                break;
            case 'lost':
                color = 'red'
                break;
            case 'pending':
                color = 'orange'
                break;
            default:
                color = 'orange'
        }
    }

    return (
        <div className="ticketsBox" style={{ display: 'flex', flexDirection: 'column', paddingBottom: 40 }}>
            {ticket ?
                <>
                    <div className='ticketsHeader'>
                        <div>TICKET ID: {ticket._id}</div>
                    </div>
                    <div className='matchesDisplay'>
                        {ticket.matches.map(match => (
                            <DisplayMatch match={match} key={match.id} />
                        ))}
                    </div>
                    <div className='matchesDisplayFooter'>
                        <div className='matchesDisplayFooterItem' style={{ display: "flex", marginRight: 40 }}>
                            <div className='matchesDisplayFooterItem'>
                                <div>Ticket created at:</div>
                                <div>Number of matches:</div>
                                <div>Ticket status:</div>
                            </div>
                            <div className='matchesDisplayFooterItemRight'>
                                <div><DateTime dateTime={ticket.dateTime} /></div>
                                <div>{ticket.matches.length}</div>
                                <div style={{ color: color }}>{ticket.ticketStatus.toUpperCase()}</div>
                            </div>
                        </div>
                        <div className='matchesDisplayFooterItem' style={{ display: "flex" }}>
                            <div className='matchesDisplayFooterItem'>
                                <div>Total rate:</div>
                                <div>Bet:</div>
                                <div>Total win:</div>
                            </div>
                            <div className='matchesDisplayFooterItemRight'>
                                <div>{ticket.ticketRate}</div>
                                <div>{ticket.ticketBet}</div>
                                <div>{ticket.ticketStatus === 'lost' ? 0 : (ticket.ticketRate * ticket.ticketBet).toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                </> :
                <div className='ticketsHeader'>
                    <div>SELECT TICKET TO DISPLAY DETAILS</div>
                </div>}
        </div>
    )
}

export default DisplayTicket