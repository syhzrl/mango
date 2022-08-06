import { ISurveyQuestionTypeEnum } from 'entities/question';

export interface ReportsReduxState {
    actions: {
        getReports: boolean;
        getSurveyReports: boolean;
        getSurveyResponses: boolean;
    },
    reports: IReports;
    surveyReports: ISurveyReports;
    surveyResponses: ISurveyResponses;
    filterStartDate: string | null;
    filterEndDate: string | null;
    error: {
        getReports: string;
        getSurveyReports: string;
        getSurveyResponses: string;
    },
}

export interface IGetReportsParams {
    dateFrom: string;
    dateTo: string;
}

export enum IQrTypeEnum {
    AnswerOnce = 0,
    AnswerMultiple = 1,
}

export interface IReports {
    averageTimeSpentChart: {
        name: string;
        value: number;
    }[];
    averagePageStopped: {
        surveyName: string;
        value: number;
    }[];
    totalScans: number;
    completionRate: {
        total: number;
        value: number;
    };
    completedSurveySet: {
        total: number;
        value: number;
    };
    averageTimeSpentPerQuestion: number;
    averageTimeSpent: number;
    surveyReports: {
        id: string;
        name: string;
        description: string;
        type: IQrTypeEnum;
        createdAt: string;
        answeredCompletely: number;
        averageCompletionRate: number;
        completedSurveySet: {
            total: number;
            value: number;
        };
        averageTimeSpentPerQuestion: number;
        averageTimeSpent: number;
    }[];
}

export interface IGetSurveyReportsParams {
    surveyId: string;
    dateFrom: string;
    dateTo: string;
}

export interface ISurveyReports {
    averageTimeSpentChart: {
        name: string;
        value: number;
    }[];
    averagePageStopped: {
        surveyName: string;
        value: number;
    }[];
    totalScans: number;
    completionRate: {
        total: number;
        value: number;
    };
    completedSurveySet: {
        total: number;
        value: number;
    };
    averageTimeSpentPerQuestion: number;
    averageTimeSpent: number;
}

export interface IGetSurveyResponsesParams {
    surveyId: string;
}

export interface ISurveyResponses {
    responses: number;
    questions: {
        questionId: string;
        questionName: string;
        responses: number;
        type: ISurveyQuestionTypeEnum;
        options: {
            name: string;
            responses: number;
        }[],
    }[];
}
