import React, { FunctionComponent, useState, useEffect } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import Selectors from 'redux/Selectors';
import { RootState } from 'redux/store';
import { connect } from 'react-redux';

import { ISurveyQuestionTypeEnum } from 'entities/question';
import { ISurveySelector, ISurveyTypeEnum } from 'entities/survey';

import './QuestionTypeSelectorCss.css';

interface QuestionTypeSelectorProps {
    onChange: (questionType: ISurveyQuestionTypeEnum) => void;
    surveyId: string;
    surveySelector: ISurveySelector | null;
    selectedSurveyType: ISurveyTypeEnum;
    questionType: ISurveyQuestionTypeEnum;
    disabled?: boolean;
    updateSurveyLoading: boolean;
    updateOptionLoading: boolean;
    updateQuestionLoading: boolean;
}

const QuestionTypeSelector: FunctionComponent<QuestionTypeSelectorProps> = (props: QuestionTypeSelectorProps) => {
    const {
        onChange,
        surveyId,
        surveySelector,
        selectedSurveyType,
        disabled,
        questionType,
        updateSurveyLoading,
        updateOptionLoading,
        updateQuestionLoading,
    } = props;

    const [haveRewardCopy, setHaveRewardCopy] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // check if question type 6 is here before rendering etc
        if (surveySelector) {
            if (selectedSurveyType === ISurveyTypeEnum.Standard) {
                const surveyArray = surveySelector.standard.find(item => item.id === surveyId);

                if (surveyArray) {
                    const { questions } = surveyArray;

                    for (let i = 0; i < questions.length; i += 1) {
                        const { type } = questions[i];
                        if (type === ISurveyQuestionTypeEnum.RewardCopy) {
                            setHaveRewardCopy(true);
                            break;
                        }
                    }
                }
            }

            if (selectedSurveyType === ISurveyTypeEnum.Trialist) {
                const surveyArray = surveySelector.trialist.find(item => item.id === surveyId);

                if (surveyArray) {
                    const { questions } = surveyArray;

                    for (let i = 0; i < questions.length; i += 1) {
                        const { type } = questions[i];
                        if (type === ISurveyQuestionTypeEnum.RewardCopy) {
                            setHaveRewardCopy(true);
                            break;
                        }
                    }
                }
            }

            if (selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                const surveyArray = surveySelector.repeated.find(item => item.id === surveyId);

                if (surveyArray) {
                    const { questions } = surveyArray;

                    for (let i = 0; i < questions.length; i += 1) {
                        const { type } = questions[i];
                        if (type === ISurveyQuestionTypeEnum.RewardCopy) {
                            setHaveRewardCopy(true);
                            break;
                        }
                    }
                }
            }
        }
    }, [surveySelector, selectedSurveyType]);

    const setToggleText = () => {
        switch (questionType) {
            case ISurveyQuestionTypeEnum.Dropdown: return 'Dropdown';
            case ISurveyQuestionTypeEnum.SelectOne: return 'Select One';
            case ISurveyQuestionTypeEnum.SelectMultiple: return 'Select Multiple';
            case ISurveyQuestionTypeEnum.SlidingThree: return 'Sliding Three';
            case ISurveyQuestionTypeEnum.SlidingTen: return 'Sliding Ten';
            case ISurveyQuestionTypeEnum.RewardCopy: return 'Reward Copy';
            default:
        }

        return '';
    };

    return (
        <Dropdown
            isOpen={isOpen}
            toggle={() => setIsOpen(!isOpen)}
        >
            <DropdownToggle
                caret
                className='dropdown'
                disabled={
                    disabled
                || updateSurveyLoading
                || updateQuestionLoading
                || updateOptionLoading
                }
            >
                {setToggleText()}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => onChange(ISurveyQuestionTypeEnum.Dropdown)}>
                    Dropdown
                </DropdownItem>
                <DropdownItem onClick={() => onChange(ISurveyQuestionTypeEnum.SelectOne)}>
                    Select One
                </DropdownItem>
                <DropdownItem onClick={() => onChange(ISurveyQuestionTypeEnum.SelectMultiple)}>
                    Select Multiple
                </DropdownItem>
                <DropdownItem onClick={() => onChange(ISurveyQuestionTypeEnum.SlidingThree)}>
                    Sliding Three
                </DropdownItem>
                <DropdownItem onClick={() => onChange(ISurveyQuestionTypeEnum.SlidingTen)}>
                    Sliding Ten
                </DropdownItem>
                <DropdownItem onClick={() => onChange(ISurveyQuestionTypeEnum.RewardCopy)} hidden={haveRewardCopy}>
                    Reward Copy
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>

    );
};

QuestionTypeSelector.defaultProps = {
    disabled: false,
};

const mapStateToProps = (state: RootState) => ({
    surveySelector: Selectors.surveyGetSurvey(state),
    selectedSurveyType: Selectors.surveySelectedSurveyType(state),
    updateSurveyLoading: Selectors.surveyUpdateSurveyAttempting(state),
    updateOptionLoading: Selectors.surveyUpdateOptionAttempting(state),
    updateQuestionLoading: Selectors.surveyUpdateQuestionAttempting(state),
});

export default connect(mapStateToProps)(QuestionTypeSelector);
