import { useId, useState } from "react"
import TicketMatch from "./TicketMatch"
import httpClient from "../httpClient";

const Ticket = ({ offer, ticket, removeMatch }) => {

  const id = useId();
  const [input, setInput] = useState('');

  function findValueByKey(key, arr) {
    for (let obj of arr) {
      if (key === Object.keys(obj)[0]) {
        return obj[key];
      }
    }
  }

  const ticketMatches = () => {
    let matches = []
    ticket.forEach(selectedMatch => {
      let match = structuredClone(offer.find(match => match.id === selectedMatch.id))
      match.bet = selectedMatch.bet
      match.rate = findValueByKey(match.bet, match.rates)
      delete match.rates
      matches.push(match)
    })
    return matches
  }

  const totalRate = () => {
    let rate = 1
    if (ticketMatches().length < 1)
      return 0
    ticketMatches().forEach(match => {
      rate *= parseFloat(match.rate)
    })
    return Math.round((rate + Number.EPSILON) * 100) / 100
  }

  async function submitTicket() {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: token };
      const matches = ticketMatches()
      const ticketRate = totalRate()
      const resp = await httpClient.post("/ticket/submit", {
        matches,
        input,
        ticketRate,
      }, { headers });
      return resp.status;
    } catch (error) {
      if (error.response && error.response.status === 406) {
        alert("Not enough money");
        return error.response.status;
      } else if (error.response && error.response.status === 403) {
        window.location.href = "/login";
        return error.response.status;
      } else if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
        return error.response.status;
      }
    }
  }

  async function handleClick() {
    const status = await submitTicket();
    if (status === 200) {
      window.location.reload();
    }
  }

  return (
    <div className='ticket'>
      <div className='ticketHeader'>Ticket</div>
      <div className="ticketBody">
        {(ticketMatches().length > 0) ? ticketMatches().map((match) => (
          <TicketMatch ticketMatch={match} removeMatch={removeMatch} key={match.id} />
        )) : <TicketMatch ticketMatch={null} />}
      </div>
      <div className="ticketFooter">
        <div className='totalRate'>
          <div>Total rate</div>
          <div>{totalRate()}</div>
        </div>
        <div className='betEuro'>
          <div>Amount (€)</div>
          <input id={id} className="ticketInput" value={input} type="number" step="0.01" min='0' onInput={e => setInput(e.target.value)} />
        </div>
        <div className='totalWin'>
          <div>Total win</div>
          <div>{(input * totalRate()).toFixed(2)}</div>
        </div>
        <div className="betButton">
          <button id="betButton" onClick={handleClick}>Bet</button>
        </div>
      </div>
    </div>
  )
}

export default Ticket