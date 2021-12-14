import React from 'react';
import { Link, animateScroll as scroll } from "react-scroll";
import SearchItem from '../SearchItem/SearchItem';
import './SearchResultList.css';


const SearchResultList = ({stockItems, addStockMethod}) => {

  const stockItem = stockItems.map((stock) => {
      let id = stock['1. symbol'] + '_' + stock['2. name'] + '_' + stock['4. region'];
      return (
        <div className="SearchItem" key={id} >
          <SearchItem symbol={ stock['1. symbol'] }
                      name={ stock['2. name'] }
                      type={ stock['3. type'] }
                      region={ stock['4. region'] }
                      currency={ stock['8. currency'] } 
                      />
          <Link to="title"
                smooth={true}>
          <button className="AddButton" onClick={ addStockMethod } symbol={stock['1. symbol']} href="#">add stock</button>
          </Link>
        </div>
      );
  });

  return (
    <ul className="SearchResultList">
      { stockItem }
    </ul>
  )
}

export default SearchResultList;