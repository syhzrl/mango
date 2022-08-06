import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEnableSurveyParams, ISurvey, ISurveyTypeEnum, UploadImageParams } from 'entities/survey';
import {
    ICreateQuestion,
    IServerCreateQuestion,
    ISurveyQuestionOption,
    ISurveyQuestionSlidingOption,
    ISurveyQuestionTypeEnum,
} from 'entities/question';
import {
    SurveyReduxState,
    GetAllSurveyActionPayload,
    CreateNewSurveyActionPayload,
    EnableSurveyActionPayload,
    DeleteSurveyActionPayload,
    SetSurveyCardOpenActionPayload,
    SetSurveyCardLanguageActionPayload,
    UpdateOptionActionPayload,
    SetSurveyCardEditingActionPayload,
    UpdateQuestionActionPayload,
    ReorderQuestionActionPayload,
    UpdateSurveyActionPayload,
    ChangeQuestionTypeActionPayload,
    CreateOptionActionPayload,
    DeleteOptionActionPayload,
    DeleteQuestionActionPayload,
    SetImageUrlsActionPayload,
    DeleteImageActionPayload,
} from './types';

const initialState: SurveyReduxState = {
    actions: {
        getAll: false,
        createNew: false,
        enableSurvey: false,
        deleteSurvey: false,
        updateSurvey: false,
        createQuestion: false,
        createOption: false,
        updateOption: false,
        updateQuestion: false,
        reorderQuestion: false,
        changeQuestionType: false,
        deleteOption: false,
        deleteQuestion: false,
        deleteImage: false,
    },
    surveys: {
        standard: [],
        trialist: [],
        repeated: [],
    },
    surveysUI: {
        standard: [],
        trialist: [],
        repeated: [],
    },
    isCreateNewSurveyModalOpen: false,
    isEnableSurveyModalOpen: false,
    isDeleteSurveyModalOpen: false,
    isUploadImageModalOpen: false,
    selectedSurveyType: ISurveyTypeEnum.Standard,
    selectedSurveyId: '',
    selectedQuestionId: '',
    selectedOptionInputId: '',
    enableSurveyParams: {
        id: '',
        qrId: '',
        surveyType: ISurveyTypeEnum.Reset,
        enabled: false,
        isFinalized: false,
    },
    deleteSurveyParams: {
        id: '',
        qrId: '',
        surveyType: ISurveyTypeEnum.Reset,
    },
    uploadImageParams: {
        surveyId: '',
        questionId: '',
    },
    error: {
        getAll: '',
        createNew: '',
        enableSurvey: '',
        deleteSurvey: '',
        updateSurvey: '',
        createQuestion: '',
        createOption: '',
        updateOption: '',
        updateQuestion: '',
        reorderQuestion: '',
        changeQuestionType: '',
        deleteOption: '',
        deleteQuestion: '',
        deleteImage: '',
    },
};

const SurveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        getAllSurveyAttempt: (state, _action: GetAllSurveyActionPayload) => {
            state.actions.getAll = true;
            state.error.getAll = '';
        },
        getAllSurveySuccess: (state, action: PayloadAction<ISurvey[]>) => {
            state.actions.getAll = false;

            if (action.payload && action.payload.length) {
                if (state.surveys) {
                    state.surveys.standard = action.payload.filter(item => item.type === ISurveyTypeEnum.Standard);
                    state.surveys.trialist = action.payload.filter(item => item.type === ISurveyTypeEnum.Trialist);
                    state.surveys.repeated = action.payload.filter(item => item.type === ISurveyTypeEnum.RepeatedBuyer);
                }

                if (state.surveysUI) {
                    state.surveysUI.standard = action.payload.filter(item => item.type === ISurveyTypeEnum.Standard);
                    state.surveysUI.trialist = action.payload.filter(item => item.type === ISurveyTypeEnum.Trialist);
                    state.surveysUI.repeated = action.payload.filter(item => item.type === ISurveyTypeEnum.RepeatedBuyer);
                }
            }
        },
        getAllSurveyFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getAll = false;
            if (action.payload) {
                state.error.getAll = action.payload;
            }
        },
        getAllSurveyReset: (state) => {
            state.actions.getAll = false;
            state.error.getAll = '';
            if (state.surveys) {
                state.surveys.standard = [];
                state.surveys.trialist = [];
                state.surveys.repeated = [];
            }
        },

        setSurveyCardOpen: (state, action: SetSurveyCardOpenActionPayload) => {
            if (state.surveysUI) {
                const { surveyId, isOpen } = action.payload;

                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveysUI.standard.findIndex(item => item.id === surveyId);

                    state.surveysUI.standard[surveyIndex].isOpen = isOpen;

                    if (state.surveys) {
                        state.surveys.standard = state.surveysUI.standard;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveysUI.trialist.findIndex(item => item.id === surveyId);

                    state.surveysUI.trialist[surveyIndex].isOpen = isOpen;

                    if (state.surveys) {
                        state.surveys.trialist = state.surveysUI.trialist;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveysUI.repeated.findIndex(item => item.id === surveyId);

                    state.surveysUI.repeated[surveyIndex].isOpen = isOpen;

                    if (state.surveys) {
                        state.surveys.repeated = state.surveysUI.repeated;
                    }
                }
            }
        },

        setSurveyCardEditing: (state, action: SetSurveyCardEditingActionPayload) => {
            if (state.surveysUI) {
                const { surveyId, isEditing } = action.payload;

                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveysUI.standard.findIndex(item => item.id === surveyId);

                    state.surveysUI.standard[surveyIndex].isEditing = isEditing;

                    if (state.surveys) {
                        state.surveys.standard = state.surveysUI.standard;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveysUI.trialist.findIndex(item => item.id === surveyId);

                    state.surveysUI.trialist[surveyIndex].isEditing = isEditing;

                    if (state.surveys) {
                        state.surveys.trialist = state.surveysUI.trialist;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveysUI.repeated.findIndex(item => item.id === surveyId);

                    state.surveysUI.repeated[surveyIndex].isEditing = isEditing;

                    if (state.surveys) {
                        state.surveys.repeated = state.surveysUI.repeated;
                    }
                }
            }
        },

        setSurveyCardLanguage: (state, action: SetSurveyCardLanguageActionPayload) => {
            if (state.surveys) {
                const { surveyId, selectedLang } = action.payload;

                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveys.standard.findIndex(item => item.id === surveyId);

                    if (state.surveysUI) {
                        state.surveys.standard = state.surveysUI.standard;
                    }

                    state.surveys.standard[surveyIndex].selectedLang = selectedLang;
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveys.trialist.findIndex(item => item.id === surveyId);

                    if (state.surveysUI) {
                        state.surveys.trialist = state.surveysUI.trialist;
                    }

                    state.surveys.trialist[surveyIndex].selectedLang = selectedLang;
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveys.repeated.findIndex(item => item.id === surveyId);

                    if (state.surveysUI) {
                        state.surveys.repeated = state.surveysUI.repeated;
                    }

                    state.surveys.repeated[surveyIndex].selectedLang = selectedLang;
                }
            }

            if (state.surveysUI) {
                const { surveyId, selectedLang } = action.payload;

                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveysUI.standard.findIndex(item => item.id === surveyId);

                    state.surveysUI.standard[surveyIndex].selectedLang = selectedLang;
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveysUI.trialist.findIndex(item => item.id === surveyId);

                    state.surveysUI.trialist[surveyIndex].selectedLang = selectedLang;
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveysUI.repeated.findIndex(item => item.id === surveyId);

                    state.surveysUI.repeated[surveyIndex].selectedLang = selectedLang;
                }
            }
        },

        setCreateNewSurveyModalOpen: (state, action: PayloadAction<boolean>) => {
            state.actions.createNew = false;
            state.error.createNew = '';

            state.isCreateNewSurveyModalOpen = action.payload;
        },
        createNewSurveyAttempt: (state, _action: CreateNewSurveyActionPayload) => {
            state.actions.createNew = true;
            state.error.createNew = '';
        },
        createNewSurveySuccess: (state) => {
            state.actions.createNew = false;
            state.error.createNew = '';
        },
        createNewSurveyFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.createNew = false;
            if (action.payload) {
                state.error.createNew = action.payload;
            }
        },

        updateSurveyAttempt: (state, _action: UpdateSurveyActionPayload) => {
            state.actions.updateSurvey = true;
            state.error.updateSurvey = '';
        },
        updateSurveySuccess: (state, action: UpdateSurveyActionPayload) => {
            state.actions.updateSurvey = false;
            state.error.updateSurvey = '';

            const { id, nameEn, nameMs, nameZh, descriptionEn, descriptionMs, descriptionZh } = action.payload;

            if (state.surveysUI) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveysUI.standard.findIndex(item => item.id === id);

                    state.surveysUI.standard[surveyIndex].nameEn = nameEn;
                    state.surveysUI.standard[surveyIndex].nameMs = nameMs;
                    state.surveysUI.standard[surveyIndex].nameZh = nameZh;
                    state.surveysUI.standard[surveyIndex].descriptionEn = descriptionEn;
                    state.surveysUI.standard[surveyIndex].descriptionMs = descriptionMs;
                    state.surveysUI.standard[surveyIndex].descriptionZh = descriptionZh;
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveysUI.trialist.findIndex(item => item.id === id);

                    state.surveysUI.trialist[surveyIndex].nameEn = nameEn;
                    state.surveysUI.trialist[surveyIndex].nameMs = nameMs;
                    state.surveysUI.trialist[surveyIndex].nameZh = nameZh;
                    state.surveysUI.trialist[surveyIndex].descriptionEn = descriptionEn;
                    state.surveysUI.trialist[surveyIndex].descriptionMs = descriptionMs;
                    state.surveysUI.trialist[surveyIndex].descriptionZh = descriptionZh;
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveysUI.repeated.findIndex(item => item.id === id);

                    state.surveysUI.repeated[surveyIndex].nameEn = nameEn;
                    state.surveysUI.repeated[surveyIndex].nameMs = nameMs;
                    state.surveysUI.repeated[surveyIndex].nameZh = nameZh;
                    state.surveysUI.repeated[surveyIndex].descriptionEn = descriptionEn;
                    state.surveysUI.repeated[surveyIndex].descriptionMs = descriptionMs;
                    state.surveysUI.repeated[surveyIndex].descriptionZh = descriptionZh;
                }
            }
        },
        updateSurveyFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.updateSurvey = false;
            if (action.payload) {
                state.error.updateSurvey = action.payload;
            }
        },

        setEnableSurveyModalOpen: (state, action: PayloadAction<boolean>) => {
            state.actions.enableSurvey = false;
            state.error.enableSurvey = '';

            state.isEnableSurveyModalOpen = action.payload;
        },
        enableSurveyAttempt: (state, _action: EnableSurveyActionPayload) => {
            state.actions.enableSurvey = true;
            state.error.enableSurvey = '';
        },
        enableSurveySuccess: (state) => {
            state.actions.enableSurvey = false;
            state.error.enableSurvey = '';
        },
        enableSurveyFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.enableSurvey = false;
            if (action.payload) {
                state.error.enableSurvey = action.payload;
            }
        },

        setDeleteSurveyModalOpen: (state, action: PayloadAction<boolean>) => {
            state.actions.deleteSurvey = false;
            state.error.deleteSurvey = '';

            state.isDeleteSurveyModalOpen = action.payload;
        },
        deleteSurveyAttempt: (state, _action: DeleteSurveyActionPayload) => {
            state.actions.deleteSurvey = true;
            state.error.deleteSurvey = '';
        },
        deleteSurveySuccess: (state) => {
            state.actions.deleteSurvey = false;
            state.error.deleteSurvey = '';
        },
        deleteSurveyFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.deleteSurvey = false;
            if (action.payload) {
                state.error.deleteSurvey = action.payload;
            }
        },

        createQuestionAttempt: (state, _action: PayloadAction<IServerCreateQuestion>) => {
            state.actions.createQuestion = true;
            state.error.createQuestion = '';
        },
        createQuestionSuccess: (state, action: PayloadAction<ICreateQuestion>) => {
            state.actions.createQuestion = false;
            state.error.createQuestion = '';

            const { surveyId, data } = action.payload;

            if (state.surveys) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveys.standard.findIndex(item => item.id === surveyId);

                    if (state.surveysUI) {
                        state.surveys.standard = state.surveysUI.standard;
                    }

                    state.surveys.standard[surveyIndex].questions.push(data);
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveys.trialist.findIndex(item => item.id === surveyId);

                    if (state.surveysUI) {
                        state.surveys.standard = state.surveysUI.trialist;
                    }

                    state.surveys.trialist[surveyIndex].questions.push(data);
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveys.repeated.findIndex(item => item.id === surveyId);

                    if (state.surveysUI) {
                        state.surveys.standard = state.surveysUI.repeated;
                    }

                    state.surveys.repeated[surveyIndex].questions.push(data);
                }
            }
        },
        createQuestionFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.createQuestion = false;
            if (action.payload) {
                state.error.createQuestion = action.payload;
            }
        },

        setSelectedSurveyType: (state, action: PayloadAction<ISurveyTypeEnum>) => {
            state.selectedSurveyType = action.payload;
        },

        updateOptionAttempt: (state, _action: UpdateOptionActionPayload) => {
            state.actions.updateOption = true;
            state.error.updateOption = '';
        },
        updateOptionSuccess: (state, action: UpdateOptionActionPayload) => {
            state.actions.updateOption = false;
            state.error.updateOption = '';

            const { id, surveyId, questionId, valueEn, valueMs, valueZh } = action.payload;

            if (state.surveysUI) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveysUI.standard.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveysUI.standard[surveyIndex].questions.findIndex(item => item.id === questionId);
                    const optionIndex = state.surveysUI.standard[surveyIndex].questions[questionIndex].options.findIndex(item => item.id === id);

                    state.surveysUI.standard[surveyIndex].questions[questionIndex].options[optionIndex].valueEn = valueEn;
                    state.surveysUI.standard[surveyIndex].questions[questionIndex].options[optionIndex].valueMs = valueMs;
                    state.surveysUI.standard[surveyIndex].questions[questionIndex].options[optionIndex].valueZh = valueZh;
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveysUI.trialist.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveysUI.trialist[surveyIndex].questions.findIndex(item => item.id === questionId);
                    const optionIndex = state.surveysUI.trialist[surveyIndex].questions[questionIndex].options.findIndex(item => item.id === id);

                    state.surveysUI.trialist[surveyIndex].questions[questionIndex].options[optionIndex].valueEn = valueEn;
                    state.surveysUI.trialist[surveyIndex].questions[questionIndex].options[optionIndex].valueMs = valueMs;
                    state.surveysUI.trialist[surveyIndex].questions[questionIndex].options[optionIndex].valueZh = valueZh;
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveysUI.repeated.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveysUI.repeated[surveyIndex].questions.findIndex(item => item.id === questionId);
                    const optionIndex = state.surveysUI.repeated[surveyIndex].questions[questionIndex].options.findIndex(item => item.id === id);

                    state.surveysUI.repeated[surveyIndex].questions[questionIndex].options[optionIndex].valueEn = valueEn;
                    state.surveysUI.repeated[surveyIndex].questions[questionIndex].options[optionIndex].valueMs = valueMs;
                    state.surveysUI.repeated[surveyIndex].questions[questionIndex].options[optionIndex].valueZh = valueZh;
                }
            }
        },
        updateOptionFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.updateOption = false;
            if (action.payload) {
                state.error.updateOption = action.payload;
            }
        },

        updateQuestionAttempt: (state, _action: UpdateQuestionActionPayload) => {
            state.actions.updateQuestion = true;
            state.error.updateQuestion = '';
        },
        updateQuestionSuccess: (state, action: UpdateQuestionActionPayload) => {
            state.actions.updateQuestion = false;
            state.error.updateQuestion = '';

            const { id, surveyId, questionEn, questionMs, questionZh, type } = action.payload;

            if (state.surveysUI) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveysUI.standard.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveysUI.standard[surveyIndex].questions.findIndex(item => item.id === id);

                    state.surveysUI.standard[surveyIndex].questions[questionIndex].questionEn = questionEn;
                    state.surveysUI.standard[surveyIndex].questions[questionIndex].questionMs = questionMs;
                    state.surveysUI.standard[surveyIndex].questions[questionIndex].questionZh = questionZh;

                    state.surveysUI.standard[surveyIndex].questions[questionIndex].type = type;
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveysUI.trialist.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveysUI.trialist[surveyIndex].questions.findIndex(item => item.id === id);

                    state.surveysUI.trialist[surveyIndex].questions[questionIndex].questionEn = questionEn;
                    state.surveysUI.trialist[surveyIndex].questions[questionIndex].questionMs = questionMs;
                    state.surveysUI.trialist[surveyIndex].questions[questionIndex].questionZh = questionZh;

                    state.surveysUI.trialist[surveyIndex].questions[questionIndex].type = type;
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveysUI.repeated.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveysUI.repeated[surveyIndex].questions.findIndex(item => item.id === id);

                    state.surveysUI.repeated[surveyIndex].questions[questionIndex].questionEn = questionEn;
                    state.surveysUI.repeated[surveyIndex].questions[questionIndex].questionMs = questionMs;
                    state.surveysUI.repeated[surveyIndex].questions[questionIndex].questionZh = questionZh;

                    state.surveysUI.repeated[surveyIndex].questions[questionIndex].type = type;
                }
            }
        },
        updateQuestionFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.updateQuestion = false;
            if (action.payload) {
                state.error.updateQuestion = action.payload;
            }
        },

        reorderQuestionAttempt: (state, _action: ReorderQuestionActionPayload) => {
            state.actions.reorderQuestion = true;
            state.error.reorderQuestion = '';

            if (state.surveys) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    if (state.surveysUI) {
                        state.surveys.standard = state.surveysUI.standard;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    if (state.surveysUI) {
                        state.surveys.trialist = state.surveysUI.trialist;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    if (state.surveysUI) {
                        state.surveys.repeated = state.surveysUI.repeated;
                    }
                }
            }
        },
        reorderQuestionSuccess: (state, action: ReorderQuestionActionPayload) => {
            state.actions.reorderQuestion = false;
            state.error.reorderQuestion = '';

            const { questionId, surveyId, direction } = action.payload;

            const moveUp = (array: ISurvey[], surveyIndex: number, questionIndex: number) => {
                if (array[surveyIndex].questions[questionIndex].index === 0) return;

                const keyToSwap = array[surveyIndex].questions[questionIndex].index;
                const keyToSwapWith = array[surveyIndex].questions[questionIndex - 1].index;

                array[surveyIndex].questions[questionIndex].index = keyToSwapWith;
                array[surveyIndex].questions[questionIndex - 1].index = keyToSwap;

                array[surveyIndex].questions.sort((before, after) => before.index - after.index);
            };

            const moveDown = (array: ISurvey[], surveyIndex: number, questionIndex: number) => {
                if (array[surveyIndex].questions[questionIndex].index === array[surveyIndex].questions.length - 1) return;

                const keyToSwap = array[surveyIndex].questions[questionIndex].index;
                const keyToSwapWith = array[surveyIndex].questions[questionIndex + 1].index;

                array[surveyIndex].questions[questionIndex].index = keyToSwapWith;
                array[surveyIndex].questions[questionIndex + 1].index = keyToSwap;

                array[surveyIndex].questions.sort((before, after) => before.index - after.index);
            };

            if (state.surveys) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveys.standard.findIndex(item => item.id === surveyId);

                    const questionIndex = state.surveys.standard[surveyIndex].questions.findIndex(item => item.id === questionId);

                    if (direction === 'up') moveUp(state.surveys.standard, surveyIndex, questionIndex);
                    if (direction === 'down') moveDown(state.surveys.standard, surveyIndex, questionIndex);

                    if (state.surveysUI) {
                        state.surveysUI.standard = state.surveys.standard;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveys.trialist.findIndex(item => item.id === surveyId);

                    const questionIndex = state.surveys.trialist[surveyIndex].questions.findIndex(item => item.id === questionId);

                    if (direction === 'up') moveUp(state.surveys.trialist, surveyIndex, questionIndex);
                    if (direction === 'down') moveDown(state.surveys.trialist, surveyIndex, questionIndex);

                    if (state.surveysUI) {
                        state.surveysUI.trialist = state.surveys.trialist;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveys.repeated.findIndex(item => item.id === surveyId);

                    const questionIndex = state.surveys.repeated[surveyIndex].questions.findIndex(item => item.id === questionId);

                    if (direction === 'up') moveUp(state.surveys.repeated, surveyIndex, questionIndex);
                    if (direction === 'down') moveDown(state.surveys.repeated, surveyIndex, questionIndex);

                    if (state.surveysUI) {
                        state.surveysUI.repeated = state.surveys.repeated;
                    }
                }
            }
        },
        reorderQuestionFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.reorderQuestion = false;
            if (action.payload) {
                state.error.reorderQuestion = action.payload;
            }
        },

        changeQuestionTypeAttempt: (state, _action: ChangeQuestionTypeActionPayload) => {
            state.actions.changeQuestionType = true;
            state.error.changeQuestionType = '';
        },
        changeQuestionTypeSuccess: (state, action: ChangeQuestionTypeActionPayload) => {
            state.actions.changeQuestionType = false;
            state.error.changeQuestionType = '';

            const { id, surveyId, type, options } = action.payload;

            if (state.surveys) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveys.standard.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.standard[surveyIndex].questions.findIndex(item => item.id === id);

                    state.surveys.standard[surveyIndex].questions[questionIndex].options = options;
                    state.surveys.standard[surveyIndex].questions[questionIndex].type = type;
                    state.surveys.standard[surveyIndex].questions[questionIndex].image = [];

                    if (state.surveysUI) {
                        state.surveys.standard[surveyIndex].questions[questionIndex].image = state.surveysUI.standard[surveyIndex].questions[questionIndex].image;

                        state.surveysUI.standard = state.surveys.standard;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveys.trialist.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.trialist[surveyIndex].questions.findIndex(item => item.id === id);

                    state.surveys.trialist[surveyIndex].questions[questionIndex].options = options;
                    state.surveys.trialist[surveyIndex].questions[questionIndex].type = type;
                    state.surveys.trialist[surveyIndex].questions[questionIndex].image = [];

                    if (state.surveysUI) {
                        state.surveys.trialist[surveyIndex].questions[questionIndex].image = state.surveysUI.trialist[surveyIndex].questions[questionIndex].image;

                        state.surveysUI.trialist = state.surveys.trialist;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveys.repeated.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.repeated[surveyIndex].questions.findIndex(item => item.id === id);

                    state.surveys.repeated[surveyIndex].questions[questionIndex].options = options;
                    state.surveys.repeated[surveyIndex].questions[questionIndex].type = type;
                    state.surveys.repeated[surveyIndex].questions[questionIndex].image = [];

                    if (state.surveysUI) {
                        state.surveys.repeated[surveyIndex].questions[questionIndex].image = state.surveysUI.repeated[surveyIndex].questions[questionIndex].image;

                        state.surveysUI.repeated = state.surveys.repeated;
                    }
                }
            }
        },
        changeQuestionTypeFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.changeQuestionType = false;
            if (action.payload) {
                state.error.changeQuestionType = action.payload;
            }
        },

        createOptionAttempt: (state, _action: CreateOptionActionPayload) => {
            state.actions.createOption = true;
            state.error.createOption = '';

            if (state.surveys) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    if (state.surveysUI) {
                        state.surveys.standard = state.surveysUI.standard;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    if (state.surveysUI) {
                        state.surveys.trialist = state.surveysUI.trialist;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    if (state.surveysUI) {
                        state.surveys.repeated = state.surveysUI.repeated;
                    }
                }
            }
        },
        createOptionSuccess: (state, action: CreateOptionActionPayload) => {
            state.actions.createOption = false;
            state.error.createOption = '';

            const { surveyId, questionId, id, key = 0, valueEn, valueMs, valueZh } = action.payload;

            const optionToPush: ISurveyQuestionSlidingOption | ISurveyQuestionOption = {
                id,
                key,
                valueEn,
                valueMs,
                valueZh,
            };

            if (state.surveys) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveys.standard.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.standard[surveyIndex].questions.findIndex(item => item.id === questionId);

                    state.surveys.standard[surveyIndex].questions[questionIndex].options.push(optionToPush);

                    if (state.surveysUI) {
                        state.surveysUI.standard = state.surveys.standard;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveys.trialist.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.trialist[surveyIndex].questions.findIndex(item => item.id === questionId);

                    state.surveys.trialist[surveyIndex].questions[questionIndex].options.push(optionToPush);

                    if (state.surveysUI) {
                        state.surveysUI.trialist = state.surveys.trialist;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveys.repeated.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.repeated[surveyIndex].questions.findIndex(item => item.id === questionId);

                    state.surveys.repeated[surveyIndex].questions[questionIndex].options.push(optionToPush);

                    if (state.surveysUI) {
                        state.surveysUI.repeated = state.surveys.repeated;
                    }
                }
            }
        },
        createOptionFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.createOption = false;
            if (action.payload) {
                state.error.createOption = action.payload;
            }
        },

        deleteOptionAttempt: (state, _action: DeleteOptionActionPayload) => {
            state.actions.deleteOption = true;
            state.error.deleteOption = '';

            if (state.surveys) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    if (state.surveysUI) {
                        state.surveys.standard = state.surveysUI.standard;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    if (state.surveysUI) {
                        state.surveys.trialist = state.surveysUI.trialist;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    if (state.surveysUI) {
                        state.surveys.repeated = state.surveysUI.repeated;
                    }
                }
            }
        },
        deleteOptionSuccess: (state, action: DeleteOptionActionPayload) => {
            state.actions.deleteOption = false;
            state.error.deleteOption = '';

            const { surveyId, questionId, id } = action.payload;

            let filteredArray = [];

            if (state.surveys) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    filteredArray = state.surveys.standard;

                    const surveyIndex = state.surveys.standard.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.standard[surveyIndex].questions.findIndex(item => item.id === questionId);

                    filteredArray = state.surveys.standard[surveyIndex].questions[questionIndex].options.filter(item => item.id !== id);

                    state.surveys.standard[surveyIndex].questions[questionIndex].options = filteredArray;

                    if (state.surveysUI) {
                        state.surveysUI.standard = state.surveys.standard;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    filteredArray = state.surveys.trialist;

                    const surveyIndex = state.surveys.trialist.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.trialist[surveyIndex].questions.findIndex(item => item.id === questionId);

                    filteredArray = state.surveys.trialist[surveyIndex].questions[questionIndex].options.filter(item => item.id !== id);

                    state.surveys.trialist[surveyIndex].questions[questionIndex].options = filteredArray;

                    if (state.surveysUI) {
                        state.surveysUI.trialist = state.surveys.trialist;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    filteredArray = state.surveys.repeated;

                    const surveyIndex = state.surveys.repeated.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.repeated[surveyIndex].questions.findIndex(item => item.id === questionId);

                    filteredArray = state.surveys.repeated[surveyIndex].questions[questionIndex].options.filter(item => item.id !== id);

                    state.surveys.repeated[surveyIndex].questions[questionIndex].options = filteredArray;

                    if (state.surveysUI) {
                        state.surveysUI.repeated = state.surveys.repeated;
                    }
                }
            }
        },
        deleteOptionFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.deleteOption = false;
            if (action.payload) {
                state.error.deleteOption = action.payload;
            }
        },

        setEnableSurveyParams: (state, action: PayloadAction<IEnableSurveyParams>) => {
            state.enableSurveyParams = action.payload;
        },

        enableSurveyParamsReset: (state) => {
            state.enableSurveyParams = {
                id: '',
                qrId: '',
                surveyType: ISurveyTypeEnum.Reset,
                enabled: false,
                isFinalized: false,
            };
        },

        setDeleteSurveyParams: (state, action: DeleteSurveyActionPayload) => {
            state.deleteSurveyParams = action.payload;
        },

        deleteSurveyParamsReset: (state) => {
            state.deleteSurveyParams = {
                id: '',
                qrId: '',
                surveyType: ISurveyTypeEnum.Reset,
            };
        },

        deleteQuestionAttempt: (state, _action: DeleteQuestionActionPayload) => {
            state.actions.deleteQuestion = true;
            state.error.deleteQuestion = '';
        },
        deleteQuestionSuccess: (state, action: DeleteQuestionActionPayload) => {
            state.actions.deleteQuestion = false;
            state.error.deleteQuestion = '';

            const { id, surveyId } = action.payload;

            if (state.surveys) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveys.standard.findIndex(item => item.id === surveyId);

                    if (state.surveysUI) {
                        state.surveys.standard = state.surveysUI.standard;
                    }

                    state.surveys.standard[surveyIndex].questions = state.surveys.standard[surveyIndex].questions.filter(item => item.id !== id);
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveys.trialist.findIndex(item => item.id === surveyId);

                    if (state.surveysUI) {
                        state.surveys.trialist = state.surveysUI.trialist;
                    }

                    state.surveys.trialist[surveyIndex].questions = state.surveys.trialist[surveyIndex].questions.filter(item => item.id !== id);
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveys.repeated.findIndex(item => item.id === surveyId);

                    if (state.surveysUI) {
                        state.surveys.repeated = state.surveysUI.repeated;
                    }

                    state.surveys.repeated[surveyIndex].questions = state.surveys.repeated[surveyIndex].questions.filter(item => item.id !== id);
                }
            }
        },
        deleteQuestionFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.deleteQuestion = false;
            if (action.payload) {
                state.error.deleteQuestion = action.payload;
            }
        },

        setUploadImageModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isUploadImageModalOpen = action.payload;
        },
        setUploadImageParams: (state, action: PayloadAction<UploadImageParams>) => {
            state.uploadImageParams = action.payload;
        },
        setImageUrls: (state, action: SetImageUrlsActionPayload) => {
            const { questionId, surveyId, urls } = action.payload;

            if (state.surveys) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveys.standard.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.standard[surveyIndex].questions.findIndex(item => item.id === questionId);

                    if (state.surveysUI) {
                        state.surveys.standard = state.surveysUI.standard;
                    }

                    state.surveys.standard[surveyIndex].questions[questionIndex].image = urls;

                    if (state.surveysUI) {
                        state.surveysUI.standard = state.surveys.standard;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveys.trialist.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.trialist[surveyIndex].questions.findIndex(item => item.id === questionId);

                    if (state.surveysUI) {
                        state.surveys.trialist = state.surveysUI.trialist;
                    }

                    state.surveys.trialist[surveyIndex].questions[questionIndex].image = urls;

                    if (state.surveysUI) {
                        state.surveysUI.trialist = state.surveys.trialist;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveys.repeated.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.repeated[surveyIndex].questions.findIndex(item => item.id === questionId);

                    if (state.surveysUI) {
                        state.surveys.repeated = state.surveysUI.repeated;
                    }

                    state.surveys.repeated[surveyIndex].questions[questionIndex].image = urls;

                    if (state.surveysUI) {
                        state.surveysUI.repeated = state.surveys.repeated;
                    }
                }
            }
        },

        deleteImageAttempt: (state, _action: DeleteImageActionPayload) => {
            state.actions.deleteImage = true;
            state.error.deleteImage = '';
        },
        deleteImageSuccess: (state, action: DeleteImageActionPayload) => {
            state.actions.deleteImage = false;
            state.error.deleteImage = '';

            const { questionId, surveyId, url } = action.payload;

            if (state.surveys) {
                if (state.selectedSurveyType === ISurveyTypeEnum.Standard) {
                    const surveyIndex = state.surveys.standard.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.standard[surveyIndex].questions.findIndex(item => item.id === questionId);

                    if (state.surveysUI) {
                        state.surveys.standard = state.surveysUI.standard;
                    }

                    state.surveys.standard[surveyIndex].questions[questionIndex].image = state.surveys.standard[surveyIndex].questions[questionIndex].image?.filter(item => !url.includes(item));

                    if (state.surveysUI) {
                        state.surveysUI.standard = state.surveys.standard;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.Trialist) {
                    const surveyIndex = state.surveys.trialist.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.trialist[surveyIndex].questions.findIndex(item => item.id === questionId);

                    if (state.surveysUI) {
                        state.surveys.trialist = state.surveysUI.trialist;
                    }

                    state.surveys.trialist[surveyIndex].questions[questionIndex].image = state.surveys.trialist[surveyIndex].questions[questionIndex].image?.filter(item => !url.includes(item));

                    if (state.surveysUI) {
                        state.surveysUI.trialist = state.surveys.trialist;
                    }
                }

                if (state.selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer) {
                    const surveyIndex = state.surveys.repeated.findIndex(item => item.id === surveyId);
                    const questionIndex = state.surveys.repeated[surveyIndex].questions.findIndex(item => item.id === questionId);

                    if (state.surveysUI) {
                        state.surveys.repeated = state.surveysUI.repeated;
                    }

                    state.surveys.repeated[surveyIndex].questions[questionIndex].image = state.surveys.repeated[surveyIndex].questions[questionIndex].image?.filter(item => !url.includes(item));

                    if (state.surveysUI) {
                        state.surveysUI.repeated = state.surveys.repeated;
                    }
                }
            }
        },
        deleteImageFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.deleteImage = false;
            if (action.payload) {
                state.error.deleteImage = action.payload;
            }
        },

        setSelectedSurveyId: (state, action: PayloadAction<string>) => {
            state.selectedSurveyId = action.payload;
        },
        setSelectedQuestionId: (state, action: PayloadAction<string>) => {
            state.selectedQuestionId = action.payload;
        },
        setSelectedOptionInputId: (state, action: PayloadAction<string>) => {
            state.selectedOptionInputId = action.payload;
        },
    },
});

export type SurveyState = typeof initialState;

export default {
    actions: SurveySlice.actions,
    reducers: SurveySlice.reducer,
};
