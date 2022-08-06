import React, { FunctionComponent } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Spinner } from 'reactstrap';

export interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    css?: FlattenSimpleInterpolation;
    disabled?: boolean;
    [x: string]: any;
}

const StyledButton = styled.button<ButtonProps>`
    border: 0;
    cursor: pointer;
    font-size: 14px;
    transition: 0.3s;
    width: 100px;
    background-color: white;
    height: 40px;

    ${props => props.css}
`;

const Button: FunctionComponent<ButtonProps> = ({
    onClick,
    disabled = false,
    ...props
}: ButtonProps) => {
    return (
        <StyledButton
            type='button'
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {props.children}
        </StyledButton>
    );
};

Button.defaultProps = {
    css: [],
    disabled: false,
};

export default Button;
