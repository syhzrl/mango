import { PayloadAction } from '@reduxjs/toolkit';
import { GetQrStatisticsResponse } from 'api/QrBase';
import { IQr, IQrDetails, IUniqueCode, IUpdateQr } from 'entities/qr';

export interface QrReduxState {
    actions: {
        getAll: boolean;
        createNew: boolean;
        getDetails: boolean;
        updateQr: boolean;
        deleteQr: boolean;
        uploadUniqeCodes: boolean;
        getUniqueCodes: boolean;
        getQrStatistics: boolean;
    },
    qrs: IQr[];
    qrDetails: IQrDetails | null;
    uniqueCodes: IUniqueCode[];
    isUpdateQrModalOpen: boolean;
    isDeleteQrModalOpen: boolean;
    qrStatistics: GetQrStatisticsResponse;
    error: {
        getAll: string;
        createNew: string;
        getDetails: string;
        updateQr: string;
        deleteQr: string;
        uploadUniqeCodes: string;
        getUniqueCodes: string;
        getQrStatistics: string;
    },
}

export type GetAllQrActionPayload = PayloadAction<{
    campaignId: string;
}>;

export type CreateNewQrActionPayload = PayloadAction<{
    campaignId: string;
}>;

export type GetQrDetailsActionPayload = PayloadAction<{
    qrId: string;
}>;

export type UpdateQrDetailsActionPayload = PayloadAction<IUpdateQr>;

export type DeleteQrActionPayload = PayloadAction<{
    qrId: string;
    campaignId: string;
}>;

export type GetUniqueCodesActionPayload = PayloadAction<{
    qrId: string;
}>;

export type UploadUniqueCodeActionPayload = PayloadAction<{
    qrId: string;
    code: string[];
}>;

export interface IGetQrStatisticsParams {
    qrId: string;
}
