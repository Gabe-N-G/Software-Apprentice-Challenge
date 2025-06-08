import { useState, useEffect } from 'react';
import { fetchData } from './actions/actions.tsx';
import Toolbar from './components/Toolbar.jsx';
import Cards from './components/Card.jsx';


function App() {
  const [cards, setCards] = useState([]);
  //allcards used for resetting filters/sorts
  const [allCards, setAllCards] = useState([])


  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setCards(data);
      setAllCards(data)
    };
    loadData();
  }, []);

  //getting unique campaign names for select field
  const uniqueCamp = [...new Set(allCards.map(card => card.campaign))]


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
        <Toolbar
          sortAsc={sortAsc}
          sortDesc={sortDesc}
          reset={reset}
          filterCamp={filterCamp}
          uniqueCamp={uniqueCamp}
        />

        <Cards cards={cards} />
      </main>
    </div>
  );
}

export default App;
