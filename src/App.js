// import logo from './logo.svg';
import './App.css';
import { fetchData } from './actions/actions.tsx';
import React, { useState, useEffect } from 'react';


function App() {
  const [cards, setCards] = useState([])
  
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setCards(data);
    };

    loadData();
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Software Apprentice Challenge GG</h1>
      </header>
      <body>
        <div>Toolbar here</div>
          <div id="card-container">
            {cards ? 
              cards.map((card,idx) => (
                <div class="card" key={idx}>
                  <p>Source: {card.type}</p>
                  <p>Campaign: {card.campaign}</p>
                  <p>Adset: {card.adset}</p>
                  <p>Creative: {card.creative}</p>
                  <p>Spend: {card.spend}</p>
                  <p>Impressions: {card.impressions}</p>
                  <p>Clicks: {card.clicks}</p>
                  <p>Google Results: {card.google_results}</p>
                </div>
              ))
                :
              <p>Now loading</p>}
          </div>
      </body>
    </div>

    
  );
}

export default App;
