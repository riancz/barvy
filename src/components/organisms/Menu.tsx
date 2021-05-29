import React from 'react';
import styled from 'styled-components';
import { useColors } from '../../contexts/colors';
import NumericInput from '../atoms/NumericInput';
import Button from '../atoms/Button';

const Menu = () => {
    const {
        shadeStepSize,
        changeShadeStepSize,
        shadeStepCount,
        changeShadeStepCount
    } = useColors();

	return (
		<MenuWrapper>
            <NumericInput
                label='How many shades'
                onChange={e => changeShadeStepCount(e.target.value)}
                step={2}
                min={1}
                value={shadeStepCount}
            />
            <NumericInput
                label='Lightness step size'
                min={1}
                onChange={e => changeShadeStepSize(e.target.value)}
                value={shadeStepSize}
            />
			<Button label='Generate code' />
		</MenuWrapper>
	);
};

const MenuWrapper = styled.span`
	display: flex;
	flex-direction: column;
  width: 250px;
	height: 100%;
	padding: 10px;
	border-left: 1px solid #DDDDEF;
  box-shadow: 0 0 15px #00003F2F;
`;

export default Menu;