// import logo from './logo.svg';
// import './App.css';
import { fetchData } from './actions/actions.tsx';
import{ useState, useEffect } from 'react';
import Toolbar from './components/Toolbar.jsx';


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
      
      <main>
        <Toolbar />
        <div className="card-container">
          {cards.length > 0 ? (
            cards.map((card, idx) => (
              <div className="card" key={idx}>
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
          ) : (
            <p>Now loading</p>
          )}
        </div>
      </main>
    </div>
  );
}


export default App;
