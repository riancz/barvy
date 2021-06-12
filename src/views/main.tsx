import React from 'react';
import styled from 'styled-components';
import { ColorsProvider } from '../contexts/colors';
import Content from '../views/content';
import Menu from '../components/organisms/Menu';

const Main = () => {
  return (
    <ColorsProvider>
      <AppWrapper>
        <Content />
        <Menu />
      </AppWrapper>
    </ColorsProvider>
  );
};

const AppWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	font-family: 'Quicksand', sans-serif;
	background-color: #FFFFFF;
	box-shadow: 10px 10px 20px #00003F2F;
	border-radius: 10px;
	overflow: hidden;
`;

export default Main;
