import { ReportsState } from '.';
import { IReports, ISurveyReports, ISurveyResponses } from './types';

const getReportsAttempting = (state: ReportsState): boolean => state.actions.getReports || false;
const getReportsError = (state: ReportsState): string => state.error.getReports || '';
const getReports = (state: ReportsState): IReports => state.reports || [];

const getFilterStartDate = (state: ReportsState): string | null => state.filterStartDate || '';
const getFilterEndDate = (state: ReportsState): string | null => state.filterEndDate || '';

const getSurveyReportsAttempting = (state: ReportsState): boolean => state.actions.getSurveyReports || false;
const getSurveyReportsError = (state: ReportsState): string => state.error.getSurveyReports || '';
const getSurveyReports = (state: ReportsState): ISurveyReports => state.surveyReports || {};

const getSurveyResponsesAttempting = (state: ReportsState): boolean => state.actions.getSurveyResponses || false;
const getSurveyResponsesError = (state: ReportsState): string => state.error.getSurveyResponses || '';
const getSurveyResponses = (state: ReportsState): ISurveyResponses => state.surveyResponses || [];

export default {
    getReportsAttempting,
    getReportsError,
    getReports,

    getFilterStartDate,
    getFilterEndDate,

    getSurveyReportsAttempting,
    getSurveyReportsError,
    getSurveyReports,

    getSurveyResponsesAttempting,
    getSurveyResponsesError,
    getSurveyResponses,
};
