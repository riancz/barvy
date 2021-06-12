import React from 'react';
import styled from 'styled-components';
import { useColors } from '../contexts/colors';
import ColorPalette from '../components/organisms/ColorPalette';

const Content = () => {
  const { colors } = useColors();

    return (
      <ContentWrapper>
          { colors.length
            ? <ColorPalette />
            : <MethodPicker />
          }
      </ContentWrapper>
    );
};

const ContentWrapper = styled.div`
	display: flex;
  flex: 1;
	padding: 0 10px 10px 10px;
	height: 100%;
	background-color: #FFFFFF;
`;

export default Content;