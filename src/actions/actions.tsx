import axios from "axios"

const backend_URL = "http://localhost:3000/fakeDataSet"

interface Card {
type: string
ad_name: string
campaign_name: string
clicks: number
impressions: number
media_buy_name: string
spend: number
}

export async function fetchData() {
  try {
    const res = await axios.get(backend_URL);
    return normalizeData(res.data);
  } catch (err) {
    console.error(err);
  }
}

function normalizeData(data){
  let cards: Card[] = []
    console.log(data)
    for(const fbAd of data.facebook_ads){
        console.log("Calling fetchData");
        let  card = {...fbAd}
        card.type = "facebook_ads"
        cards.push(card)
    }
    console.log(cards)
}

