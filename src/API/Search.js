const API = 'https://www.alphavantage.co/query?';
const key = '4JNJBC2PPIDR81GG';

export const search = (searhTerm) => {
  return new Promise(function(resolve, reject) {
    fetch(API + 'function=SYMBOL_SEARCH&keywords='+searhTerm+'&compact=compact&apikey=' + key)
        .then(response => response.json())
        .then(data => {
          let searchMatches = data['bestMatches'];
          resolve(searchMatches);
        })
        .catch(error => {console.log(error);
                         reject();});
  });
};
