import React, { ChangeEvent, FunctionComponent, RefObject } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

export interface TextAreaProps {
    placeholder?: string;
    value: string | number;
    onChange(e: ChangeEvent<HTMLTextAreaElement>): void;
    onEnterPressed?(): void;
    disabled?: boolean;
    id?: string;
    css?: FlattenSimpleInterpolation;
    maxLength?: number;
    autoFocus?: boolean;
    onClick?(): void;
    reference?: RefObject<HTMLTextAreaElement>;
}

const StyledTextArea = styled.textarea<TextAreaProps>`
    padding: 5px;
    border: none;
    background-color: white;
    border-radius: 5px;
    outline: none;
    width: 100%;
    ${props => props.css}
`;

const TextArea: FunctionComponent<TextAreaProps> = ({
    placeholder,
    value,
    onChange,
    onEnterPressed,
    id,
    disabled = false,
    maxLength = 300,
    autoFocus,
    onClick,
    reference,
    ...props
}: TextAreaProps) => {
    return (
        <StyledTextArea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            id={id}
            maxLength={maxLength}
            autoFocus={autoFocus}
            onClick={onClick}
            ref={reference}
            {...props}
        />
    );
};

TextArea.defaultProps = {
    placeholder: '',
    onEnterPressed: () => null,
    disabled: false,
    id: '',
    css: [],
    maxLength: 500,
    autoFocus: false,
    onClick: () => null,
    reference: undefined,
};

export default TextArea;
