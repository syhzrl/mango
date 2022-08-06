import React, { ChangeEvent, FunctionComponent } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

export interface InputProps {
    placeholder?: string;
    value?: string | number;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    onEnterPressed?(): void;
    label?: string;
    disabled?: boolean;
    id?: string;
    type?: string;
    css?: FlattenSimpleInterpolation;
    labelCss?: FlattenSimpleInterpolation;
    maxLength?: number;
    name?: string;
    autoFocus?: boolean;
    onClick?(): void;
    onFocus?(): void;
    defaultValue?: string;
}

const StyledInput = styled.input<InputProps>`
    padding: 5px;
    border: none;
    background-color: white;
    border-radius: 5px;
    outline: none;
    width: 100%;
    ${props => props.css}
`;

const StyledLabel = styled.label <{ labelCss: FlattenSimpleInterpolation }>`
    font-size: 24px;
    color: black;
    ${props => props.labelCss}
`;

const Input: FunctionComponent<InputProps> = ({
    placeholder,
    value,
    onChange,
    onEnterPressed,
    label,
    id,
    type = 'text',
    disabled = false,
    labelCss = [],
    maxLength = 100,
    name = '',
    autoFocus,
    onClick,
    onFocus,
    defaultValue,
    ...props
}: InputProps) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (onEnterPressed && e.key === 'Enter') {
            e.preventDefault();
            onEnterPressed();
        }
    };

    const renderLabel = () => {
        if (!label) return false;

        return (
            <div style={{ marginBottom: 5 }}>
                <StyledLabel
                    labelCss={labelCss}
                >
                    {label}
                </StyledLabel>
            </div>
        );
    };

    return (
        <div>
            {renderLabel()}
            <StyledInput
                type={type}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                id={id}
                maxLength={maxLength}
                name={name}
                autoFocus={autoFocus}
                onClick={onClick}
                onFocus={onFocus}
                defaultValue={defaultValue}
                {...props}
            />
        </div>
    );
};

Input.defaultProps = {
    placeholder: '',
    onEnterPressed: () => null,
    label: '',
    disabled: false,
    id: '',
    type: '',
    css: [],
    labelCss: [],
    maxLength: 500,
    name: '',
    autoFocus: false,
    onClick: () => null,
};

export default Input;
