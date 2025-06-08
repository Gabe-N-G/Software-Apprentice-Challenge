const Cards = ({ cards }) => {
  if (cards.length === 0) {
    return <p className="text-center text-gray-500">Now loading...</p>;
  }

  return (
    <div
      id="cardContainer"
      className="grid gap-6 mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
        >
          <p className="font-semibold">
            Source: <span className="font-normal">{card.type}</span>
          </p>
          <p className="font-semibold">
            Campaign: <span className="font-normal">{card.campaign}</span>
          </p>
          <p className="font-semibold">
            Adset: <span className="font-normal">{card.adset}</span>
          </p>
          <p className="font-semibold">
            Creative: <span className="font-normal">{card.creative}</span>
          </p>
          <p className="font-semibold">
            Spend: <span className="font-normal">${card.spend}</span>
          </p>
          <p className="font-semibold">
            Impressions: <span className="font-normal">{card.impressions}</span>
          </p>
          <p className="font-semibold">
            Clicks: <span className="font-normal">{card.clicks}</span>
          </p>
          <p className="font-semibold">
            Google Results:{" "}
            <span className="font-normal">{card.google_results}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
