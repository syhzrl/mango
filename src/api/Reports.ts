import { ApiResponse } from 'apisauce';
import { IReports, ISurveyReports, ISurveyResponses } from 'redux/slices/reports/types';
import { GetReportsParams, GetSurveyReportsParams, GetSurveyResponsesParams, IReportsGateway } from './ReportsBase';
import { GatewayResponse } from './types/types';

const getHeaders = (authToken: string, data?: any) => ({
    headers: {
        Authorization: `Bearer ${authToken}`,
    },
    data,
});

export default class ReportsGateway extends IReportsGateway {
    async getReports(params: GetReportsParams): GatewayResponse<IReports> {
        const { authToken, ...resetOfGetReportsParams } = params;
        const response: ApiResponse<IReports> = await this.api.get('/reports', resetOfGetReportsParams, getHeaders(authToken));
        return this.process(response);
    }

    async getSurveyReports(params: GetSurveyReportsParams): GatewayResponse<ISurveyReports> {
        const { authToken, surveyId, ...restOfGetSurveyReportsParams } = params;
        const response: ApiResponse<ISurveyReports> = await this.api.get(`/reports/survey/${surveyId}`, restOfGetSurveyReportsParams, getHeaders(authToken));
        return this.process(response);
    }

    async getSurveyResponses(params: GetSurveyResponsesParams): GatewayResponse<ISurveyResponses> {
        const { authToken, ...restOfGetSurveyResponsesParams } = params;
        const response: ApiResponse<ISurveyResponses> = await this.api.get('/reports/survey/responses', { surveyId: restOfGetSurveyResponsesParams.surveyId }, getHeaders(authToken));
        return this.process(response);
    }
}
