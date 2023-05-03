import { useState, useEffect } from "react";
import DateTime from "./DateTime";
import BookieIcon from "./BookieIcon";
import Spinner from 'react-bootstrap/Spinner';

const sports = [
  'NHL',
  'NBA',
  'MMA',
  'Premier League - England',
  'Ligue 1 - France',
  'Bundesliga - Germany',
  'Serie A - Italy',
  'La Liga - Spain'
];

const Compare = () => {
  const [selectedSport, setSelectedSport] = useState(sessionStorage.getItem('selectedSport') || "");
  const [selectedMatch, setSelectedMatch] = useState(sessionStorage.getItem('selectedMatch') || "");
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    fetch("/api/compare")
      .then((response) => response.json())
      .then((data) => setMatches(data));
  }, []);

  const filteredMatches =
    matches && matches.filter(
      (match) => match.sport_title === selectedSport
    );

  const sportOptions = sports.map((sport) => (
    <option key={sport} value={sport} className="compareOption">
      {sport}
    </option>
  ));

  const matchOptions =
    selectedSport && matches &&
    filteredMatches.map((match) => (
      <option key={match.id} value={match.id} className="compareOption">
        {match.title}
      </option>
    ));

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
    sessionStorage.setItem("selectedSport", event.target.value);
    setSelectedMatch("");
  };

  const handleMatchChange = (event) => {
    setSelectedMatch(event.target.value);
    sessionStorage.setItem("selectedMatch", event.target.value);
  };

  const firstRow = () => (
    <div className="compareRow" style={{ fontWeight: 'bold', borderBottom: '5px solid #21262d' }}>
      <div className="compareItemFirst" >Bookmaker</div>
      <div className="compareItem" >Home</div>
      <div className="compareItem" >Away</div>
      {(selectedSport === 'MMA' || selectedSport === 'NBA') ? null : <div className="compareItem" >Draw</div>}
    </div>
  );


  const renderMatchData = () => {
    if (matches) {
      if (selectedMatch) {
        const selectedMatchData = matches.find(
          (match) => match.id === selectedMatch
        );

        return (
          <div>
            <div className="compareMatchHeader">
              <h4>{selectedMatchData.title}</h4>
              <h4><DateTime dateTime={selectedMatchData.date} /></h4>
            </div>
            <div className="compareTable">
              {firstRow()}
              {selectedMatchData.bookmakers.map((bookmaker) => (
                <div key={bookmaker.bookmaker} className="compareRow">
                  <div className="compareItemFirst" >
                    <BookieIcon bookie={bookmaker.bookmaker} />
                    {bookmaker.bookmaker}
                  </div>
                  {bookmaker.odds.map((odd, index) => (
                    <div key={index} className="compareItem">{odd}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        return null
      }
    } else {
      return (
        <div className="loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }
  };

  return (
    <div className="compareContainer">
      <div className="compareHeader">
        <div>
          <h3>Compare rates from different betting companies</h3>
        </div>
        <div className="compareSelects">
          <select id="sport-select" className="compareSelect" value={selectedSport} onChange={handleSportChange}>
            <option value="" className="compareOption" >Choose a sport</option>
            {sportOptions}
          </select>
          <select id="match-select" className="compareSelect" value={selectedMatch} onChange={handleMatchChange}>
            <option value="" className="compareOption" >Choose a match</option>
            {matchOptions}
          </select>
        </div>
      </div>
      <div>{renderMatchData()}</div>
    </div>
  );
}

export default Compare;
