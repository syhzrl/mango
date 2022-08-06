import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

interface StyledRadioButtonProps {
    square?: boolean;
    children: ReactNode;
}

const StyledRadioButton = styled.button<StyledRadioButtonProps>`
    background-color: white;
    color: white;

    border: 1px solid #A5AAB5;

    height: 30px;
    width: 30px;

    border-radius: ${props => (props.square ? '5px' : '100px')};
    
    margin-right: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const RadioButton: FunctionComponent<StyledRadioButtonProps> = (props: StyledRadioButtonProps) => {
    const { square, children } = props;
    return (
        <StyledRadioButton square={square}>
            {children}
        </StyledRadioButton>
    );
};

RadioButton.defaultProps = {
    square: false,
};

export default RadioButton;
