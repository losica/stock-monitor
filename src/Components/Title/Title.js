import React from 'react';
import './Title.css';

const Title = (props) => {
  return (
    <h1 id="title">{props.appName}</h1>
  );
}
export default Title;