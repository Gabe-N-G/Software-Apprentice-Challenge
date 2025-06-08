import { useState, useEffect } from 'react';
import { fetchData } from './actions/actions.tsx';
import Toolbar from './components/Toolbar.jsx';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setCards(data);
    };

    loadData();
  }, []);

  const uniqueCamp = [...new Set(cards.map(card => card.campaign))]
  console.log(uniqueCamp)


  const sortAsc = () => {
    let sorted = [...cards].sort((a,b) => a.spend - b.spend)
    setCards(sorted)
  }
  
  const sortDesc = () => {
    let sorted = [...cards].sort((a,b) => b.spend - a.spend)
    setCards(sorted)
  }


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">
          Software Apprentice Challenge GG
        </h1>
      </header>

      <main className="p-6">
        <div>
          Sort By: 
          Spend:  <button onClick={sortAsc}>Ascending</button>
           <button onClick={sortDesc}>Descending</button>
           <label for="campaignSelect">Select Campaign:</label>

           <select name="campaign" id="campaign">
              <option value="all">All</option>
              {uniqueCamp.map((camp) => (
                <option value={camp}>{camp}</option>
              ))}
           </select>
          
        </div>
        <div className="grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cards.length > 0 ? (
            cards.map((card, idx) => (
              <div
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                key={idx}
              >
                <p className="font-semibold">Source: <span className="font-normal">{card.type}</span></p>
                <p className="font-semibold">Campaign: <span className="font-normal">{card.campaign}</span></p>
                <p className="font-semibold">Adset: <span className="font-normal">{card.adset}</span></p>
                <p className="font-semibold">Creative: <span className="font-normal">{card.creative}</span></p>
                <p className="font-semibold">Spend: <span className="font-normal">${card.spend}</span></p>
                <p className="font-semibold">Impressions: <span className="font-normal">{card.impressions}</span></p>
                <p className="font-semibold">Clicks: <span className="font-normal">{card.clicks}</span></p>
                <p className="font-semibold">Google Results: <span className="font-normal">{card.google_results}</span></p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Now loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
