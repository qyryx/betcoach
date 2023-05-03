import { XCircle, CheckCircle, QuestionCircle } from 'react-bootstrap-icons';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
import DateTime from './DateTime';

const SportIcon = ({ sport }) => {
    switch (sport) {
        case 'football':
            return <RiIcons.RiFootballLine size={26} style={{ marginRight: '3px' }} />
        case 'hockey':
            return <FaIcons.FaHockeyPuck size={23} style={{ marginRight: '5px' }} />
        case 'tennis':
            return <IoIcons.IoIosTennisball size={20} style={{ marginRight: '3px' }}/>
        case 'mma':
            return <GiIcons.GiBoxingGlove size={24} style={{ marginRight: '3px' }} />
        default:
            return <RiIcons.RiFootballLine size={26} style={{ marginRight: '3px' }} />
    }
}

const StatusIcon = ({ status }) => {
    switch (status) {
        case 'won':
            return <CheckCircle size={30} style={{ color: 'green' }} />
        case 'lost':
            return <XCircle size={30} style={{ color: 'red' }} />
        case 'pending':
            return <QuestionCircle size={30} style={{ color: 'orange' }} />
        default:
            return <QuestionCircle size={30} style={{ color: 'orange' }} />
    }
}

const DisplayMatch = ({ match }) => {

    return (
        <>
            {match ?
            <div className='displayMatch'>
                <div className='displayMatchItem small'>
                    <SportIcon sport={match.sport} />
                </div>
                <div className='displayMatchItem large'>
                    <div>{match.title}</div>
                    <div><DateTime dateTime={match.date} /></div>
                </div>
                <div className='medium'>
                    <div className='mediumItem'>
                        <div>Bet:</div>
                        <div>Rate:</div>
                    </div>
                    <div className='mediumItemRight'>
                        <div>{match.bet}</div>
                        <div>{match.rate}</div>
                    </div>
                </div>
                <div className='displayMatchItem normal'>
                    <div>Score</div>
                    <div>{match.score ? match.score : '--'}</div>
                </div>
                <div className='displayMatchItem small'>
                    <StatusIcon status={match.status} />
                </div>
            </div> : null}
        </>
    )
}

export default DisplayMatch