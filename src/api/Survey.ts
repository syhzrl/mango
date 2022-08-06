import { ApiResponse } from 'apisauce';
import { GatewayResponse } from 'api/types/types';
import { ISurvey } from 'entities/survey';
import {
    ISurveyGateway,
    GetAllSurveysParams,
    CreateNewSurveyParams,
    EditSurveyParams,
    EnableSurveyParams,
    DeleteSurveyParams,
    CreateQuestionParams,
    CreateQuestionResponse,
    UpdateQuestionParams,
    UpdateQuestionResponse,
    ReorderQuestionParams,
    UpdateOptionParams,
    UpdateOptionResponse,
    UpdateSurveyParams,
    UpdateSurveyResponse,
    ChangeQuestionTypeParams,
    CreateOptionParams,
    DeleteImageParams,
    DeleteQuestionParams,
    DeleteOptionParams,
} from './SurveyBase';

const getHeaders = (authToken: string, data?: any) => ({
    headers: {
        Authorization: `Bearer ${authToken}`,
    },
    data,
});

export default class SurveyGateway extends ISurveyGateway {
    async getAllSurveys(params: GetAllSurveysParams): GatewayResponse<ISurvey[]> {
        const response: ApiResponse<ISurvey[]> = await this.api.get(`/surveys/${params.id}`, { id: params.id }, getHeaders(params.authToken));
        return this.process(response);
    }

    async createNewSurvey(params: CreateNewSurveyParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.post('/surveys/', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async editSurvey(params: EditSurveyParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put('/surveys/', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async enableSurvey(params: EnableSurveyParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put('/surveys/enableSurvey', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async deleteSurvey(params: DeleteSurveyParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.delete(`/surveys/${params.id}`, {}, getHeaders(params.authToken));
        return this.process(response);
    }

    async updateSurvey(params: UpdateSurveyParams): GatewayResponse<UpdateSurveyResponse> {
        const response: ApiResponse<UpdateSurveyResponse> = await this.api.put('/surveys/saveSurvey', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async createQuestion(params: CreateQuestionParams): GatewayResponse<CreateQuestionResponse> {
        const response: ApiResponse<CreateQuestionResponse> = await this.api.post('/surveys/createQuestion', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async updateQuestion(params: UpdateQuestionParams): GatewayResponse<UpdateQuestionResponse> {
        const response: ApiResponse<CreateQuestionResponse> = await this.api.put('/surveys/saveQuestion', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async reorderQuestion(params: ReorderQuestionParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put('/surveys/reorderQuestion', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async updateOption(params: UpdateOptionParams): GatewayResponse<UpdateOptionResponse> {
        const response: ApiResponse<UpdateOptionResponse> = await this.api.put('/surveys/saveOption', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async changeQuestionType(params: ChangeQuestionTypeParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put('surveys/changeQuestionType', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async createOption(params: CreateOptionParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.post('surveys/option', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async deleteImage(params: DeleteImageParams): GatewayResponse<null> {
        const { questionId, imageUrl } = params.data;
        const response: ApiResponse<null> = await this.api.delete('/surveys/removeImage', {}, getHeaders(params.authToken, { imageUrl, questionId }));
        return this.process(response);
    }

    async deleteQuestion(params: DeleteQuestionParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.delete('/surveys/question', {}, getHeaders(params.authToken, params.data));
        return this.process(response);
    }

    async deleteOption(params: DeleteOptionParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.delete('/surveys/option', {}, getHeaders(params.authToken, params.data));
        return this.process(response);
    }
}
