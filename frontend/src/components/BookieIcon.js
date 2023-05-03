import betfair from "../images/bookmakers/betfair.png";
import matchbook from "../images/bookmakers/matchbook.png";
import mybookie from "../images/bookmakers/mybookie.jpg";
import nordicbet from "../images/bookmakers/nordicbet.jpg";
import pinnacle from "../images/bookmakers/pinnacle.jpeg";
import suprabets from "../images/bookmakers/suprabets.png";
import unibet from "../images/bookmakers/unibet.jpg";
import x1bet from "../images/bookmakers/1xbet.jpg";
import sport888 from "../images/bookmakers/888sport.jpg";
import betonline from "../images/bookmakers/betonline.jpg";
import betsson from "../images/bookmakers/betsson.png";
import marathonbet from "../images/bookmakers/marathonbet.png";
import betclic from "../images/bookmakers/betclic.png";
import williamhill from "../images/bookmakers/williamhill.jpg";

const BookieIcon = ({ bookie }) => {

    switch (bookie) {
        case 'Betfair':
            return <img src={betfair} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case 'Matchbook':
            return <img src={matchbook} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case 'MyBookie.ag':
            return <img src={mybookie} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case 'Nordic Bet':
            return <img src={nordicbet} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case 'Pinnacle':
            return <img src={pinnacle} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case 'Suprabets':
            return <img src={suprabets} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case 'Unibet':
            return <img src={unibet} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case '1xBet':
            return <img src={x1bet} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case '888sport':
            return <img src={sport888} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case 'BetOnline.ag':
            return <img src={betonline} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case 'Betsson':
            return <img src={betsson} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case 'Marathon Bet':
            return <img src={marathonbet} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case 'Betclic':
            return <img src={betclic} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        case 'William Hill':
            return <img src={williamhill} alt='bookie' style={{ height: 34, width: 78, marginRight: 10 }}></img>
        default:
            return null
    }
}

export default BookieIcon