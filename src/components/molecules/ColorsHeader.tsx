import React, { useState } from 'react';
import styled from 'styled-components';
import ColorHeaderCell from '../atoms/ColorHeaderCell';
import { useColors } from '../../contexts/colors';

const ColorsHeader = () => {
  const [colorPickerShown, setColorPickerShown] = useState(false);
	const { colors, removeColor } = useColors();

  return (
    <Wrapper>
      {colors.map(color => <ColorHeaderCell color={color} key={color.main} />)}
      <div style={{width: 80 + 'px', marginRight: 20 + 'px'}}></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display: flex;
    padding: 10px 0;
`;

export default ColorsHeader;