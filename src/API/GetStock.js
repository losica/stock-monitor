const API = 'https://www.alphavantage.co/query?';
const key = '4JNJBC2PPIDR81GG';
const processData = (data, ticker) => {
  let price =  data['Time Series (Daily)']; //list of all the stock prices
  let pricesGraphData = [];
            
  let pricesLength = Object.values(price).length;
  let firstDate, lastDate;
  // process stock prices format so that they can be used for creation of line graph
  for(let i = 0; i < pricesLength; i++) {
    let graphData ={
      x: new Date(Object.keys(price)[pricesLength-1-i]),
      y: parseFloat(Object.values(price)[i]['1. open'])
    }
    pricesGraphData.push(graphData);
    if(i === pricesLength-1){
      firstDate = Object.keys(price)[i];
    }
    if(i === 0) {
      lastDate = Object.keys(price)[i];
    } 
  }
  let stock = {
    symbol : ticker,
    prices : Object.values(price)[Object.values(price).length - 1],
    graphData : {
      label : ticker,
      values: pricesGraphData
    },
    firstDate: firstDate,
    lastDate: lastDate
  };
  return stock;
}

export const getStock = (ticker) => {
  return new Promise(function(resolve, reject) {
    fetch(API + 'function=TIME_SERIES_DAILY&symbol='+ticker+'&outputsize=compact&apikey=' + key)
        .then(response => response.json())
        .then(data => {
          if(typeof data !== "undefined" && data !== null){ // we managed to receive data from API
            if(typeof data['Time Series (Daily)'] !== "undefined" ) { //we received 
            let stock = processData(data, ticker);
            resolve(stock);
            } else {
              console.log('Exceeded the API call limit');
              reject(new Error("Couldn't receive data from the API. \n Please try again later."));
            }
          } else {
            console.log('Couldn\'t receive data from the API ');
            reject(new Error("Sorry! We couldn't receive data from the API. \n Please try again later."));
          }
        })
        
      });
  };
