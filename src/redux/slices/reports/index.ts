import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { IGetReportsParams, ReportsReduxState, IReports, IGetSurveyReportsParams, ISurveyReports, IGetSurveyResponsesParams, ISurveyResponses } from './types';

const initialState: ReportsReduxState = {
    actions: {
        getReports: false,
        getSurveyReports: false,
        getSurveyResponses: false,
    },
    reports: {
        averageTimeSpentChart: [
            {
                name: '',
                value: 0,
            },
        ],
        averagePageStopped: [
            {
                surveyName: '',
                value: 0,
            },
        ],
        totalScans: 0,
        completionRate: {
            total: 0,
            value: 0,
        },
        completedSurveySet: {
            total: 0,
            value: 0,
        },
        averageTimeSpentPerQuestion: 0,
        averageTimeSpent: 0,
        surveyReports: [
            {
                id: '',
                name: '',
                description: '',
                type: 0, // change type's type in interface here
                createdAt: '',
                answeredCompletely: 0,
                averageCompletionRate: 0,
                completedSurveySet: {
                    total: 0,
                    value: 0,
                },
                averageTimeSpentPerQuestion: 0,
                averageTimeSpent: 0,
            },
        ],
    },
    surveyReports: {
        averageTimeSpentChart: [
            {
                name: '',
                value: 0,
            },
        ],
        averagePageStopped: [
            {
                surveyName: '',
                value: 0,
            },
        ],
        totalScans: 0,
        completionRate: {
            total: 0,
            value: 0,
        },
        completedSurveySet: {
            total: 0,
            value: 0,
        },
        averageTimeSpentPerQuestion: 0,
        averageTimeSpent: 0,
    },
    surveyResponses: {
        responses: 0,
        questions: [],
    },
    filterStartDate: dayjs().format('YYYY-MM-DD'),
    filterEndDate: dayjs().format('YYYY-MM-DD'),
    error: {
        getReports: '',
        getSurveyReports: '',
        getSurveyResponses: '',
    },
};

const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        reportsGetReportsAttempt: (state, _action: PayloadAction<IGetReportsParams>) => {
            state.actions.getReports = true;
            state.error.getReports = '';
        },
        reportsGetReportsSuccess: (state, action: PayloadAction<IReports>) => {
            state.actions.getReports = false;
            state.reports = action.payload;
        },
        reportsGetReportsFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getReports = false;
            if (action.payload) {
                state.error.getReports = action.payload;
            }
        },
        reportsSetFilterStartDate: (state, action: PayloadAction<string | null>) => {
            state.filterStartDate = action.payload;
            state.filterEndDate = null;
        },
        reportsSetFilterEndDate: (state, action: PayloadAction<string | null>) => {
            state.filterEndDate = action.payload;
        },
        reportsGetSurveyReportsAttempt: (state, _action: PayloadAction<IGetSurveyReportsParams>) => {
            state.actions.getSurveyReports = true;
            state.error.getSurveyReports = '';
        },
        reportsGetSurveyReportsSuccess: (state, action: PayloadAction<ISurveyReports>) => {
            state.actions.getSurveyReports = false;
            if (action.payload) {
                state.surveyReports = action.payload;
            }
        },
        reportsGetSurveyReportsFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getSurveyReports = false;
            if (action.payload) {
                state.error.getSurveyReports = action.payload;
            }
        },
        reportsGetSurveyResponsesAttempt: (state, _action: PayloadAction<IGetSurveyResponsesParams>) => {
            state.actions.getSurveyResponses = true;
            state.error.getSurveyResponses = '';
        },
        reportsGetSurveyResponsesSuccess: (state, action: PayloadAction<ISurveyResponses>) => {
            state.actions.getSurveyResponses = false;
            if (action.payload) {
                state.surveyResponses = action.payload;
            }
        },
        reportsGetSurveyResponsesFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getSurveyResponses = false;
            if (action.payload) {
                state.error.getSurveyResponses = action.payload;
            }
        },
    },
});

export type ReportsState = typeof initialState;

export default {
    actions: reportsSlice.actions,
    reducers: reportsSlice.reducer,
};
