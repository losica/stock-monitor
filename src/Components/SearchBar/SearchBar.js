import React from 'react';
import './SearchBar.css';

const SearchBar = ({value, onChange, onClick, btnName}) => {

    return  (
      <div className="SearchBar">
        <form className="SearchBar_Form">
          <input className="SearchBarInput"
                 value={ value }
                 onChange={ onChange } />
          <button className="SearchBarBtn" onClick={ onClick }>{btnName}</button>
        </form>
      </div>
    );
}

export default SearchBar;