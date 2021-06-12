import React from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import { PlusOutlined } from '@ant-design/icons';
import Button from '../atoms/Button';
import Column from '../atoms/Column';
import { useColors } from '../../contexts/colors';

const AddColorColumn = ({ color }) => {
    const { addColor } = useColors();

	return (
		<Column>
			<Button
                background='#E5E5F5'
                onClick={() => addColor()}
                icon={<PlusOutlined style={{color: '#000000'}} />}
            />
		</Column>
	);
};

export default AddColorColumn;