import axios from "axios";

const backend_URL = "http://localhost:3000/fakeDataSet";

type Card = { //alias with standardized names
  type: string;
  creative: string;
  campaign: string;
  adset: string;
  impressions: number;
  spend: number;
  clicks: number;
  google_results: number;
};

export async function fetchData() {
  try {
    const res = await axios.get(backend_URL);
    console.log(res.data);
    const norm = normalizeData(res.data);
    const cards = addGoogle(res.data.google_analytics, norm);
    return cards;
  } catch (err) {
    console.error(err);
  }
}

function normalizeData(data) {
  // console.log(data)
  let cards: Card[] = [];
  for (const fbAd of data.facebook_ads) {
    const ad: Card = {
      type: "Facebook",
      campaign: fbAd.campaign_name,
      adset: fbAd.media_buy_name,
      creative: fbAd.ad_name,
      impressions: fbAd.impressions,
      spend: fbAd.spend,
      clicks: fbAd.clicks,
      google_results: 0,
    };
    cards.push(ad);
    //  console.log(cards)
  }
  for (const snap of data.snapchat_ads) {
    //removing the words Squad from the adset value.
    let snapAdset = snap.ad_squad_name.split(" ").slice(0, 2).join(" ");
    // console.log(snapAdset)
    const ad: Card = {
      type: "Snapchat",
      campaign: snap.campaign_name,
      adset: snapAdset,
      creative: snap.creative_name,
      impressions: snap.impressions,
      spend: snap.cost,
      clicks: snap.post_clicks,
      google_results: 0,
    };
    cards.push(ad);
  }
  for (const tweet of data.twitter_ads) {
    const ad: Card = {
      type: "Twitter",
      campaign: tweet.campaign,
      adset: tweet.ad_group,
      creative: tweet.image_name,
      impressions: tweet.impressions,
      spend: tweet.spend,
      clicks: tweet.post_clicks,
      google_results: 0,
    };
    cards.push(ad);
    //  console.log(cards)
  }
  return cards;
}

function addGoogle(google, cards) {
  // console.log(cards);
  for (const goo of google) {
    let matches = cards.filter(
      (card) =>
        goo.utm_campaign === card.campaign &&
        goo.utm_medium === card.adset &&
        goo.utm_content === card.creative
    );
    //when doing this I found that there were multiple matches per google analytics, this is how I went through them.
    // console.log(matches, goo);
    if (matches) {
      for (const match of matches) {
        //also there are multiple entries in the google_analytics with the same campaign/medium/content, so Iam totalling them on each item.
        match.google_results += goo.results;
      }
    } else {
      console.log("no match");
    }
  }
  return cards;
}
