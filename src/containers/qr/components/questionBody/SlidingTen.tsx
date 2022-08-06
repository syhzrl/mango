import React, { FunctionComponent, useState } from 'react';
import SVG from 'react-inlinesvg';

import Actions from 'redux/Actions';
import { AppDispatch } from 'redux/store';
import { connect } from 'react-redux';
import { ISurveyQuestionOption, ISurveyQuestionSlidingOption } from 'entities/question';

import icons from 'assets/icons';

import Button from 'components/Button';

import Grid from './Grid';
import SlidingOption from './SlidingOption';
import Slider from './Slider';

import { ContainerStyles, ItemStyles } from './styles/SlidingOptionStyles';

interface SlidingTenProps {
    surveyId: string;
    questionId: string;
    isCardEditing: boolean;
    selectedLang: string;
    answerOptions: ISurveyQuestionOption[] | ISurveyQuestionSlidingOption[];
    imageUrls?: string[];
    deleteImage: (questionId: string, surveyId: string, url: string[]) => void;
}

const SlidingTen: FunctionComponent<SlidingTenProps> = (props: SlidingTenProps) => {
    const { surveyId, questionId, isCardEditing, selectedLang, answerOptions, imageUrls, deleteImage } = props;

    const [sliderOptions, setSliderOptions] = useState<ISurveyQuestionSlidingOption[]>(JSON.parse(JSON.stringify(answerOptions)));

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
            <Slider max={10} />
            <div style={ContainerStyles.labels}>
                {sliderOptions.map(item => {
                    const { id, key, valueEn, valueMs, valueZh } = item;

                    return (
                        <SlidingOption
                            isThree={false}
                            isCardEditing={isCardEditing}
                            key={id}
                            id={id}
                            surveyId={surveyId}
                            questionId={questionId}
                            selectedLang={selectedLang}
                            step={key}
                            valueEn={valueEn}
                            valueMs={valueMs}
                            valueZh={valueZh}
                        />
                    );
                })}
            </div>
        </div>
    );
};

SlidingTen.defaultProps = {
    imageUrls: [],
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    deleteImage: (questionId: string, surveyId: string, url: string[]) => dispatch(Actions.deleteImageAttempt({ questionId, surveyId, url })),
});

export default connect(null, mapDispatchToProps)(SlidingTen);
