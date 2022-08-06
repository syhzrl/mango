import React, { FunctionComponent, useState, useCallback, useRef, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import debounce from 'lodash.debounce';
import { nanoid } from 'nanoid';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import icons from 'assets/icons';
import Colors from 'assets/themes/Colors';

import { IDeleteSurvey, IEnableSurveyParams, ISurveyAutoSave, ISurveyTypeEnum } from 'entities/survey';
import { IServerCreateQuestion, ISurveyQuestion, ISurveyQuestionTypeEnum } from 'entities/question';

import Text from 'components/Text';
import Button from 'components/Button';
import Input from 'components/Input';
import TextArea from 'components/TextArea';

import LanguageSelector from './LanguageSelector';
import SurveyStatusToggle from './SurveyStatustoggle';
import QuestionCard from './QuestionCard';

import { ContainerStyles, ItemStyles } from './styles/SurveyCardStyles';

interface SurveyCardProps {
    // Survey Info
    surveyId: string;
    surveyIndex: number;
    surveyType: ISurveyTypeEnum;
    qrId: string;

    nameEn: string;
    nameMs: string;
    nameZh: string;

    isActive: boolean,
    isFinalized: boolean, // no more changes to this survey can be made

    descriptionEn: string;
    descriptionZh: string;
    descriptionMs: string;

    questions: ISurveyQuestion[];

    isCardOpen: boolean;
    isCardEditing: boolean;
    selectedLang: string;
    updatedAt: string;

    selectedSurveyId: string;

    // Loadings
    updateSurveyLoading: boolean;
    createQuestionLoading: boolean;

    // Errors
    createQuestionError: string;

    // Dispatchs
    setSurveyEditing: (surveyId: string, state: boolean) => void;
    updateSurvey: (params: ISurveyAutoSave) => void;
    setEnableSurveyModalOpen: (state: boolean) => void;
    enableSurvey: (id: string, enabled: boolean, qrId: string, surveyType: ISurveyTypeEnum) => void;
    setDeleteSurveyModalOpen: (state: boolean) => void;
    setSurveyCardOpen: (surveyId: string, state: boolean) => void;
    setSurveyCardLanguage: (surveyId: string, language: string) => void;
    setEnableSurveyParams: (params: IEnableSurveyParams) => void;
    resetEnableSurveyParams: () => void;
    setDeleteSurveyParams: (params: IDeleteSurvey) => void;
    createNewQuestion: (params: IServerCreateQuestion) => void;
    setSelectedSurveyId: (id: string) => void;
    setSelectedQuestionId: (id: string) => void;
}

interface CollapsibleProps {
    isOpen: boolean;
}

const Collapsible = styled.div<CollapsibleProps>`
    overflow: hidden;
    transition: all 0.5s;
    width: 100%;

    transition: 0.3s;

    border-top: ${props => (props.isOpen && '1px solid rgb(0,0,0,0.2)')};

    height: ${props => (props.isOpen ? 'fit-content' : '0px')};
    opacity:  ${props => (props.isOpen ? '1' : '0')};
`;

const SurveyCard: FunctionComponent<SurveyCardProps> = (props: SurveyCardProps) => {
    const {
        surveyId,
        nameEn,
        nameMs,
        nameZh,
        isActive,
        isFinalized,
        descriptionEn,
        descriptionZh,
        descriptionMs,
        surveyType,
        qrId,

        surveyIndex,

        questions,

        isCardOpen,
        isCardEditing,
        selectedLang,
        updatedAt,

        selectedSurveyId,

        setSurveyEditing,
        updateSurveyLoading,
        updateSurvey,

        setEnableSurveyModalOpen,
        enableSurvey,

        setDeleteSurveyModalOpen,

        setSurveyCardOpen,
        setSurveyCardLanguage,

        createQuestionLoading,
        createQuestionError,
        setEnableSurveyParams,
        resetEnableSurveyParams,
        setDeleteSurveyParams,

        createNewQuestion,

        setSelectedSurveyId,
        setSelectedQuestionId,
    } = props;

    const [active, setActive] = useState(isActive);

    const [surveyNameEn, setSurveyNameEn] = useState(nameEn);
    const [surveyNameMs, setSurveyNameMs] = useState(nameMs);
    const [surveyNameZh, setSurveyNameZh] = useState(nameZh);
    const [surveyNameError, setSurveyNameError] = useState('');

    const [surveyDescEn, setSurveyDescEn] = useState(descriptionEn);
    const [surveyDescMs, setSurveyDescMs] = useState(descriptionMs);
    const [surveyDescZh, setSurveyDescZh] = useState(descriptionZh);
    const [surveyDescError, setSurveyDescError] = useState('');

    const [questionData, setQuestionData] = useState<ISurveyQuestion[]>(questions);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.setSelectionRange(3000, 3000);
        }
    }, []);

    const setRenderedName = () => {
        switch (selectedLang) {
            case 'ms': return surveyNameMs;
            case 'zh': return surveyNameZh;
            default: return surveyNameEn;
        }
    };

    const setRenderedDesc = () => {
        switch (selectedLang) {
            case 'ms': return surveyDescMs;
            case 'zh': return surveyDescZh;
            default: return surveyDescEn;
        }
    };

    const updateSurveyData = (data: ISurveyAutoSave) => {
        let haveError = false;
        if (selectedLang === 'en') {
            if (!data.nameEn || !data.nameEn.trim().length) {
                haveError = true;
            }
            if (!data.descriptionEn || !data.descriptionEn.trim().length) {
                haveError = true;
            }
        }

        if (selectedLang === 'ms') {
            if (!data.nameMs || !data.nameMs.trim().length) {
                haveError = true;
            }
            if (!data.descriptionMs || !data.descriptionMs.trim().length) {
                haveError = true;
            }
        }

        if (selectedLang === 'zh') {
            if (!data.nameZh || !data.nameZh.trim().length) {
                haveError = true;
            }
            if (!data.descriptionZh || !data.descriptionZh.trim().length) {
                haveError = true;
            }
        }

        if (!haveError) updateSurvey(data);
    };

    const debouncedSurveyUpdate = debounce(updateSurveyData, 1000, { leading: false });

    const debounceCallBack = useCallback((data: ISurveyAutoSave) => {
        debouncedSurveyUpdate(data);
    }, []);

    const surveyNameInputHandler = (name: string) => {
        let validationError = '';
        setSurveyNameError('');

        if (!name || !name.trim().length) {
            validationError = 'Survey name cannot be empty';
            setSurveyNameError(validationError);
        }

        let submittedNameEn = surveyNameEn;
        let submittedNameMs = surveyNameMs;
        let submittedNameZh = surveyNameZh;

        switch (selectedLang) {
            case 'ms': setSurveyNameMs(name); submittedNameMs = name; break;
            case 'zh': setSurveyNameZh(name); submittedNameZh = name; break;
            default: setSurveyNameEn(name); submittedNameEn = name; break;
        }

        const dataToSubmit: ISurveyAutoSave = {
            id: surveyId,
            nameEn: submittedNameEn,
            nameMs: submittedNameMs,
            nameZh: submittedNameZh,
            descriptionEn: surveyDescEn,
            descriptionMs: surveyDescMs,
            descriptionZh: surveyDescZh,
        };

        debounceCallBack(dataToSubmit);
    };

    const surveyDescInputHandler = (desc: string) => {
        let validationError = '';
        setSurveyDescError('');

        if (!desc || !desc.trim().length) {
            validationError = 'Survey description cannot be empty';
            setSurveyDescError(validationError);
        }

        let submittedDescEn = surveyDescEn;
        let submittedDescMs = surveyDescMs;
        let submittedDescZh = surveyDescZh;

        switch (selectedLang) {
            case 'ms': setSurveyDescMs(desc); submittedDescMs = desc; break;
            case 'zh': setSurveyDescZh(desc); submittedDescZh = desc; break;
            default: setSurveyDescEn(desc); submittedDescEn = desc; break;
        }

        const dataToSubmit: ISurveyAutoSave = {
            id: surveyId,
            nameEn: surveyNameEn,
            nameMs: surveyNameMs,
            nameZh: surveyNameZh,
            descriptionEn: submittedDescEn,
            descriptionMs: submittedDescMs,
            descriptionZh: submittedDescZh,
        };

        debounceCallBack(dataToSubmit);
    };

    const statusToggleHandler = () => {
        if (!active) {
            setEnableSurveyModalOpen(true);
            setEnableSurveyParams({
                isFinalized,
                id: surveyId,
                enabled: true,
                qrId,
                surveyType,
            });
        } else {
            resetEnableSurveyParams();
            enableSurvey(surveyId, false, qrId, surveyType);
        }
    };

    const renderTitleAndDesc = () => {
        if (isCardEditing) {
            return (
                <>
                    <div style={{ marginBottom: '15px', width: '100%' }}>
                        <Input
                            onChange={e => surveyNameInputHandler(e.target.value)}
                            value={setRenderedName()}
                            css={surveyNameError ? ItemStyles.titleInputError : ItemStyles.titleInput}
                            maxLength={100}
                        />

                        {surveyNameError && (
                            <Text
                                style={{
                                    color: Colors.red.primary,
                                    marginTop: '5px',
                                }}
                            >
                                {surveyNameError}
                            </Text>
                        )}
                    </div>

                    <div style={{ marginBottom: '15px', width: '100%' }}>
                        <TextArea
                            onChange={e => surveyDescInputHandler(e.target.value)}
                            value={setRenderedDesc()}
                            css={surveyDescError ? ItemStyles.descInputError : ItemStyles.descInput}
                            maxLength={2000}
                            id={surveyId}
                        // reference={textAreaRef}
                        />
                        {surveyDescError && (
                            <Text
                                style={{
                                    color: Colors.red.primary,
                                    marginTop: '5px',
                                }}
                            >
                                {surveyDescError}
                            </Text>
                        )}
                    </div>
                </>
            );
        }

        return (
            <>
                <Text style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
                    {setRenderedName()}
                </Text>

                <Text style={{ fontSize: '15px', color: '#888888' }}>
                    {setRenderedDesc()}
                </Text>
            </>
        );
    };

    const renderDisketteOrSpinner = () => {
        if (updateSurveyLoading) {
            return (
                <Oval
                    height={30}
                    width={30}
                    color='#1998dd'
                    secondaryColor='#A5AAB5'
                />
            );
        }

        return (
            <SVG
                src={icons.Diskette}
                style={{
                    color: '#A5AAB5',
                    height: '20px',
                    width: '20px',
                }}
            />
        );
    };

    return (
        <div style={ContainerStyles.surveyCard}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={ContainerStyles.collapsibleChevronContainer}>
                    <Button
                        onClick={() => setSurveyCardOpen(surveyId, !isCardOpen)}
                        css={isCardOpen ? ItemStyles.chevronButtonDown : ItemStyles.chevronButton}
                    >
                        <SVG src={icons.ChevronRight} id='chevron' />
                    </Button>
                </div>

                <div style={ContainerStyles.mainContainer}>
                    <div style={ContainerStyles.nameAndDescContainer}>
                        {renderTitleAndDesc()}
                    </div>

                    <div style={ContainerStyles.toggleAndLangDropdownContainer}>
                        <div style={{ paddingRight: '10px' }}>
                            <div style={ContainerStyles.toggleContainer}>
                                <Text css={ItemStyles.statusText}>
                                    {`${active ? 'Active' : 'Inactive'} survey`}
                                </Text>
                                <SurveyStatusToggle
                                    checked={active}
                                    onChange={statusToggleHandler}
                                />
                                {!isFinalized ? (
                                    <Button
                                        onClick={() => setSurveyEditing(surveyId, !isCardEditing)}
                                        css={ItemStyles.editSurveyButton}
                                    >
                                        <SVG
                                            src={icons.Pencil}
                                            id='pencil'
                                        />
                                    </Button>
                                ) : (
                                    <div
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            backgroundColor: 'white',
                                        }}
                                    />
                                )}
                                {!active ? (
                                    <Button
                                        onClick={() => {
                                            setDeleteSurveyParams({ id: surveyId, qrId, surveyType });
                                            setDeleteSurveyModalOpen(true);
                                        }}
                                        css={ItemStyles.deleteSurveyButton}
                                    >
                                        <SVG
                                            src={icons.Trash}
                                            id='trash'
                                        />
                                    </Button>
                                ) : (
                                    <div
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            backgroundColor: 'white',
                                        }}
                                    />
                                )}
                            </div>

                            <div>
                                <LanguageSelector
                                    onChange={setSurveyCardLanguage}
                                    surveyId={surveyId}
                                    selectedLang={selectedLang}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                {renderDisketteOrSpinner()}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Collapsible isOpen={isCardOpen}>
                <div style={ContainerStyles.questionCardContainer}>
                    {questionData.length > 0 ? (
                        questionData.map(item => {
                            const {
                                id,
                                index,
                                questionEn,
                                questionMs,
                                questionZh,
                                type,
                                options,
                                image,
                            } = item;

                            return (
                                <QuestionCard
                                    key={id}
                                    surveyId={surveyId}
                                    selectedLang={selectedLang}
                                    isCardEditing={isCardEditing}
                                    isFinalized={isFinalized}
                                    questionId={id}
                                    questionIndex={index}
                                    questionEn={questionEn}
                                    questionMs={questionMs}
                                    questionZh={questionZh}
                                    type={type}
                                    answerOptions={options}
                                    surveyIndex={surveyIndex}
                                    updatedAt={updatedAt}
                                    images={image || []}
                                    questionListLength={questionData.length}
                                    questionList={questionData}
                                />
                            );
                        })
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                            <Button
                                onClick={() => createNewQuestion({
                                    surveyId,
                                    id: nanoid(8),
                                    index: 0,
                                    questionEn: 'New Question en',
                                    questionMs: 'New Question ms',
                                    questionZh: 'New Question zh',
                                    type: ISurveyQuestionTypeEnum.Dropdown,
                                    initialOptionId: nanoid(8),
                                })}
                                css={ItemStyles.createNewQuestionButton}
                            >
                                <Text>CREATE NEW QUESTION</Text>
                            </Button>
                        </div>
                    )}
                    {createQuestionLoading && <Skeleton count={1} height={200} />}

                    {createQuestionError && (
                        <div style={ContainerStyles.createQuestionErrorContainer}>
                            <Text>{createQuestionError}</Text>
                        </div>
                    )}
                </div>
            </Collapsible>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    updateSurveyLoading: Selectors.surveyUpdateSurveyAttempting(state),

    enableSurveyLoading: Selectors.surveyEnableSurveyAttempting(state),
    enableSurveyError: Selectors.surveyEnableSurveyError(state),

    isEnableSurveyModalOpen: Selectors.surveyIsEnableSurveyModalOpen(state),

    createQuestionLoading: Selectors.surveyCreateQuestionAttempting(state),
    createQuestionError: Selectors.surveyCreateQuestionError(state),

    selectedSurveyId: Selectors.surveyGetSelectedSurveyId(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    updateSurvey: (params: ISurveyAutoSave) => dispatch(Actions.updateSurveyAttempt(params)),
    setEnableSurveyModalOpen: (state: boolean) => dispatch(Actions.setEnableSurveyModalOpen(state)),
    enableSurvey: (id: string, enabled: boolean, qrId: string, surveyType: ISurveyTypeEnum) => dispatch(Actions.enableSurveyAttempt({ id, enabled, qrId, surveyType })),
    setDeleteSurveyModalOpen: (state: boolean) => dispatch(Actions.setDeleteSurveyModalOpen(state)),
    setSurveyEditing: (surveyId: string, state: boolean) => dispatch(Actions.setSurveyCardEditing({ surveyId, isEditing: state })),
    setSurveyCardOpen: (surveyId: string, state: boolean) => dispatch(Actions.setSurveyCardOpen({ surveyId, isOpen: state })),
    setSurveyCardLanguage: (surveyId: string, language: string) => dispatch(Actions.setSurveyCardLanguage({ surveyId, selectedLang: language })),
    setEnableSurveyParams: (params: IEnableSurveyParams) => dispatch(Actions.setEnableSurveyParams(params)),
    resetEnableSurveyParams: () => dispatch(Actions.enableSurveyParamsReset()),
    setDeleteSurveyParams: (params: IDeleteSurvey) => dispatch(Actions.setDeleteSurveyParams(params)),
    createNewQuestion: (params: IServerCreateQuestion) => dispatch(Actions.createQuestionAttempt(params)),
    setSelectedSurveyId: (id: string) => dispatch(Actions.setSelectedSurveyId(id)),
    setSelectedQuestionId: (id: string) => dispatch(Actions.setSelectedQuestionId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCard);
