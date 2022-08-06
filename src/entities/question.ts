export enum ISurveyQuestionTypeEnum {
    Dropdown = 1,
    SelectMultiple = 2,
    SelectOne = 3,
    SlidingThree = 4,
    SlidingTen = 5,
    RewardCopy = 6,
}

export interface ISurveyQuestionOption {
    id: string;
    valueEn: string;
    valueZh: string;
    valueMs: string;
    image?: string[];
}

export interface ISurveyQuestionSlidingOption {
    id: string; // nanoid(8)
    key: number; // this indicates the step number (1 - 10, 1 - 3, etc.)
    valueEn: string;
    valueZh: string;
    valueMs: string;
    image?: string[];
}

export interface ISurveyQuestion {
    id: string;
    index: number; // represents question number
    questionEn: string;
    questionMs: string;
    questionZh: string;
    type: ISurveyQuestionTypeEnum;
    options: ISurveyQuestionOption[] | ISurveyQuestionSlidingOption[];
    image?: string[];
    updatedAt?: string;
}

export interface IServerCreateQuestion {
    surveyId: string;
    id: string; // nanoid(8)
    index: number;
    questionEn: string;
    questionMs: string;
    questionZh: string;
    type: ISurveyQuestionTypeEnum;
    initialOptionId: string; // nanoid(8)
}

export interface ICreateQuestion {
    surveyId: string,
    data: ISurveyQuestion,
}

export interface ISurveyQuestionAutoSave {
    id: string;
    surveyId: string;
    index: number;
    questionEn: string;
    questionMs: string;
    questionZh: string;
    type: ISurveyQuestionTypeEnum;
}

export interface ISurveyQuestionReorder {
    questionId: string;
    surveyId: string;
    direction: string; // 'up' or 'down'
}

export interface ISurveyQuestionOptionAutoSave {
    surveyId: string;
    questionId: string;
    id: string;
    key?: number;
    valueEn: string;
    valueZh: string;
    valueMs: string;
}

export interface ISurveyChangeOptionType {
    id: string; // question id
    surveyId: string;
    index: number;
    type: ISurveyQuestionTypeEnum;
    options: ISurveyQuestionOption[] | ISurveyQuestionSlidingOption[];
}

export interface ISurveyCreateOption {
    surveyId: string;
    questionId: string;
    id: string;
    key?: number;
    valueEn: string;
    valueZh: string;
    valueMs: string;
}

export interface ISurveyDeleteOption {
    surveyId: string;
    questionId: string;
    id: string;
}

export interface ISurveyDeleteQuestion {
    id: string;
    surveyId: string;
}
