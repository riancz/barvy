import React from 'react';
import styled from 'styled-components';

const Modal = () => {

    return (
        <Overlay>
            <ModalWindow>
            </ModalWindow>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
	width: 100%;
    height: 100%;
    background-background: '#00000022';
    justify-items: 'center'
`;

const ModalWindow = styled.div`
	width: 300px;
    height: 300px;
    background: '#fff';
`;

export default Column;