import React from 'react';
import { render } from 'react-dom';
import { ColorsProvider } from './src/contexts/colors';
import Content from './src/components/organisms/Content';
import Menu from './src/components/organisms/Menu';
import './style.css';

const App = () => {
  return (
    <ColorsProvider>
      <Content />
      <Menu />
    </ColorsProvider>
  );
};

render(<App />, document.getElementById('root'));
