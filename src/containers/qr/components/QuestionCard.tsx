import React, { FunctionComponent, useState, useCallback, useEffect, useRef } from 'react';
import SVG from 'react-inlinesvg';
import { Oval } from 'react-loader-spinner';
import { nanoid } from 'nanoid';
import debounce from 'lodash.debounce';
import Skeleton from 'react-loading-skeleton';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import {
    IServerCreateQuestion,
    ISurveyChangeOptionType,
    ISurveyQuestion,
    ISurveyQuestionAutoSave,
    ISurveyQuestionOption,
    ISurveyQuestionReorder,
    ISurveyQuestionSlidingOption,
    ISurveyQuestionTypeEnum,
} from 'entities/question';

import { StandardQuestionOptions, SlidingThreeOptions, SlidingTenOptions, RewardCopyOptions } from 'lib/OptionsTemplate';

import icons from 'assets/icons';
import Colors from 'assets/themes/Colors';

import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import TextArea from 'components/TextArea';

import QuestionTypeSelector from './QuestionTypeSelector';

import Dropdown from './questionBody/Dropdown';
import SelectMultiple from './questionBody/SelectMultiple';
import SelectOne from './questionBody/SelectOne';
import SlidingThree from './questionBody/SlidingThree';
import SlidingTen from './questionBody/SlidingTen';

import { ContainerStyles, ItemStyles } from './styles/QuestionCardStyles';
import RewardCopy from './questionBody/RewardCopy';

interface QuestionCardProps {
    // Card Info
    surveyId: string;
    surveyIndex: number;

    questionId: string;
    questionIndex: number;

    questionEn: string;
    questionMs: string;
    questionZh: string;

    images: string[];

    type: ISurveyQuestionTypeEnum;

    answerOptions: ISurveyQuestionOption[] | ISurveyQuestionSlidingOption[];

    isCardEditing: boolean;
    isFinalized: boolean;
    selectedLang: string;
    updatedAt: string;

    selectedQuestionId: string;

    questionListLength: number;

    questionList: ISurveyQuestion[];

    // Loadings
    updateOptionLoading: boolean;
    updateQuestionLoading: boolean;
    changeQuestionTypeLoading: boolean;
    createOptionLoading: boolean;
    deleteImageLoading: boolean;
    reorderQuestionLoading: boolean;
    deleteQuestionLoading: boolean;
    deleteOptionLoading: boolean;

    // Dispatchs
    setSurveyEditing: (surveyId: string, state: boolean) => void;
    createNewQuestion: (params: IServerCreateQuestion) => void;
    updateQuestion: (params: ISurveyQuestionAutoSave) => void;
    reorderQuestion: (params: ISurveyQuestionReorder) => void;
    changeQuestionType: (params: ISurveyChangeOptionType) => void;
    deleteQuestion: (id: string, surveyId: string) => void;
    setUploadImageParams: (questionId: string, surveyId: string) => void;
    setUploadImageModalOpen: (state: boolean) => void;
    setSelectedSurveyId: (id: string) => void;
    setSelectedQuestionId: (id: string) => void;
    setSelectedOptionInputId: (id: string) => void;
}

const QuestionCard: FunctionComponent<QuestionCardProps> = (props: QuestionCardProps) => {
    const {
        selectedLang,
        updatedAt,
        questionId,
        questionIndex,
        surveyIndex,
        surveyId,
        isCardEditing,
        isFinalized,
        questionEn,
        questionMs,
        questionZh,
        type,
        answerOptions,
        images,
        selectedQuestionId,
        questionListLength,
        questionList,

        updateOptionLoading,
        createOptionLoading,
        updateQuestionLoading,
        changeQuestionTypeLoading,
        deleteImageLoading,
        reorderQuestionLoading,
        deleteQuestionLoading,
        deleteOptionLoading,

        setSurveyEditing,
        createNewQuestion,
        updateQuestion,
        reorderQuestion,
        changeQuestionType,
        deleteQuestion,
        setUploadImageParams,
        setUploadImageModalOpen,
        setSelectedSurveyId,
        setSelectedQuestionId,
        setSelectedOptionInputId,
    } = props;

    const [stateQuestionEn, setStateQuestionEn] = useState(questionEn);
    const [stateQuestionMs, setStateQuestionMs] = useState(questionMs);
    const [stateQuestionZh, setStateQuestionZh] = useState(questionZh);
    const [questionError, setQuestionError] = useState('');

    const [questionType, setQuestionType] = useState<ISurveyQuestionTypeEnum>(type);
    const [stateAnswerOptions, setStateAnswerOptions] = useState<ISurveyQuestionOption[] | ISurveyQuestionSlidingOption[]>(answerOptions);

    const updateQuestionData = (data: ISurveyQuestionAutoSave) => {
        let haveError = false;
        if (selectedLang === 'en') {
            if (!data.questionEn || !data.questionEn.trim().length) {
                haveError = true;
            }
        }

        if (selectedLang === 'ms') {
            if (!data.questionMs || !data.questionMs.trim().length) {
                haveError = true;
            }
        }

        if (selectedLang === 'zh') {
            if (!data.questionZh || !data.questionZh.trim().length) {
                haveError = true;
            }
        }

        if (!haveError) updateQuestion(data);
    };

    const debouncedQuestionUpdate = debounce(updateQuestionData, 1000, { leading: false });

    const debounceCallBack = useCallback((data: ISurveyQuestionAutoSave) => debouncedQuestionUpdate(data), []);

    const QuestionTitleChangeHandler = (value: string) => {
        let validationError = '';
        setQuestionError('');

        if (!value || !value.trim().length) {
            validationError = 'Question cannot be empty';
            setQuestionError(validationError);
        }

        let titleEn = stateQuestionEn;
        let titleMs = stateQuestionMs;
        let titleZh = stateQuestionZh;

        switch (selectedLang) {
            case 'ms': setStateQuestionMs(value); titleMs = value; break;
            case 'zh': setStateQuestionZh(value); titleZh = value; break;
            default: setStateQuestionEn(value); titleEn = value; break;
        }

        const dataToSubmit: ISurveyQuestionAutoSave = {
            id: questionId,
            surveyId,
            index: questionIndex,
            questionEn: titleEn,
            questionMs: titleMs,
            questionZh: titleZh,
            type: questionType,
        };

        debounceCallBack(dataToSubmit);
    };

    const QuestionTypeChangeHandler = (typeEnum: ISurveyQuestionTypeEnum) => {
        setSelectedSurveyId('');
        setSelectedQuestionId('');
        setSelectedOptionInputId('');

        setQuestionType(typeEnum);

        const dataToSubmit: ISurveyChangeOptionType = {
            id: questionId,
            surveyId,
            index: questionIndex,
            type: typeEnum,
            options: [],
        };

        switch (typeEnum) {
            case ISurveyQuestionTypeEnum.Dropdown:
            case ISurveyQuestionTypeEnum.SelectOne:
            case ISurveyQuestionTypeEnum.SelectMultiple: dataToSubmit.options = StandardQuestionOptions; break;
            case ISurveyQuestionTypeEnum.SlidingThree: dataToSubmit.options = SlidingThreeOptions; break;
            case ISurveyQuestionTypeEnum.SlidingTen: dataToSubmit.options = SlidingTenOptions; break;
            case ISurveyQuestionTypeEnum.RewardCopy: dataToSubmit.options = RewardCopyOptions; break;
            default:
        }

        changeQuestionType(dataToSubmit);
    };

    const QuestionReorderHandler = (direction: string) => {
        const dataToSubmit: ISurveyQuestionReorder = {
            questionId,
            surveyId,
            direction,
        };

        reorderQuestion(dataToSubmit);
    };

    const createNewQuestionHandler = () => {
        const listOfIndexes = questionList.map(item => item.index);

        const biggestIndex = Math.max(...listOfIndexes);

        createNewQuestion({
            surveyId,
            id: nanoid(8),
            index: biggestIndex + 1, // this will ensure that the new index is the biggest index + 1
            questionEn: 'New Question en',
            questionMs: 'New Question ms',
            questionZh: 'New Question zh',
            type: ISurveyQuestionTypeEnum.Dropdown,
            initialOptionId: nanoid(8),
        });
    };

    const setQuestionText = () => {
        switch (selectedLang) {
            case 'ms': return stateQuestionMs;
            case 'zh': return stateQuestionZh;
            default: return stateQuestionEn;
        }
    };

    const imageIconClickHandler = () => {
        setUploadImageParams(questionId, surveyId);
        setUploadImageModalOpen(true);
    };

    const renderQuestionBody = () => {
        if (questionType === ISurveyQuestionTypeEnum.SelectMultiple) {
            return (
            // <SelectMultiple
            //     surveyId={surveyId}
            //     questionId={questionId}
            //     selectedLang={selectedLang}
            //     answerOptions={stateAnswerOptions}
            //     isCardEditing={isCardEditing}
            //     imageUrls={images}
            //     questionType={questionType}
            // />

                <SelectOne
                    surveyId={surveyId}
                    questionId={questionId}
                    selectedLang={selectedLang}
                    answerOptions={stateAnswerOptions}
                    isCardEditing={isCardEditing}
                    imageUrls={images}
                    questionType={questionType}
                />
            );
        }

        if (questionType === ISurveyQuestionTypeEnum.SelectOne) {
            return (
                <SelectOne
                    surveyId={surveyId}
                    questionId={questionId}
                    selectedLang={selectedLang}
                    answerOptions={stateAnswerOptions}
                    isCardEditing={isCardEditing}
                    imageUrls={images}
                    questionType={questionType}
                />
            );
        }

        if (questionType === ISurveyQuestionTypeEnum.SlidingThree) {
            return (
                <SlidingThree
                    surveyId={surveyId}
                    questionId={questionId}
                    selectedLang={selectedLang}
                    answerOptions={stateAnswerOptions}
                    isCardEditing={isCardEditing}
                    imageUrls={images}
                />
            );
        }

        if (questionType === ISurveyQuestionTypeEnum.SlidingTen) {
            return (
                <SlidingTen
                    surveyId={surveyId}
                    questionId={questionId}
                    selectedLang={selectedLang}
                    answerOptions={stateAnswerOptions}
                    isCardEditing={isCardEditing}
                    imageUrls={images}
                />
            );
        }

        if (questionType === ISurveyQuestionTypeEnum.RewardCopy) {
            return (
                <RewardCopy
                    surveyId={surveyId}
                    questionId={questionId}
                    selectedLang={selectedLang}
                    answerOptions={stateAnswerOptions}
                    isCardEditing={isCardEditing}
                    imageUrls={images}
                    questionType={questionType}
                />
            );
        }

        return (
        // <Dropdown
        //     surveyId={surveyId}
        //     questionType={questionType}
        //     questionId={questionId}
        //     selectedLang={selectedLang}
        //     answerOptions={stateAnswerOptions}
        //     isCardEditing={isCardEditing}
        //     imageUrls={images}
        // />

            <SelectOne
                surveyId={surveyId}
                questionId={questionId}
                selectedLang={selectedLang}
                answerOptions={stateAnswerOptions}
                isCardEditing={isCardEditing}
                imageUrls={images}
                questionType={questionType}
            />
        );
    };

    const renderQuestionTitle = () => {
        if (isCardEditing) {
            return (
                <div
                    style={{
                        width: '60%',
                    }}
                >
                    <TextArea
                        value={setQuestionText()}
                        onChange={e => { e.preventDefault(); QuestionTitleChangeHandler(e.target.value); }}
                        css={questionError ? ItemStyles.questionInputError : ItemStyles.questionInput}
                        maxLength={170}
                        id={questionId}
                    />
                    {questionError && (
                        <Text
                            style={{
                                color: Colors.red.primary,
                                marginTop: '5px',
                            }}
                        >
                            {questionError}
                        </Text>
                    )}
                </div>
            );
        }

        return (
            <div
                style={{
                    width: '60%',
                }}
            >
                <Text css={ItemStyles.questionTitle}>{setQuestionText()}</Text>
            </div>
        );
    };

    const renderDisketteOrSpinner = () => {
        if (
            updateOptionLoading
            || updateQuestionLoading
            || createOptionLoading
            || deleteImageLoading
            || reorderQuestionLoading
            || deleteQuestionLoading
            || deleteOptionLoading
            || changeQuestionTypeLoading
        ) {
            return (
                <Oval
                    height={20}
                    width={20}
                    color='#1998dd'
                    secondaryColor='#A5AAB5'
                />
            );
        }

        return (
            <SVG
                src={icons.Diskette}
                style={{
                    color: ' #A5AAB5',
                    height: '20px',
                    width: '20px',
                }}
            />
        );
    };

    return (
        <div style={ContainerStyles.card}>
            <div style={ContainerStyles.upDownChevronContainer}>
                <Button
                    onClick={() => QuestionReorderHandler('up')}
                    css={(updateQuestionLoading || updateOptionLoading) ? ItemStyles.chevronButtonDisabled : ItemStyles.chevronButton}
                    disabled={isFinalized || updateQuestionLoading || updateOptionLoading}
                >
                    <SVG src={icons.ChevronUp} id='chevron' />
                </Button>
                <div style={{ borderTop: '1px solid #A5AAB5', width: '100%' }} />
                <Button
                    onClick={() => QuestionReorderHandler('down')}
                    css={(updateQuestionLoading || updateOptionLoading) ? ItemStyles.chevronButtonDisabled : ItemStyles.chevronButton}
                    disabled={isFinalized || updateQuestionLoading || updateOptionLoading}
                >
                    <SVG src={icons.ChevronDown} id='chevron' />
                </Button>
            </div>

            <div style={ContainerStyles.titleAndBodyContainer}>
                <div style={ContainerStyles.titleContainer}>

                    {renderQuestionTitle()}
                    <div style={ContainerStyles.typeSelectorAndImg}>
                        <div>
                            <QuestionTypeSelector
                                onChange={QuestionTypeChangeHandler}
                                questionType={questionType}
                                disabled={isFinalized}
                                surveyId={surveyId}
                            />
                        </div>

                        {(isCardEditing && images.length < 4) && (
                            <Button
                                onClick={imageIconClickHandler}
                                css={(updateQuestionLoading || updateOptionLoading) ? ItemStyles.uploadImageButtonDisabled : ItemStyles.uploadImageButton}
                                disabled={isFinalized || updateQuestionLoading || updateOptionLoading}
                            >
                                <SVG src={icons.Image} id='image' />
                            </Button>
                        )}
                    </div>
                </div>

                <div style={ContainerStyles.questionBodyContainer}>
                    {renderQuestionBody()}
                </div>

                {updatedAt && (
                    <Text css={ItemStyles.updatedAt}>
                        {`Updated at ${updatedAt}`}
                    </Text>
                )}
            </div>

            <div style={ContainerStyles.sideButtonsContainer}>
                {!isFinalized && (
                    <>
                        <Button
                            onClick={createNewQuestionHandler}
                            disabled={updateQuestionLoading || updateOptionLoading}
                            css={(updateQuestionLoading || updateOptionLoading) ? ItemStyles.controlButtonsDisabled : ItemStyles.plusButton}
                        >
                            <SVG src={icons.Plus} id='plus' />
                        </Button>
                        <Button
                            onClick={() => setSurveyEditing(surveyId, !isCardEditing)}
                            disabled={updateQuestionLoading || updateOptionLoading}
                            css={(updateQuestionLoading || updateOptionLoading) ? ItemStyles.controlButtonsDisabled : ItemStyles.editButton}
                        >
                            <SVG src={icons.Pencil} id='pencil' />
                        </Button>
                        <Button
                            onClick={() => deleteQuestion(questionId, surveyId)}
                            disabled={updateQuestionLoading || updateOptionLoading}
                            css={(updateQuestionLoading || updateOptionLoading) ? ItemStyles.controlButtonsDisabled : ItemStyles.deleteButton}
                        >
                            <SVG src={icons.Trash} id='trash' />
                        </Button>

                        {renderDisketteOrSpinner()}
                    </>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    updateOptionLoading: Selectors.surveyUpdateOptionAttempting(state),
    updateQuestionLoading: Selectors.surveyUpdateQuestionAttempting(state),
    changeQuestionTypeLoading: Selectors.surveyChangeQuestionTypeAttempting(state),
    createOptionLoading: Selectors.surveyCreateOptionAttempting(state),
    deleteImageLoading: Selectors.surveyGetDeleteImageAttempting(state),
    reorderQuestionLoading: Selectors.surveyReorderQuestionAttempting(state),
    deleteQuestionLoading: Selectors.surveyDeleteQuestionAttempting(state),
    deleteOptionLoading: Selectors.surveyDeleteOptionAttempting(state),
    selectedQuestionId: Selectors.surveyGetSelectedQuestionId(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setSurveyEditing: (surveyId: string, state: boolean) => dispatch(Actions.setSurveyCardEditing({ surveyId, isEditing: state })),
    createNewQuestion: (params: IServerCreateQuestion) => dispatch(Actions.createQuestionAttempt(params)),
    updateQuestion: (params: ISurveyQuestionAutoSave) => dispatch(Actions.updateQuestionAttempt(params)),
    reorderQuestion: (params: ISurveyQuestionReorder) => dispatch(Actions.reorderQuestionAttempt(params)),
    changeQuestionType: (params: ISurveyChangeOptionType) => dispatch(Actions.changeQuestionTypeAttempt(params)),
    deleteQuestion: (id: string, surveyId: string) => dispatch(Actions.deleteQuestionAttempt({ id, surveyId })),
    setUploadImageParams: (questionId: string, surveyId: string) => dispatch(Actions.setUploadImageParams({ questionId, surveyId })),
    setUploadImageModalOpen: (state: boolean) => dispatch(Actions.setUploadImageModalOpen(state)),
    setSelectedSurveyId: (id: string) => dispatch(Actions.setSelectedSurveyId(id)),
    setSelectedQuestionId: (id: string) => dispatch(Actions.setSelectedQuestionId(id)),
    setSelectedOptionInputId: (id: string) => dispatch(Actions.setSelectedOptionInputId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
