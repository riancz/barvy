import React from 'react';
import styled from 'styled-components';

interface IButton extends React.HTMLProps<HTMLButtonElement> {
  label?: string;
  icon?: ReactNode;
  block: boolean;
  noMargin?: boolean;
  background?: string;
  backgroundActive?: string;
}

const Button = ({ label, icon, ...props }) => {
	return (
		<StyledButton
			{...props}
		>
			{!!icon && icon}{!!label && label}
		</StyledButton>
	);
};

const StyledButton = styled.button`
	color: #FFFFFF;
  	margin-top: ${props => props.noMargin || '20px'};
	padding: 10px;
	background-color: ${props => props.background || '#004BAD'};
	border: 0;
	border-radius: 5px;
	cursor: pointer;
	transition: 0.2s ease-in-out background-color;

	&:hover {
		background-color: ${props => props.backgroundActive || '#0040A4'};
		transition: 0.2s ease-in-out background-color;
	}
`;

export default Button;