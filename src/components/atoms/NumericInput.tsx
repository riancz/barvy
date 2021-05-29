import React from 'react';
import styled from 'styled-components';
import Label from './Label';

interface NumericInput extends React.HTMLProps<HTMLInput> {
  label?: string;
  value?: number;
}

const NumericInput = ({ label, value = 0, ...props }) => {
    return (
        <NumericInputWrapper>
            {label && <Label>{label}</Label>}
            <StyledInput value={value} type='number' {...props} />
        </NumericInputWrapper>
    );
};

const StyledInput = styled.input`
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #8080A4;

    &:focus, &:active {
        outline: none;
        border-color: #202044;
    }
`;

const NumericInputWrapper = styled.label`
    margin-top: 5px;

    &:first-of-type {
        margin-top: 0;
    }
`;

export default NumericInput;