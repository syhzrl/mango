import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetQrStatisticsResponse } from 'api/QrBase';
import { IQr, IQrDetails, IUniqueCode } from 'entities/qr';
import {
    QrReduxState,
    CreateNewQrActionPayload,
    GetQrDetailsActionPayload,
    UpdateQrDetailsActionPayload,
    DeleteQrActionPayload,
    GetAllQrActionPayload,
    GetUniqueCodesActionPayload,
    UploadUniqueCodeActionPayload,
    IGetQrStatisticsParams,
} from './types';

const initialState: QrReduxState = {
    actions: {
        getAll: false,
        createNew: false,
        getDetails: false,
        updateQr: false,
        deleteQr: false,
        uploadUniqeCodes: false,
        getUniqueCodes: false,
        getQrStatistics: false,
    },
    qrs: [],
    qrDetails: null,
    uniqueCodes: [],
    isUpdateQrModalOpen: false,
    isDeleteQrModalOpen: false,
    qrStatistics: {
        campaignName: '',
        totalScans: 0,
        completionRate: {
            total: 0,
            value: 0,
        },
        completedSurveySet: {
            total: 0,
            value: 0,
        },
        timesOpenedByCustomers: 0,
        averageTimeSpent: 0,
        scansByDevice: [],
        scansByCities: [],
    },
    error: {
        getAll: '',
        createNew: '',
        getDetails: '',
        updateQr: '',
        deleteQr: '',
        uploadUniqeCodes: '',
        getUniqueCodes: '',
        getQrStatistics: '',
    },
};

const QrSlice = createSlice({
    name: 'qr',
    initialState,
    reducers: {
        getAllQrAttempt: (state, _action: GetAllQrActionPayload) => {
            state.actions.getAll = true;
            state.error.getAll = '';
        },
        getAllQrSuccess: (state, action: PayloadAction<IQr[]>) => {
            state.actions.getAll = false;

            if (action.payload) {
                state.qrs = action.payload;
            }
        },
        getAllQrFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getAll = false;
            if (action.payload) {
                state.error.getAll = action.payload;
            }
        },
        getAllQrReset: (state) => {
            state.qrs = [];
        },

        createNewQrAttempt: (state, _action: CreateNewQrActionPayload) => {
            state.actions.createNew = true;
            state.error.createNew = '';
        },
        createNewQrSuccess: (state) => {
            state.actions.createNew = false;
            state.error.createNew = '';
        },
        createNewQrError: (state, action: PayloadAction<string | undefined>) => {
            state.actions.createNew = false;
            if (action.payload) {
                state.error.getAll = action.payload;
            }
        },

        getQrDetailsAttempt: (state, _action: GetQrDetailsActionPayload) => {
            state.actions.getDetails = true;
            state.error.getDetails = '';
        },
        getQrDetailsSuccess: (state, action: PayloadAction<IQrDetails>) => {
            state.actions.getDetails = false;
            if (action.payload) {
                state.qrDetails = action.payload;
            }
        },
        getQrDetailsFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getDetails = false;
            if (action.payload) {
                state.error.getDetails = action.payload;
            }
        },
        getQrDetailsReset: (state) => {
            state.actions.getDetails = false;
            state.error.getDetails = '';
            state.qrDetails = null;
        },

        setUpdateQrModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isUpdateQrModalOpen = action.payload;
            state.error.updateQr = '';
        },
        updateQrAttempt: (state, _action: UpdateQrDetailsActionPayload) => {
            state.actions.updateQr = true;
            state.error.updateQr = '';
        },
        updateQrSuccess: (state) => {
            state.actions.updateQr = false;
            state.error.updateQr = '';
        },
        updateQrFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.updateQr = false;
            if (action.payload) {
                state.error.updateQr = action.payload;
            }
        },

        setDeleteQrModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isDeleteQrModalOpen = action.payload;
            state.error.deleteQr = '';
        },
        deleteQrAttempt: (state, _action: DeleteQrActionPayload) => {
            state.actions.deleteQr = true;
            state.error.deleteQr = '';
        },
        deleteQrSuccess: (state) => {
            state.actions.deleteQr = false;
            state.error.deleteQr = '';
        },
        deleteQrFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.deleteQr = false;
            if (action.payload) {
                state.error.deleteQr = action.payload;
            }
        },

        getUniqueCodesAttempt: (state, _action: GetUniqueCodesActionPayload) => {
            state.actions.getUniqueCodes = true;
            state.error.getUniqueCodes = '';
        },
        getUniqueCodesSuccess: (state, action: PayloadAction<IUniqueCode[]>) => {
            state.actions.getUniqueCodes = false;
            if (action.payload) {
                state.uniqueCodes = action.payload;
            }
        },
        getUniqueCodesFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getUniqueCodes = false;
            if (action.payload) {
                state.error.getUniqueCodes = action.payload;
            }
        },
        getUniqueCodesReset: (state) => {
            state.actions.getUniqueCodes = false;
            state.error.getUniqueCodes = '';
            state.uniqueCodes = [];
        },

        uploadUniqueCodesAttempt: (state, _action: UploadUniqueCodeActionPayload) => {
            state.actions.uploadUniqeCodes = true;
            state.error.uploadUniqeCodes = '';
        },
        uploadUniqueCodesSuccess: (state) => {
            state.actions.uploadUniqeCodes = false;
            state.error.uploadUniqeCodes = '';
        },
        uploadUniqueCodesFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.uploadUniqeCodes = false;
            if (action.payload) {
                state.error.uploadUniqeCodes = action.payload;
            }
        },

        replaceUniqueCodesAttempt: (state, _action: UploadUniqueCodeActionPayload) => {
            state.actions.uploadUniqeCodes = true;
            state.error.uploadUniqeCodes = '';
        },
        replaceUniqueCodesSuccess: (state) => {
            state.actions.uploadUniqeCodes = false;
            state.error.uploadUniqeCodes = '';
        },
        replaceUniqueCodesFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.uploadUniqeCodes = false;
            if (action.payload) {
                state.error.uploadUniqeCodes = action.payload;
            }
        },
        qrGetQrStatisticsAttempt: (state, _action: PayloadAction<IGetQrStatisticsParams>) => {
            state.actions.getQrStatistics = true;
            state.error.getQrStatistics = '';
        },
        qrGetQrStatisticsSuccess: (state, action: PayloadAction<GetQrStatisticsResponse>) => {
            state.actions.getQrStatistics = false;
            if (action.payload) {
                state.qrStatistics = action.payload;
            }
        },
        qrGetQrStatisticsFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getQrStatistics = false;
            if (action.payload) {
                state.error.getQrStatistics = action.payload;
            }
        },
    },
});

export type QrState = typeof initialState;

export default {
    actions: QrSlice.actions,
    reducers: QrSlice.reducer,
};
