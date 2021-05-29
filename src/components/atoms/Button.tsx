import React from 'react';
import styled from 'styled-components';

interface IButton extends  {
  label: string;
}

const Button = ({ label, ...props }) => {
  return (
    <StyledButton {...props}>
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button`
	color: #FFFFFF;
  margin-top: 20px;
	padding: 10px;
	background-color: #004BAD;
	border: 0;
	border-radius: 5px;
	cursor: pointer;
	transition: 0.2s ease-in-out background-color;

	&:hover {
		background-color: #0040A4;
		transition: 0.2s ease-in-out background-color;
	}
`;

export default Button;