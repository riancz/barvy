import React from 'react';
import styled from 'styled-components';
import { useColors } from '../../contexts/colors';
import ColorsHeader from '../molecules/ColorsHeader';
import ColorColumn from '../molecules/ColorColumn';
import AddColorColumn from '../molecules/AddColorColumn';

const Content = () => {
    const { colors } = useColors();

    return (
        <PaletteWrapper>
            <ColorsHeader />
            <ColorsBody>
                {colors.map(color=> <ColorColumn color={color} key={color.id} />)}
                <AddColorColumn />
            </ColorsBody>
        </PaletteWrapper>
    );
};

const PaletteWrapper = styled.div`
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

export default Content;