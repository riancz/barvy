import React from 'react';
import { render } from 'react-dom';
import Main from './src/views/Main';
import './style.css';

const App = () => {
  return (
    <Main />
  );
};

render(<App />, document.getElementById('root'));
