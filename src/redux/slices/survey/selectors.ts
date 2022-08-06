import { IDeleteSurvey, IEnableSurveyParams, ISurveySelector, ISurveyTypeEnum, UploadImageParams } from 'entities/survey';
import { SurveyState } from '.';

// Surveys
const getAllAttempting = (state: SurveyState): boolean => state.actions.getAll || false;
const getAllSurveys = (state: SurveyState): ISurveySelector | null => state.surveys || null;
const getAllError = (state: SurveyState): string => state.error.getAll || '';

const isCreateNewSurveyModalOpen = (state: SurveyState): boolean => state.isCreateNewSurveyModalOpen || false;

const createNewAttempting = (state: SurveyState): boolean => state.actions.createNew || false;
const createNewError = (state: SurveyState): string => state.error.createNew || '';

const isEnableSurveyModalOpen = (state: SurveyState): boolean => state.isEnableSurveyModalOpen || false;

const enableSurveyAttempting = (state: SurveyState): boolean => state.actions.enableSurvey || false;
const enableSurveyError = (state: SurveyState): string => state.error.enableSurvey || '';

const isDeleteSurveyModalOpen = (state: SurveyState): boolean => state.isDeleteSurveyModalOpen || false;

const deleteSurveyAttempting = (state: SurveyState): boolean => state.actions.deleteSurvey || false;
const deleteSurveyError = (state: SurveyState): string => state.error.deleteSurvey || '';

const updateSurveyAttempting = (state: SurveyState): boolean => state.actions.updateSurvey || false;
const updateSurveyError = (state: SurveyState): string => state.error.updateSurvey || '';

const selectedSurveyType = (state: SurveyState): ISurveyTypeEnum => state.selectedSurveyType || 0;

const getEnableSurveyParams = (state: SurveyState): IEnableSurveyParams => state.enableSurveyParams || null;

const getDeleteSurveyParams = (state: SurveyState): IDeleteSurvey => state.deleteSurveyParams || null;

// Questions
const createQuestionAttempting = (state: SurveyState): boolean => state.actions.createQuestion || false;
const createQuestionError = (state: SurveyState): string => state.error.createQuestion || '';

const updateQuestionAttempting = (state: SurveyState): boolean => state.actions.updateQuestion || false;
const updateQuestionError = (state: SurveyState): string => state.error.updateQuestion || '';

const reorderQuestionAttempting = (state: SurveyState): boolean => state.actions.reorderQuestion || false;
const reorderQuestionError = (state: SurveyState): string => state.error.reorderQuestion || '';

const changeQuestionTypeAttempting = (state: SurveyState): boolean => state.actions.changeQuestionType || false;
const changeQuestionTypeError = (state: SurveyState): string => state.error.changeQuestionType || '';

const deleteQuestionAttempting = (state: SurveyState): boolean => state.actions.deleteQuestion || false;
const deleteQuestionError = (state: SurveyState): string => state.error.deleteQuestion || '';

// Options
const createOptionAttempting = (state: SurveyState): boolean => state.actions.createOption || false;
const createOptionError = (state: SurveyState): string => state.error.createOption || '';

const updateOptionAttempting = (state: SurveyState): boolean => state.actions.updateOption || false;
const updateOptionError = (state: SurveyState): string => state.error.updateOption || '';

const deleteOptionAttempting = (state: SurveyState): boolean => state.actions.deleteOption || false;
const deleteOptionError = (state: SurveyState): string => state.error.deleteOption || '';

// Upload Image
const deleteImageAttempting = (state: SurveyState): boolean => state.actions.deleteImage || false;
const deleteImageError = (state: SurveyState): string => state.error.deleteImage || '';
const isUploadImageModalOpen = (state: SurveyState): boolean => state.isUploadImageModalOpen || false;
const getUploadImageParams = (state: SurveyState): UploadImageParams => state.uploadImageParams || null;

const selectedSurveyId = (state: SurveyState): string => state.selectedSurveyId || '';
const selectedQuestionId = (state: SurveyState): string => state.selectedQuestionId || '';
const selectedOptionInputId = (state: SurveyState): string => state.selectedOptionInputId || '';

export default {
    getAllAttempting,
    getAllSurveys,
    getAllError,

    isCreateNewSurveyModalOpen,

    createNewAttempting,
    createNewError,

    isEnableSurveyModalOpen,

    enableSurveyAttempting,
    enableSurveyError,

    isDeleteSurveyModalOpen,

    deleteSurveyAttempting,
    deleteSurveyError,

    updateSurveyAttempting,
    updateSurveyError,

    selectedSurveyType,

    createQuestionAttempting,
    createQuestionError,

    updateOptionAttempting,
    updateOptionError,

    updateQuestionAttempting,
    updateQuestionError,

    reorderQuestionAttempting,
    reorderQuestionError,

    changeQuestionTypeAttempting,
    changeQuestionTypeError,

    createOptionAttempting,
    createOptionError,

    getEnableSurveyParams,
    getDeleteSurveyParams,

    isUploadImageModalOpen,
    getUploadImageParams,

    deleteImageAttempting,
    deleteImageError,

    deleteQuestionAttempting,
    deleteQuestionError,

    deleteOptionAttempting,
    deleteOptionError,

    selectedSurveyId,
    selectedQuestionId,
    selectedOptionInputId,
};
