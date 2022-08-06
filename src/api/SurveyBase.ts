import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';
import { IServerCreateQuestion, ISurveyQuestionAutoSave, ISurveyQuestionOptionAutoSave, ISurveyQuestionReorder, ISurveyChangeOptionType, ISurveyCreateOption } from 'entities/question';
import { ICreateSurvey, IEditSurvey, ISurvey, ISurveyAutoSave } from 'entities/survey';

export interface GetAllSurveysParams {
    authToken: string;
    id: string;
}

export interface CreateNewSurveyParams {
    authToken: string;
    data: ICreateSurvey;
}

export interface EditSurveyParams {
    authToken: string;
    data: IEditSurvey;
}

export interface EnableSurveyParams {
    authToken: string;
    data: {
        id: string;
        enabled: boolean;
    }
}

export interface DeleteSurveyParams {
    authToken: string;
    id: string;
}

export interface UpdateSurveyParams {
    authToken: string;
    data: ISurveyAutoSave;
}

export interface UpdateSurveyResponse {
    updatedAt: string;
}

export interface CreateQuestionParams {
    authToken: string;
    data: IServerCreateQuestion;
}

export interface CreateQuestionResponse {
    updatedAt: string;
}

export interface UpdateQuestionParams {
    authToken: string;
    data: ISurveyQuestionAutoSave;
}

export interface UpdateQuestionResponse {
    updatedAt: string;
}

export interface ReorderQuestionParams {
    authToken: string;
    data: ISurveyQuestionReorder;
}

export interface UpdateOptionParams {
    authToken: string;
    data: ISurveyQuestionOptionAutoSave;
}

export interface UpdateOptionResponse {
    updatedAt: string;
}

export interface ChangeQuestionTypeParams {
    authToken: string;
    data: ISurveyChangeOptionType;
}

export interface CreateOptionParams {
    authToken: string;
    data: ISurveyCreateOption;
}

export interface DeleteImageParams {
    authToken: string;
    data: {
        imageUrl: string[];
        questionId: string;
    }
}

export interface DeleteQuestionParams {
    authToken: string;
    data: {
        surveyId: string;
        id: string;
    }
}

export interface DeleteOptionParams {
    authToken: string;
    data: {
        surveyId: string;
        questionId: string;
        id: string;
    }
}

export abstract class ISurveyGateway extends Gateway {
    abstract getAllSurveys(params: GetAllSurveysParams): GatewayResponse<ISurvey[]>;

    abstract createNewSurvey(params: CreateNewSurveyParams): GatewayResponse<null>;

    abstract editSurvey(params: EditSurveyParams): GatewayResponse<null>;

    abstract enableSurvey(params: EnableSurveyParams): GatewayResponse<null>;

    abstract deleteSurvey(params: DeleteSurveyParams): GatewayResponse<null>;

    abstract updateSurvey(params: UpdateSurveyParams): GatewayResponse<UpdateSurveyResponse>;

    abstract createQuestion(params: CreateQuestionParams): GatewayResponse<CreateQuestionResponse>;

    abstract updateQuestion(params: UpdateQuestionParams): GatewayResponse<UpdateQuestionResponse>;

    abstract reorderQuestion(params: ReorderQuestionParams): GatewayResponse<null>;

    abstract updateOption(params: UpdateOptionParams): GatewayResponse<UpdateOptionResponse>;

    abstract changeQuestionType(params: ChangeQuestionTypeParams): GatewayResponse<null>;

    abstract createOption(params: CreateOptionParams): GatewayResponse<null>;

    abstract deleteImage(params: DeleteImageParams): GatewayResponse<null>;

    abstract deleteQuestion(params: DeleteQuestionParams): GatewayResponse<null>;

    abstract deleteOption(params: DeleteOptionParams): GatewayResponse<null>;
}
