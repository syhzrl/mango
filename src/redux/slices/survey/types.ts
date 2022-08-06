import { PayloadAction } from '@reduxjs/toolkit';
import {
    ICreateSurvey,
    IDeleteSurvey,
    IEnableSurveyParams,
    ISurveyAutoSave,
    ISurveySelector,
    ISurveyTypeEnum,
    UploadImageParams,
} from 'entities/survey';
import {
    ISurveyQuestionAutoSave,
    ISurveyQuestionOptionAutoSave,
    ISurveyQuestionReorder,
    ISurveyChangeOptionType,
    ISurveyCreateOption,
    ISurveyDeleteOption,
    ISurveyDeleteQuestion,
} from 'entities/question';

export interface SurveyReduxState {
    actions: {
        // Surveys
        getAll: boolean;
        createNew: boolean;
        enableSurvey: boolean;
        deleteSurvey: boolean;
        updateSurvey: boolean;

        // Questions
        createQuestion: boolean;
        deleteQuestion: boolean;
        updateQuestion: boolean;
        reorderQuestion: boolean;
        changeQuestionType: boolean;

        // Options
        createOption: boolean;
        updateOption: boolean;
        deleteOption: boolean;

        // Images
        deleteImage: boolean;
    },
    surveys: ISurveySelector | null,
    surveysUI: ISurveySelector | null,
    isCreateNewSurveyModalOpen: boolean;
    isEnableSurveyModalOpen: boolean;
    isDeleteSurveyModalOpen: boolean;
    isUploadImageModalOpen: boolean;
    selectedSurveyType: ISurveyTypeEnum;
    enableSurveyParams: IEnableSurveyParams;
    deleteSurveyParams: IDeleteSurvey;
    uploadImageParams: UploadImageParams;
    selectedSurveyId: string;
    selectedQuestionId: string;
    selectedOptionInputId: string;
    error: {
        // Surveys
        getAll: string;
        createNew: string;
        enableSurvey: string;
        deleteSurvey: string;
        updateSurvey: string;

        // Questions
        createQuestion: string;
        deleteQuestion: string;
        updateQuestion: string;
        reorderQuestion: string;
        changeQuestionType: string;

        // Options
        createOption: string;
        updateOption: string;
        deleteOption: string;

        // Images
        deleteImage: string;
    },
}

export type GetAllSurveyActionPayload = PayloadAction<{
    qrId: string;
    surveyType: ISurveyTypeEnum;
}>;

export type CreateNewSurveyActionPayload = PayloadAction<ICreateSurvey>;

export type EnableSurveyActionPayload = PayloadAction<{
    id: string;
    enabled: boolean;
    qrId: string;
    surveyType: ISurveyTypeEnum;
}>;

export type DeleteSurveyActionPayload = PayloadAction<IDeleteSurvey>;

export type GetSurveyQuestionsActionPayload = PayloadAction<{
    id: string;
}>;

export type SetSurveyCardOpenActionPayload = PayloadAction<{
    surveyId: string;
    isOpen: boolean;
}>;

export type SetSurveyCardEditingActionPayload = PayloadAction<{
    surveyId: string;
    isEditing: boolean;
}>;

export type SetSurveyCardLanguageActionPayload = PayloadAction<{
    surveyId: string;
    selectedLang: string;
}>;

export type UpdateOptionActionPayload = PayloadAction<ISurveyQuestionOptionAutoSave>;

export type UpdateOptionSuccessActionPayload = PayloadAction<{
    updatedAt: string;
    data: ISurveyQuestionOptionAutoSave;
}>;

export type UpdateQuestionActionPayload = PayloadAction<ISurveyQuestionAutoSave>;

export type UpdateQuestionSuccessActionPayload = PayloadAction<{
    updatedAt: string;
    data: ISurveyQuestionAutoSave;
}>;

export type ReorderQuestionActionPayload = PayloadAction<ISurveyQuestionReorder>;

export type UpdateSurveyActionPayload = PayloadAction<ISurveyAutoSave>;

export type ChangeQuestionTypeActionPayload = PayloadAction<ISurveyChangeOptionType>;

export type CreateOptionActionPayload = PayloadAction<ISurveyCreateOption>;

export type DeleteOptionActionPayload = PayloadAction<ISurveyDeleteOption>;

export type DeleteQuestionActionPayload = PayloadAction<ISurveyDeleteQuestion>;

export type SetImageUrlsActionPayload = PayloadAction<{
    questionId: string;
    surveyId: string;
    urls: string[];
}>;

export type DeleteImageActionPayload = PayloadAction<{
    questionId: string;
    surveyId: string;
    url: string[];
}>;
