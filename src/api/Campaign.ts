import { ApiResponse } from 'apisauce';

import { GatewayResponse } from 'api/types/types';

import { ICampaign } from 'entities/campaign';

import {
    GetAllCampaignsParams,
    CreateNewCampaignParams,
    EditCampaignParams,
    DeleteCampaignParams,
    ICampaignGateway,
} from './CampaignBase';

const getHeaders = (authToken: string) => ({
    headers: {
        Authorization: `Bearer ${authToken}`,
    },
});

export default class CampaignGateway extends ICampaignGateway {
    async getAllCampaigns(params: GetAllCampaignsParams): GatewayResponse<ICampaign[]> {
        const response: ApiResponse<ICampaign[]> = await this.api.get('/campaigns/', {}, getHeaders(params.authToken));
        return this.process(response);
    }

    async createNewCampaign(params: CreateNewCampaignParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.post('/campaigns/', { name: params.name }, getHeaders(params.authToken));
        return this.process(response);
    }

    async editCampaign(params: EditCampaignParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put(`/campaigns/${params.id}`, { name: params.name }, getHeaders(params.authToken));
        return this.process(response);
    }

    async deleteCampaign(params: DeleteCampaignParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.delete(`/campaigns/${params.id}`, { id: params.id }, getHeaders(params.authToken));
        return this.process(response);
    }
}
