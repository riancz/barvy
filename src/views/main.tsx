import React from 'react';
import styled from 'styled-components';
import { ColorsProvider } from '../contexts/colors';
import Content from '../components/organisms/Content';
import Menu from '../components/organisms/Menu';

const Main = () => {
  return (
    <ColorsProvider>
      <Content />
      <Menu />
    </ColorsProvider>
  );
};

const OverflowDiv = styled.div`
  flex: 1;
	width: 100%;
    height: 100%;
    overflow-x: scroll;
`;

const MainWrapper = styled.div`
	display: flex;
  flex: 1;
  flex-direction: column;
	padding: 0 10px 10px 10px;
	height: 100%;
	box-sizing: border-box;
	background-color: #FFFFFF;
`;

const ColorsBody = styled.div`
  display: flex;
  height: 100%;
`;

export default Main;
