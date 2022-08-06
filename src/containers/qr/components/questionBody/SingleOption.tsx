import React, { FunctionComponent, useState, useCallback } from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import debounce from 'lodash.debounce';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import { ISurveyDeleteOption, ISurveyQuestionOptionAutoSave, ISurveyQuestionTypeEnum } from 'entities/question';

import icons from 'assets/icons';
import Colors from 'assets/themes/Colors';

import Text from 'components/Text';
import Input from 'components/Input';

import TextArea from 'components/TextArea';
import RadioButton from './RadioButton';
import Grid from './Grid';

import { ContainerStyles, ItemStyles } from './styles/SingleOptionStyles';

interface SingleOptionProps {
    isCardEditing: boolean;
    index: number;
    surveyId: string;
    questionId: string;
    selectedLang: string;
    questionType: ISurveyQuestionTypeEnum;
    optionId: string;
    valueEn: string;
    valueMs: string;
    valueZh: string;
    square?: boolean;
    optionsLength: number;
    selectedQuestionId: string;
    selectedInputId: string;
    images?: string[];
    updateOption: (params: ISurveyQuestionOptionAutoSave) => void;
    deleteOption: (params: ISurveyDeleteOption) => void;
    setSelectedQuestionId: (id: string) => void;
    setSelectedOptionInputId: (id: string) => void;
}

const DeleteButton = styled.button`
    background-color: transparent;
    color: red;

    border: none;
    
    margin-left: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    #x {
        height: 20px;
        width: 20px;
    }
`;

const SingleOption: FunctionComponent<SingleOptionProps> = (props: SingleOptionProps) => {
    const {
        isCardEditing,
        index,
        surveyId,
        questionId,
        optionId,
        selectedLang,
        valueEn,
        valueMs,
        valueZh,
        square,
        optionsLength,
        questionType,
        selectedQuestionId,
        selectedInputId,
        images,
        updateOption,
        deleteOption,
        setSelectedQuestionId,
        setSelectedOptionInputId,
    } = props;

    const [optionValueEn, setOptionValueEn] = useState(valueEn);
    const [optionValueMs, setOptionValueMs] = useState(valueMs);
    const [optionValueZh, setOptionValueZh] = useState(valueZh);
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

    const debouncedOptionUpdate = debounce(updateOptionData, 500, { leading: false });

    const debounceCallBack = useCallback((data: ISurveyQuestionOptionAutoSave) => debouncedOptionUpdate(data), []);

    const onChangeHandler = (value: string) => {
        let validationError = '';
        setOptionError('');

        if (!value || !value.trim().length) {
            validationError = 'Option cannot be empty';
            setOptionError(validationError);
        }

        let stateEn = optionValueEn;
        let stateMs = optionValueMs;
        let stateZh = optionValueZh;

        switch (selectedLang) {
            case 'ms': setOptionValueMs(value); stateMs = value; break;
            case 'zh': setOptionValueZh(value); stateZh = value; break;
            default: setOptionValueEn(value); stateEn = value; break;
        }

        const dataToSubmit: ISurveyQuestionOptionAutoSave = {
            surveyId,
            questionId,
            id: optionId,
            valueEn: stateEn,
            valueMs: stateMs,
            valueZh: stateZh,
        };

        debounceCallBack(dataToSubmit);
    };

    const onRemoveClickHandler = () => {
        deleteOption({
            surveyId,
            questionId,
            id: optionId,
        });
    };

    const setOptionText = () => {
        switch (selectedLang) {
            case 'ms': return optionValueMs;
            case 'zh': return optionValueZh;
            default: return optionValueEn;
        }
    };

    const renderYesNoCopyLabel = (indexNum: number) => {
        return (
            <Text
                css={ItemStyles.yesNoCopy}
            >
                {`Copy for ${indexNum === 0 ? 'Yes' : 'No'}`}
            </Text>
        );
    };

    const renderOptionBody = () => {
        if (isCardEditing) {
            if (questionType === ISurveyQuestionTypeEnum.RewardCopy) {
                return (
                    <>
                        <div>
                            {questionType === ISurveyQuestionTypeEnum.RewardCopy && renderYesNoCopyLabel(index)}
                            <TextArea
                                onChange={(e) => onChangeHandler(e.target.value)}
                                css={optionError ? ItemStyles.rewardCopyError : ItemStyles.rewardCopy}
                                id={optionId}
                                value={setOptionText()}
                            />
                        </div>
                        {optionError && (
                            <Text
                                style={{
                                    color: Colors.red.primary,
                                    marginLeft: '15px',
                                }}
                            >
                                {optionError}
                            </Text>
                        )}
                    </>
                );
            }

            return (
                <>
                    <Input
                        onChange={(e) => onChangeHandler(e.target.value)}
                        css={optionError ? ItemStyles.inputError : ItemStyles.input}
                        id={optionId}
                        defaultValue={setOptionText()}
                    />
                    {optionError && (
                        <Text
                            style={{
                                color: Colors.red.primary,
                                marginLeft: '15px',
                            }}
                        >
                            {optionError}
                        </Text>
                    )}
                </>
            );
        }

        return (
            <div>
                {questionType === ISurveyQuestionTypeEnum.RewardCopy && renderYesNoCopyLabel(index)}
                <Text>
                    {setOptionText()}
                </Text>
            </div>
        );
    };

    return (
        <div
            style={{
                width: '100%',
            }}
        >
            {(images && images.length > 0) && (
                <Grid>
                    {images?.map(item => {
                        return (
                            <img
                                src={item}
                                alt='no img'
                                id='img'
                            />
                        );
                    })}
                </Grid>
            )}
            <div
                style={ContainerStyles.radioContainer}
            >
                <RadioButton square={square}>
                    <SVG src={icons.Circle} id='dot' />
                </RadioButton>

                {renderOptionBody()}

                {(optionsLength !== 1 && isCardEditing && questionType !== ISurveyQuestionTypeEnum.RewardCopy) && (
                    <DeleteButton
                        onClick={onRemoveClickHandler}
                    >
                        <SVG src={icons.X} id='x' />
                    </DeleteButton>
                )}
            </div>
        </div>
    );
};

SingleOption.defaultProps = {
    square: false,
    images: [],
};

const mapStateToProps = (state: RootState) => ({
    selectedQuestionId: Selectors.surveyGetSelectedQuestionId(state),
    selectedInputId: Selectors.surveyGetSelectedInputOptionId(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    updateOption: (params: ISurveyQuestionOptionAutoSave) => dispatch(Actions.updateOptionAttempt(params)),
    deleteOption: (params: ISurveyDeleteOption) => dispatch(Actions.deleteOptionAttempt(params)),
    setSelectedQuestionId: (id: string) => dispatch(Actions.setSelectedQuestionId(id)),
    setSelectedOptionInputId: (id: string) => dispatch(Actions.setSelectedOptionInputId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOption);
