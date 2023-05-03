import { useState } from 'react';
import Sidebar from './Sidebar';
import Table from './Table';
import Ticket from './Ticket';


const Dashboard = ({ category, removeMatch, addMatch, offer, ticket, clearTicket, ticketSubmit }) => {
    
    const offerByCategory = offer.filter((match) => match.category === category)

    return (
        <div className='mainBox3'>
            <Table category={category} offer={offerByCategory} ticket={ticket} addMatch={addMatch} removeMatch={removeMatch} />
            <Ticket offer={offer} ticket={ticket} removeMatch={removeMatch} clearTicket={clearTicket} ticketSubmit={ticketSubmit} />
        </div>
    )
}

const MainOffer = ({ removeMatch, addMatch, offer, ticket }) => {
    const rememberCategory = localStorage.getItem('category')
    const [category, setCategory] = useState(rememberCategory || null)

    return (
        <div className='mainBox2'>
            <Sidebar category={category} setCategory={setCategory} />
            <Dashboard category={category} removeMatch={removeMatch} addMatch={addMatch} offer={offer} ticket={ticket} />
        </div>
    )
}

export default MainOffer