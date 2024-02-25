const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("5802ab8ea1914b3bb18dfb46abfee2ef");

var fetchNews = (preference) => {
  return new Promise((resolve, reject) => {
    newsapi.v2
      .sources({
        category: preference,
        language: "en",
      })
      .then((resp) => {
        return resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const aggregateNews = async (preferences, req, res)=>{
  let aggregatedNews = []
  for(var i = 0; i < preferences.length; i++ ){
      try{
          let newPreference = await fetchNews(preferences[i])
          let { sources = [] } = newPreference
          aggregatedNews = [...aggregatedNews, ...sources]
      } catch(err) {
          res.status(500).send({message : "Unable to find preference for news."})
      }
  }
  res.status(200).json({aggregatedNews : aggregatedNews, message :"Preference Loaded Successfully"})
};


module.exports = { fetchNews, aggregateNews };
