import React, { FunctionComponent } from 'react';
import Select, { StylesConfig } from 'react-select';

import Fonts from 'assets/themes/Fonts';
import Colors from 'assets/themes/Colors';

interface LanguageSelectorProps {
    surveyId: string;
    onChange: (surveyId: string, value: string) => void;
    disabled?: boolean;
    selectedLang: string;
}

const LanguageSelector: FunctionComponent<LanguageSelectorProps> = (props: LanguageSelectorProps) => {
    const { surveyId, onChange, disabled, selectedLang } = props;
    const languageOptions = [
        {
            value: 'en',
            label: 'English',
        },
        {
            value: 'ms',
            label: 'Bahasa Melayu',
        },
        {
            value: 'zh',
            label: 'Chinese',
        },
    ];

    const languageValue = languageOptions.find(item => item.value === selectedLang);

    return (
        <Select
            styles={customStyles}
            options={languageOptions}
            onChange={(e: any) => onChange(surveyId, e.value)}
            isDisabled={disabled}
            value={languageValue}
        />
    );
};

LanguageSelector.defaultProps = {
    disabled: false,
};

const customStyles: StylesConfig = {
    container: (provided) => ({
        ...provided,
        cursor: 'pointer',
        fontFamily: Fonts.primary,
        fontSize: '15px',
    }),
    control: () => ({
        borderRadius: '0px',
        border: '1px solid #a5aab5',
        backgroundColor: 'white',
        width: '100%',
        display: 'flex',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#a5aab5',
        ':hover': {
            color: Colors.active,
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#888888',
        fontSize: '15px',
    }),
    menu: (provided) => ({
        ...provided,
        color: '#888888',
        fontSize: '15px',
        borderRadius: '0px',
        marginTop: '0px',
        width: '100%',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#888888',
    }),
};

export default LanguageSelector;
