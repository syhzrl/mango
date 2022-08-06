import React, { FunctionComponent, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { AppDispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';

import { ISurveyQuestionOptionAutoSave } from 'entities/question';

import Colors from 'assets/themes/Colors';

import Input from 'components/Input';
import Text from 'components/Text';

import { ItemStyles } from './styles/SlidingOptionStyles';

interface SlidingOptionProps {
    isThree: boolean;
    isCardEditing: boolean;
    id: string;
    surveyId: string;
    questionId: string;
    selectedLang: string;
    step: number;
    valueEn: string;
    valueMs: string;
    valueZh: string;
    selectedQuestionId: string;
    selectedInputId: string;
    updateOption: (params: ISurveyQuestionOptionAutoSave) => void;
    setSelectedQuestionId: (id: string) => void;
    setSelectedOptionInputId: (id: string) => void;
}

const SlidingOption: FunctionComponent<SlidingOptionProps> = (props: SlidingOptionProps) => {
    const {
        isThree,
        isCardEditing,
        id,
        surveyId,
        questionId,
        selectedLang,
        step,
        valueEn,
        valueMs,
        valueZh,
        selectedQuestionId,
        selectedInputId,
        updateOption,
        setSelectedQuestionId,
        setSelectedOptionInputId,
    } = props;

    const [textEn, setTextEn] = useState(valueEn);
    const [textMs, setTextMs] = useState(valueMs);
    const [textZh, setTextZh] = useState(valueZh);

    const [optionError, setOptionError] = useState('');

    const updateOptionData = (data: ISurveyQuestionOptionAutoSave) => {
        let haveError = false;
        if (selectedLang === 'en') {
            if (!data.valueEn || !data.valueEn.trim().length) {
                haveError = true;
            }
        }

        if (selectedLang === 'ms') {
            if (!data.valueMs || !data.valueMs.trim().length) {
                haveError = true;
            }
        }

        if (selectedLang === 'zh') {
            if (!data.valueZh || !data.valueZh.trim().length) {
                haveError = true;
            }
        }

        if (!haveError) updateOption(data);
    };

    const debouncedOptionUpdate = debounce(updateOptionData, 1000, { leading: false });

    const debounceCallBack = useCallback((data: ISurveyQuestionOptionAutoSave) => debouncedOptionUpdate(data), []);

    const setLabelText = () => {
        switch (selectedLang) {
            case 'ms': return textMs;
            case 'zh': return textZh;
            default: return textEn;
        }
    };

    const labelTextChangeHandler = (value: string) => {
        let validationError = '';
        setOptionError('');

        if (!value || !value.trim().length) {
            validationError = 'Option cannot be empty';
            setOptionError(validationError);
        }

        let leftLabelEn = textEn;
        let leftLabelMs = textMs;
        let leftLabelZh = textZh;

        switch (selectedLang) {
            case 'ms': setTextMs(value); leftLabelMs = value; break;
            case 'zh': setTextZh(value); leftLabelZh = value; break;
            default: setTextEn(value); leftLabelEn = value; break;
        }

        const dataToSubmit: ISurveyQuestionOptionAutoSave = {
            surveyId,
            questionId,
            id,
            key: step,
            valueEn: leftLabelEn,
            valueMs: leftLabelMs,
            valueZh: leftLabelZh,
        };

        debounceCallBack(dataToSubmit);
    };

    if (isCardEditing) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Input
                    defaultValue={setLabelText()}
                    onChange={(e) => labelTextChangeHandler(e.target.value)}
                    css={isThree ? ItemStyles.input3 : ItemStyles.input10}
                />
                {optionError && (
                    <Text
                        style={{
                            color: Colors.red.primary,
                            fontSize: '16px',
                        }}
                    >
                        {optionError}
                    </Text>
                )}
            </div>
        );
    }

    return (
        <Text>{setLabelText()}</Text>
    );
};

const mapStateToProps = (state: RootState) => ({
    selectedQuestionId: Selectors.surveyGetSelectedQuestionId(state),
    selectedInputId: Selectors.surveyGetSelectedInputOptionId(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    updateOption: (params: ISurveyQuestionOptionAutoSave) => dispatch(Actions.updateOptionAttempt(params)),
    setSelectedQuestionId: (id: string) => dispatch(Actions.setSelectedQuestionId(id)),
    setSelectedOptionInputId: (id: string) => dispatch(Actions.setSelectedOptionInputId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlidingOption);
