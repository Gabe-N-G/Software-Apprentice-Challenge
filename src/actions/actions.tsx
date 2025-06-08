import axios from "axios"

const backend_URL = "http://localhost:3000/fakeDataSet"

type Card = {
type: string;
creative: string;
campaign: string;
adset: string;
impressions: number;
spend: number;
clicks: number;
google_results: number;
}


export async function fetchData() {
  try {
    const res = await axios.get(backend_URL);
    console.log(res.data)
    const norm = normalizeData(res.data);
    const cards = addGoogle(res.data.google_analytics, norm)
    console.log(cards.filter((e)=>e.google_results==0))
  } catch (err) {
    console.error(err);
  }
}

function normalizeData(data){
    // console.log(data)
    let cards: Card[] = []
    for(const fbAd of data.facebook_ads){
       const ad: Card = {
          type: "Facebook",
          campaign: fbAd.campaign_name,
          adset: fbAd.media_buy_name,
          creative: fbAd.ad_name,
          impressions: fbAd.impressions,
          spend: fbAd.spend,
          clicks: fbAd.clicks,
          google_results: 0,
       }
       cards.push(ad)
      //  console.log(cards)
    }
    for(const snap of data.snapchat_ads){
        const ad: Card = {
          type: "Snapchat",
          campaign: snap.campaign_name,
          adset: snap.ad_squad_name,
          creative: snap.creative_name,
          impressions: snap.impressions,
          spend: snap.cost,
          clicks: snap.post_clicks,
          google_results: 0,
        }
       cards.push(ad)
      //  console.log(cards)
    }
    for(const tweet of data.twitter_ads){
        const ad: Card = {
          type: "Twitter",
          campaign: tweet.campaign,
          adset: tweet.ad_group,
          creative: tweet.image_name,
          impressions: tweet.impressions,
          spend: tweet.spend,
          clicks: tweet.post_clicks,
          google_results: 0,
       }
       cards.push(ad)
      //  console.log(cards)
    }
    return cards
}

function addGoogle(google, cards){
  console.log(cards)
  for(const goo of google){
    let match = cards.filter((card) => (goo.utm_campaign === card.campaign && goo.utm_medium === card.adset && goo.utm_content === card.creative))
    if (match){
      console.log(goo,match)
      match.google_results += goo.results
    }else{
      console.log("no match")
    }
  }
  return cards
}
