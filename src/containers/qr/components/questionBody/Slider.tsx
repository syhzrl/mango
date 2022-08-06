import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

interface CustomSliderProps {
    value: number;
    maxSteps: number;
}

const CustomSlider = styled.input.attrs({ type: 'range' }) <CustomSliderProps>`
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    height: 10px;
    width: 100%;
    border-radius: 40px;
    background: ${(props) => (`linear-gradient(to right, #021778 0%, #021778 ${((props.value - 1) * (1 / (props.maxSteps - 1)) * 100)}%, #d8dce5 ${((props.value - 1) * (1 / (props.maxSteps - 1)) * 100)}%, #d8dce5 100%);`)};

    // margin-bottom: 10px;

    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 30px;
        height: 30px;
        background-color: #021778;
        border-radius: 50%;
    }

    ::-moz-range-thumb {
        width: 30px;
        height: 30px;
        -moz-appearance: none;
        background-color: #021778;
        border-radius: 50%;
    }
`;

interface SliderProps {
    max: number;
}

const Slider: FunctionComponent<SliderProps> = (props: SliderProps) => {
    const { max } = props;
    const [value, setValue] = useState(1);

    return (
        <CustomSlider
            value={value}
            maxSteps={max}
            min={1}
            max={max}
            onChange={e => setValue(e.target.valueAsNumber)}
        />
    );
};

export default Slider;
