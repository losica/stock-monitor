import React from 'react';
import './StockTable.css';

const StockTable = ({stockList, removeStock}) => {
    const tableRows = ['Ticker', 'Open', 'High', 'Low', 'Close', 'Volume', ''];
    const listheaders = tableRows.map((d) => <th key={d}>{d}</th>);
    return (
        <table align="center">
        <thead>
        <tr> 
          {listheaders}
        </tr>
        </thead>
        <tbody>
        { stockList.map((item) => (
          <tr key={item.symbol}> 
            <td>{item.symbol}</td>
            <td>{item.prices['1. open']}</td>
            <td>{item.prices['2. high']}</td>
            <td>{item.prices['3. low']}</td>
            <td>{item.prices['4. close']}</td>
            <td>{item.prices['5. volume']}</td>
            <td><button className="CloseButton" onClick={removeStock} stocktoremove={item.symbol}>X</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    )
  }
  export default StockTable;