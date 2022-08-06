import React, { FunctionComponent, useState } from 'react';
import SVG from 'react-inlinesvg';
import { nanoid } from 'nanoid';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import icons from 'assets/icons';

import { ISurveyQuestionOption, ISurveyCreateOption, ISurveyQuestionTypeEnum } from 'entities/question';

import Text from 'components/Text';
import Button from 'components/Button';

import Grid from './Grid';
import SingleOption from './SingleOption';
import RadioButton from './RadioButton';

import { ContainerStyles, ItemStyles } from './styles/SingleOptionStyles';

interface SelectOneProps {
    isCardEditing: boolean;
    surveyId: string;
    questionId: string;
    selectedLang: string;
    answerOptions: ISurveyQuestionOption[];
    createOptionLoading: boolean;
    questionType: ISurveyQuestionTypeEnum;
    createOption: (params: ISurveyCreateOption) => void;
    imageUrls?: string[];
    deleteImage: (questionId: string, surveyId: string, url: string[]) => void;
}

const SelectOne: FunctionComponent<SelectOneProps> = (props: SelectOneProps) => {
    const { isCardEditing,
        surveyId,
        questionId,
        selectedLang,
        answerOptions,
        createOptionLoading,
        imageUrls,
        questionType,
        createOption,
        deleteImage } = props;

    const [optionList, setOptionList] = useState<ISurveyQuestionOption[]>(JSON.parse(JSON.stringify(answerOptions))); // deep clone bcs this data need to be mutated

    const addMoreHandler = () => {
        createOption({
            surveyId,
            questionId,
            id: nanoid(8),
            valueEn: 'Option En',
            valueMs: 'Option Ms',
            valueZh: 'Option Zh',
        });
    };

    const renderAddOptionOrOtherButton = () => {
        if (isCardEditing) {
            return (
                <>
                    <RadioButton>
                        <SVG src={icons.Circle} id='dot' />
                    </RadioButton>
                    <Button
                        onClick={addMoreHandler}
                        css={ItemStyles.addOptionButton}
                        disabled={createOptionLoading}
                    >
                        <Text>Add option</Text>
                    </Button>
                </>
            );
        }

        return false;
    };

    return (
        <div style={ContainerStyles.body}>
            {(imageUrls && imageUrls.length > 0) && (
                <Grid>
                    {imageUrls.map(item => {
                        return (
                            <div style={{ position: 'relative' }} key={item}>
                                {isCardEditing && (
                                    <Button
                                        onClick={() => deleteImage(questionId, surveyId, [item])}
                                        css={ItemStyles.deleteButton}
                                    >
                                        <SVG src={icons.Trash} id='trash' />
                                    </Button>
                                )}
                                <img
                                    key={item}
                                    src={item}
                                    alt='no img'
                                    id='img'
                                />
                            </div>
                        );
                    })}
                </Grid>
            )}
            {optionList.map((item, index) => {
                const { id, valueEn, valueMs, valueZh, image } = item;

                return (
                    <div
                        style={ContainerStyles.radioContainer}
                        key={nanoid(4)}
                    >
                        <SingleOption
                            index={index}
                            isCardEditing={isCardEditing}
                            surveyId={surveyId}
                            questionId={questionId}
                            optionId={id}
                            selectedLang={selectedLang}
                            questionType={questionType}
                            valueEn={valueEn}
                            valueMs={valueMs}
                            valueZh={valueZh}
                            optionsLength={optionList.length}
                            images={image}
                            square={questionType === ISurveyQuestionTypeEnum.SelectMultiple}
                        />
                    </div>
                );
            })}

            <div
                style={ContainerStyles.radioContainerLast}
            >
                {renderAddOptionOrOtherButton()}
            </div>
        </div>
    );
};

SelectOne.defaultProps = {
    imageUrls: [],
};

const mapStateToProps = (state: RootState) => ({
    createOptionLoading: Selectors.surveyCreateOptionAttempting(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    createOption: (params: ISurveyCreateOption) => dispatch(Actions.createOptionAttempt(params)),
    deleteImage: (questionId: string, surveyId: string, url: string[]) => dispatch(Actions.deleteImageAttempt({ questionId, surveyId, url })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectOne);
