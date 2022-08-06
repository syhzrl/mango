import React, { FunctionComponent } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

export interface TextProps {
    [x: string]: any;
    css?: FlattenSimpleInterpolation;
}

const StyledText = styled.div<TextProps>`
    ${props => props.css}
`;

const Text: FunctionComponent<TextProps> = ({ ...props }: TextProps) => {
    const { children } = props;
    return <StyledText {...props}>{children}</StyledText>;
};

Text.defaultProps = {
    css: [],
};

export default Text;
