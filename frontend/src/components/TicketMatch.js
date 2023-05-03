import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
import DateTime from './DateTime';

const MatchIcon = ({ sport }) => {
  switch (sport) {
    case 'football':
      return <RiIcons.RiFootballLine size={18} style={{ marginRight: '3px' }}/>
    case 'hockey':
      return <FaIcons.FaHockeyPuck size={16} style={{ marginRight: '5px' }} />
    case 'tennis':
      return <IoIcons.IoIosTennisball size={20} style={{ marginRight: '3px' }}/>
    case 'mma':
      return <GiIcons.GiBoxingGlove size={18} style={{ marginRight: '3px' }} />
    default:
      return <RiIcons.RiFootballLine size={18} style={{ marginRight: '3px' }} />
  }
}

const TicketMatch = ({ ticketMatch, removeMatch }) => {
  return (
    (ticketMatch === null) ? <div className='ticketMatch ticketItem' style={{ justifyContent: 'center' }}>Ticket is empty</div> :
      <div className='ticketMatch'>
        <div className='ticketItem'>
          <div className='ticketItem'>
            <MatchIcon sport={ticketMatch.sport} />
            {ticketMatch.title}
          </div>
          <div className='ticketItem'>
            {ticketMatch.bet}
            <RiIcons.RiCloseFill size={22} className='xIcon' onClick={() => removeMatch(ticketMatch.id)} />
          </div>
        </div>
        <div className='ticketItem'>
          <div style={{ paddingLeft: '3px' }}><DateTime dateTime={ticketMatch.date} /></div>
          <div className='ticketRate'>{ticketMatch.rate}</div>
        </div>
      </div>
  )
}

export default TicketMatch