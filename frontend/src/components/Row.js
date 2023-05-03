import TableButton from "./TableButton"
import DateTime from "./DateTime"

const Row = ({ match, ticket, addMatch, removeMatch }) => {

  const activeMatch = ticket.find((ticketMatch) => ticketMatch.id === match.id)
  const activeBet = (activeMatch === undefined) ? null : activeMatch.bet

  const handleClick = (bet) => {
    (bet !== activeBet) ? addMatch(match.id, bet) : removeMatch(match.id)
  }

  return (
    <div className='tableRow'>
        <div className='match'>{match.title}</div>
        {match.rates.map((rate, index) => (
            <TableButton rates={rate} key={index} handleClick={handleClick} activeBet={activeBet}/>
        ))}
        <div className='dateTime'><DateTime dateTime={match.date} /></div>
    </div>
  )
}

export default Row