import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';
import { ICampaign } from 'entities/campaign';

export interface GetAllCampaignsParams {
    authToken: string;
}

export interface GetAllCampaignsResponse {
    data: ICampaign[];
}

export interface CreateNewCampaignParams {
    authToken: string;
    name: string
}

export interface EditCampaignParams {
    authToken: string;
    name: string;
    id: string;
}

export interface DeleteCampaignParams {
    authToken: string;
    id: string;
}

export abstract class ICampaignGateway extends Gateway {
    abstract getAllCampaigns(params: GetAllCampaignsParams): GatewayResponse<ICampaign[]>;

    abstract createNewCampaign(params: CreateNewCampaignParams): GatewayResponse<null>;

    abstract editCampaign(params: EditCampaignParams): GatewayResponse<null>;

    abstract deleteCampaign(params: DeleteCampaignParams): GatewayResponse<null>;
}
