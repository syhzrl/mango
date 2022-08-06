import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledGrid = styled.div`
    background-color: transparent;

    display: grid;

    justify-content: center;
    align-items: center;

    margin-bottom: 20px;

    width: 100%;
    height: fit-content;

    grid-template-columns: 300px 300px;

    gap: 40px;

    padding: 20px;

    #img {
        width: 300px;
        height: 300px;

        object-fit: contain;

        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const Grid: FunctionComponent = (props) => {
    const { children } = props;
    return (
        <StyledGrid>
            {children}
        </StyledGrid>
    );
};

export default Grid;
