import React, { FunctionComponent, useState } from 'react';
import SVG from 'react-inlinesvg';
import { nanoid } from 'nanoid';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import icons from 'assets/icons';

import { ISurveyCreateOption, ISurveyQuestionOption, ISurveyQuestionTypeEnum } from 'entities/question';

import Text from 'components/Text';
import Button from 'components/Button';

import SingleOption from './SingleOption';
import RadioButton from './RadioButton';
import Grid from './Grid';

import { ContainerStyles, ItemStyles } from './styles/SingleOptionStyles';

interface RewardCopyProps {
    surveyId: string;
    questionId: string;
    isCardEditing: boolean;
    selectedLang: string;
    answerOptions: ISurveyQuestionOption[];
    createOptionLoading: boolean;
    imageUrls?: string[];
    questionType: ISurveyQuestionTypeEnum;
    createOption: (params: ISurveyCreateOption) => void;
    deleteImage: (questionId: string, surveyId: string, url: string[]) => void;
}

const RewardCopy: FunctionComponent<RewardCopyProps> = (props: RewardCopyProps) => {
    const {
        surveyId,
        questionId,
        isCardEditing,
        selectedLang,
        answerOptions,
        createOptionLoading,
        imageUrls,
        questionType,
        createOption,
        deleteImage,
    } = props;

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
            {optionList.length ? (
                optionList.map((item, index) => {
                    const { id, valueEn, valueMs, valueZh } = item;

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
                                questionType={questionType}
                                optionId={id}
                                selectedLang={selectedLang}
                                valueEn={valueEn}
                                valueMs={valueMs}
                                valueZh={valueZh}
                                optionsLength={optionList.length}
                            />
                        </div>
                    );
                })
            ) : (
                <Text style={{ color: '#A5AAB5' }}>
                    No options available. Create one by clicking on the edit button!
                </Text>
            )}
        </div>
    );
};

RewardCopy.defaultProps = {
    imageUrls: [],
};

const mapStateToProps = (state: RootState) => ({
    createOptionLoading: Selectors.surveyCreateOptionAttempting(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    createOption: (params: ISurveyCreateOption) => dispatch(Actions.createOptionAttempt(params)),
    deleteImage: (questionId: string, surveyId: string, url: string[]) => dispatch(Actions.deleteImageAttempt({ questionId, surveyId, url })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RewardCopy);
