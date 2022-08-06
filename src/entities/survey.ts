import { ISurveyQuestion, ISurveyQuestionSlidingOption } from './question';

export interface IServerSurvey {
    id: string;
    nameEn: string;
    nameMs: string;
    nameZh: string;
    type: number,
    isActive: boolean,
    isFinalized: boolean, // no more changes to this survey can be made
    descriptionEn: string;
    descriptionZh: string;
    descriptionMs: string;
    questions: ISurveyQuestion[];
    isOpen: boolean;
    selectedLang: string;
    updatedAt?: string;
}

export interface ISurvey {
    id: string;
    nameEn: string;
    nameMs: string;
    nameZh: string;
    type: number,
    isActive: boolean,
    isFinalized: boolean, // no more changes to this survey can be made
    descriptionEn: string;
    descriptionZh: string;
    descriptionMs: string;
    questions: ISurveyQuestion[];
    isOpen: boolean;
    selectedLang: string;
    isEditing: boolean;
    updatedAt?: string;
}

export enum ISurveyTypeEnum {
    Reset = 0,
    Standard = 1,
    Trialist = 2,
    RepeatedBuyer = 3,
}

export interface ISurveySelector {
    standard: ISurvey[];
    trialist: ISurvey[];
    repeated: ISurvey[];
}

export interface ICreateSurvey {
    qrId: string;
    type: ISurveyTypeEnum;
    nameEn: string;
    descriptionEn: string;
}

export interface IEditSurvey {
    id: string;
    nameEn: string;
    nameMs: string;
    nameZh: string;
    descriptionEn: string;
    descriptionZh: string;
    descriptionMs: string;
    questions?: ISurveyQuestion[];
}

export interface ISurveyAutoSave {
    id: string;
    nameEn: string;
    nameMs: string;
    nameZh: string;
    descriptionEn: string;
    descriptionZh: string;
    descriptionMs: string;
}

export interface IEnableSurveyParams {
    isFinalized: boolean;
    id: string;
    enabled: boolean;
    qrId: string;
    surveyType: ISurveyTypeEnum;
}

export interface IEnableSurvey {
    id: string;
    enabled: boolean;
    qrId: string;
    surveyType: ISurveyTypeEnum;
}

export interface IDeleteSurvey {
    id: string;
    qrId: string;
    surveyType: ISurveyTypeEnum;
}

export interface UploadImageParams {
    surveyId: string;
    questionId: string;
}
