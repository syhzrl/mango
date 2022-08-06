import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';
import { IQr, IQrDetails, IUniqueCode, IUpdateQr } from 'entities/qr';

export interface GetAllQrsParams {
    authToken: string;
    campaignId: string;
}

export interface CreateNewQrParams {
    authToken: string;
    campaignId: string;
}

export interface GetQrDetailsParams {
    authToken: string;
    qrId: string;
}

export interface UpdateQrParams {
    authToken: string;
    data: IUpdateQr;
}

export interface DeleteQrDetailsParams {
    authToken: string;
    qrId: string;
}

export interface GetUniqueCodesParams {
    authToken: string;
    qrId: string;
}

export interface UploadUniqueCodesParams {
    authToken: string;
    data: {
        qrId: string;
        code: string[];
    }
}

export interface GetQrStatisticsParams {
    authToken: string;
    qrId: string;
}

export enum IDeviceTypeEnum {
    Mobile = 1,
    Tablet = 2,
    Desktop = 3,
    Others = 4,
}

export interface GetQrStatisticsResponse {
    campaignName: string;
    totalScans: number;
    completionRate: {
        total: number;
        value: number;
    };
    completedSurveySet: {
        total: number;
        value: number;
    };
    timesOpenedByCustomers: number;
    averageTimeSpent: number;
    scansByDevice: {
        type: IDeviceTypeEnum;
        scans: number;
        percent: number;
    }[];
    scansByCities: {
        name: string;
        scans: number;
        percent: number;
    }[];
}

export abstract class IQrGateway extends Gateway {
    abstract getAllQr(params: GetAllQrsParams): GatewayResponse<IQr[]>;

    abstract createNewQr(params: CreateNewQrParams): GatewayResponse<IQr>;

    abstract getQrDetails(params: GetQrDetailsParams): GatewayResponse<IQrDetails>;

    abstract updateQr(params: UpdateQrParams): GatewayResponse<null>;

    abstract deleteQr(params: DeleteQrDetailsParams): GatewayResponse<null>;

    abstract getUniqueCodes(params: GetUniqueCodesParams): GatewayResponse<IUniqueCode[]>;

    abstract uploadUniqueCodes(params: UploadUniqueCodesParams): GatewayResponse<null>;

    abstract replaceUniqueCodes(params: UploadUniqueCodesParams): GatewayResponse<null>;

    abstract getQrStatistics(params: GetQrStatisticsParams): GatewayResponse<GetQrStatisticsResponse>;
}
