import Row from "./Row";
import FirstRow from "./FirstRow";
import WelcomeTable from "./WelcomeTable";

const Table = ({ category, offer, ticket, addMatch, removeMatch }) => {

    return (
        <>
            {(offer.length === 0) ? (<WelcomeTable />) :
                (<div className='myTable'>
                    <FirstRow category={category} />
                    {offer.map((match) => (
                        <Row match={match} ticket={ticket} key={match.id} addMatch={addMatch} removeMatch={removeMatch} />
                    ))}
                </div>)}
        </>
    );
}

export default Table;