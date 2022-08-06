import { ApiResponse } from 'apisauce';

import { GatewayResponse } from 'api/types/types';

import { IQr, IQrDetails, IUniqueCode } from 'entities/qr';

import {
    GetAllQrsParams,
    CreateNewQrParams,
    GetQrDetailsParams,
    UpdateQrParams,
    DeleteQrDetailsParams,
    IQrGateway,
    GetUniqueCodesParams,
    UploadUniqueCodesParams,
    GetQrStatisticsParams,
    GetQrStatisticsResponse,
} from './QrBase';

const getHeaders = (authToken: string) => ({
    headers: {
        Authorization: `Bearer ${authToken}`,
    },
});

export default class QrGateway extends IQrGateway {
    async getAllQr(params: GetAllQrsParams): GatewayResponse<IQr[]> {
        const response: ApiResponse<IQr[]> = await this.api.get('/qr/', { campaignId: params.campaignId }, getHeaders(params.authToken));
        return this.process(response);
    }

    async createNewQr(params: CreateNewQrParams): GatewayResponse<IQr> {
        const response: ApiResponse<IQr> = await this.api.post('/qr/', { campaignId: params.campaignId }, getHeaders(params.authToken));
        return this.process(response);
    }

    async getQrDetails(params: GetQrDetailsParams): GatewayResponse<IQrDetails> {
        const response: ApiResponse<IQrDetails> = await this.api.get(`/qr/${params.qrId}`, { id: params.qrId }, getHeaders(params.authToken));
        return this.process(response);
    }

    async updateQr(params: UpdateQrParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put('/qr/', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async deleteQr(params: DeleteQrDetailsParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.delete(`/qr/${params.qrId}`, { id: params.qrId }, getHeaders(params.authToken));
        return this.process(response);
    }

    async getUniqueCodes(params: GetUniqueCodesParams): GatewayResponse<IUniqueCode[]> {
        const response: ApiResponse<IUniqueCode[]> = await this.api.get(`/qr/getUniqueCodes/${params.qrId}`, {}, getHeaders(params.authToken));
        return this.process(response);
    }

    async uploadUniqueCodes(params: UploadUniqueCodesParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.post('/qr/createUniqueCodes', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async replaceUniqueCodes(params: UploadUniqueCodesParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put('/qr/replaceUniqueCodes', { qrId: params.data.qrId, uniqueCodes: params.data.code }, getHeaders(params.authToken));
        return this.process(response);
    }

    async getQrStatistics(params: GetQrStatisticsParams): GatewayResponse<GetQrStatisticsResponse> {
        const response: ApiResponse<GetQrStatisticsResponse> = await this.api.get(`/qr/details/${params.qrId}`, {}, getHeaders(params.authToken));
        return this.process(response);
    }
}
