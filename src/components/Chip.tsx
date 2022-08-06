import React, { FunctionComponent } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

export interface ChipProps {
    text: string;
    css?: FlattenSimpleInterpolation;
}

const StyledChip = styled.div<ChipProps>`
    ${props => props.css}
`;

const Chip: FunctionComponent<ChipProps> = ({ ...props }: ChipProps) => {
    const { text } = props;
    return <StyledChip {...props}>{text}</StyledChip>;
};

export default Chip;
