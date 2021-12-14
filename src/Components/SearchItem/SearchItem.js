import React from 'react';
import './SearchItem.css';

const SearchItem = (stock) => {
  return (
    <li symbol={stock.symbol} key={stock.symbol}>
      <div className="SearchItem_Symbol"><span>Symbol: </span>{ stock.symbol }</div>
      <div className="SearchItem_Name"><span>Name: </span>{ stock.name }</div>
      <div className="SearchItem_Type"><span>Type: </span>{ stock.type }</div>
      <div className="SearchItem_Region"><span>Region: </span>{ stock.region }</div>
      <div className="SearchItem_Currency"><span>Currency: </span>{ stock.currency }</div>
    </li>
  )
}
export default SearchItem;