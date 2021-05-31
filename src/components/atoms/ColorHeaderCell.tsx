import React, { useState } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { BgColorsOutlined, ReloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useColors } from '../../contexts/colors';

const ColorHeaderCell = ({ color }) => {
  const [colorPickerShown, setColorPickerShown] = useState(false);
	const { removeColor, changeColor, regenerateColor } = useColors();

  return (
    <Wrapper style={{width: 80 + 'px'}} >
      <RelativePositionWrapper>
        <BgColorsOutlined onClick={() => setColorPickerShown(true)} />
        {colorPickerShown && (
          <FloatingPicker>
            <ChromePicker
              color={color.color.toHexString()}
              onChange={e=> changeColor(color.id, e.hex.toUpperCase())}
            />
          </FloatingPicker>
        )}
      </RelativePositionWrapper>
      <ReloadOutlined onClick={() => regenerateColor(color.id)} color='#ff0000' />
      <DeleteOutlined onClick={() => removeColor(color.id)} color='#ff0000' />
      {colorPickerShown && <HidePickerOverlay onClick={() => setColorPickerShown(false)} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #E5E5F5;
  padding: 5px 0;
  border-radius: 10px;
  margin-right: 5px
`;

const RelativePositionWrapper = styled.div`
  position: relative;
`;

const FloatingPicker = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 3;
`;

const HidePickerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

export default ColorHeaderCell;