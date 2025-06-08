import { useState, useEffect } from 'react';
import { fetchData } from './actions/actions.tsx';


function App() {
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([])


  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setCards(data);
      setAllCards(data)
    };

    loadData();
  }, []);


  const uniqueCamp = [...new Set(allCards.map(card => card.campaign))]
  console.log(uniqueCamp)


  const sortAsc = () => {
    let sorted = [...cards].sort((a,b) => a.spend - b.spend)
    setCards(sorted)
  }
  
  const sortDesc = () => {
    let sorted = [...cards].sort((a,b) => b.spend - a.spend)
    setCards(sorted)
  }

  const reset = () => {
    setCards(allCards)
  }

  const filterCamp = (e) => {
    console.log(allCards, cards)
    if(e.target.value === "all"){
      setCards([...allCards])
    } else {
      setCards([...allCards].filter((card) => card.campaign === e.target.value)
    )}
     
  }
 

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">
          Software Apprentice Challenge GG
        </h1>
      </header>

      <main className="p-6">
       <div
          id="Toolbar"
          className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-md shadow-sm"
        >
          <span className="font-semibold text-gray-700">Sort By:</span>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Spend:</span>
            <button
              onClick={sortAsc}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Ascending
            </button>
            <button
              onClick={sortDesc}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Descending
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <label
              htmlFor="campaign"
              className="text-gray-600 font-medium"
            >
              Select Campaign:
            </label>
            
            <select
              name="campaign"
              id="campaign"
              onChange={filterCamp}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All</option>
              {uniqueCamp.map((camp) => (
                <option key={camp} value={camp}>
                  {camp}
                </option>
              ))}
            </select>
          </div>

          <button
              onClick={reset}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reset
            </button>
        </div>


        <div id="cardContainer" className="grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
