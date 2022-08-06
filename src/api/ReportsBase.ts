import { IReports, ISurveyReports, ISurveyResponses } from 'redux/slices/reports/types';
import Gateway from './types/Gateway';
import { GatewayResponse } from './types/types';

export interface GetReportsParams {
    authToken: string;
    dateFrom: string;
    dateTo: string;
}

export interface GetSurveyReportsParams {
    authToken: string;
    surveyId: string;
    dateFrom: string;
    dateTo: string;
}

export interface GetSurveyResponsesParams {
    authToken: string;
    surveyId: string;
}

export abstract class IReportsGateway extends Gateway {
    abstract getReports(params: GetReportsParams): GatewayResponse<IReports>;

    abstract getSurveyReports(params: GetSurveyReportsParams): GatewayResponse<ISurveyReports>;

    abstract getSurveyResponses(params: GetSurveyResponsesParams): GatewayResponse<ISurveyResponses>;
}
