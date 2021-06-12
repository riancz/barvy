import styled from 'styled-components';

const Column = styled.span`
	display: flex;
	flex-direction: column;
	width: 80px;
	height: 100%;
	margin-left: 5px;
    justify-content: center;
    align-items: center;

	&:nth-of-type(1) {
		margin-left: 0;
	}
`;

export default Column;