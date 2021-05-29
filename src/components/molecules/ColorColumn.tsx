import React from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useColors } from '../contexts/colors';

const handleClick = (hex) => {
    navigator.clipboard.writeText(hex);
}

const ColorColumn = ({ color }) => {

	return (
		<Column>
			{color.shades.map(shade => (
				<Color
					color={shade.color}
          main={shade.isMain}
					key={shade.id}
          onClick={() => handleClick(shade)}
				>
          <Hex isLight={shade.isLight}>{shade.color.toHexString()}</Hex>
          <Copied><CheckCircleOutlined /> Copied!</Copied>
				</Color>
			))}
		</Column>
	);
};

const Column = styled.span`
	display: flex;
	flex-direction: column;
	width: 80px;
	height: 100%;
	padding-left: 5px;

	&:nth-of-type(1) {
		padding-left: 0;
	}
`;

const Hex = styled.span`
	font-size: 10px;
  color: ${props => props.isLight ? '#000' : '#FFF'};
  opacity: 0;
  transition: all 0.1s ease-in-out;
`;

const Copied = styled.div`
  position: absolute;
	font-size: 10px;
  color: white;
  opacity: 0;
  transition: all 0.1s ease-in-out;
`;

const Color = styled.div.attrs(props => ({
  style: {
    backgroundColor: props.color,
  },
}))`
	display: flex;
	flex: ${props => props.main ? 2 : 1};
	width: 100%;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	border-radius: 5px;
	transition: all 0.2s ease-in-out;
	margin-top: 5px;

	&:nth-of-type(1) {
		margin-top: 0;
	}

  &:active {
    filter: brightness(90%);
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;

    ${Hex} {
      opacity: 0;
      transition: all 0.1s ease-in-out;
    }

    ${Copied} {
      opacity: 1;
      transition: all 0.1s ease-in-out;
    }
  }

	&:hover {
		flex: 2;
		transition: all 0.2s ease-in-out;

    ${Hex} {
      opacity: 1;
      transition: all 0.1s ease-in-out;
    }
	}

  ${props => !props.main} ${Hex} {
    opacity: 1;
  }
`;


export default ColorColumn;