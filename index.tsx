import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

const App = () => {
  return (
    <div>
      <p>
        Start editing to see some magic happen :)
      </p>
    </div>
  );
}

render(<App />, document.getElementById('root'));