import React, { Component } from 'react';
import * as ReactD3 from 'react-d3-components';
import * as d3 from 'd3';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import SearchResultList from './SearchResultList/SearchResultList';
import StockTable from './StockTable/StockTable';
import Title from './Title/Title';
import { getStock } from '../API/GetStock';
import { search } from '../API/Search';

const LineChart = ReactD3.LineChart;

const tooltipLine = function(label, data) {
  return label + "\ndate: " + data.x.toLocaleDateString("en-GB") + "\nprice: " + data.y;
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appName: 'Stock monitor',
      stockList: [],
      term: null,
      value: '',
      searchMatches: []
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.addStock = this.addStock.bind(this);
    this.handleAddingStock = this.handleAddingStock.bind(this);
    this.removeStock = this.removeStock.bind(this);
  }

  handleAddingStock(e) {
    if(e) e.preventDefault();
    console.log("clicking on some search result ");
    let stockToAdd = e.target.attributes.getNamedItem('symbol').value;
    console.log(stockToAdd);
    this.addStock(stockToAdd);
  }

  handleSearchBarChange(e) {
    // e.target.value is the value of user input to the search bar
    this.setState({
      value: e.target.value
    });
  }

  addStock = (ticker) => {
    if (this.state.stockList && this.state.stockList.some(e => e.symbol === ticker)) {
      // stock is already added
    } else {       
      if(ticker !== null && ticker !== undefined) {
      getStock(ticker).then(stock => {
        console.log('adding new ticker');
        if(stock !== undefined && stock !== null) {
        this.setState({ 
          stockList: this.state.stockList.concat([stock])
        });
      }
      })
      .catch((err) => {
        alert(err);
      });
    }
    }
  }

  removeStock(e) {
    if(e) e.preventDefault();
    let stock = e.target.attributes.getNamedItem('stocktoremove').value;
    let filtered =  this.state.stockList.filter(function(item){
      return item.symbol !== stock;
    });
    this.setState({
      stockList: filtered
    });
  }

  handleSearchClick(e) {
    if(e) e.preventDefault();
    this.setState({
      value: '',
      term: this.state.value
    });

    console.log('handleSearchClick on Search');

    let term = this.state.value;
       search(term).then( searchResults => {
          this.setState({
            searchMatches: searchResults
          });
       });
  }

  componentDidMount() {
    //set initial list of stocks that are dispalyed when app is started
    let stockTickers = ['MSFT', 'TSLA'];
    stockTickers.forEach((ticker) => {
      this.addStock(ticker)
    });
  }

  render() {
    return (
      <div className="App Section Grey">
        <Title appName={this.state.appName}></Title>
        {
          this.state.stockList.length > 0 ?
          <StockTable stockList = { this.state.stockList }
                      removeStock = { this.removeStock }
                      key = 'table'>
          </StockTable>
          : null
        }

        { 
          this.state.stockList.length > 0 ? 
        
          <LineChart
            data = { this.state.stockList.map((item) =>  item.graphData) }
            width={600}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}
            xScale={d3.scale.time}
            tooltipHtml={tooltipLine}
            xAxis={{tickArguments: [3]}}
            />
            : null
          }

          <SearchBar value={ this.state.value }
                     onClick={ this.handleSearchClick }
                     onChange={ this.handleSearchBarChange }
                     btnName='search'/>
          
          { (this.state.searchMatches && this.state.searchMatches.length > 0) ? 
        
            <SearchResultList stockItems={ this.state.searchMatches}
              addStockMethod={this.handleAddingStock}
            />
            : null
          }       
      </div>
    );
  }
}

export default App;
