import { ApiResponse } from 'apisauce';

import { GatewayResponse } from 'api/types/types';

import { IRewardsGateway, GetRewardsParams, GetRewardsResponse, CreateRewardsParams, EditRewardParams, DeleteRewardsParams, DeleteRewardsResponse } from './RewardsBase';

const getHeaders = (authToken: string, data?: any) => ({
    headers: {
        Authorization: `Bearer ${authToken}`,
    },
    data,
});

export default class RewardsGateway extends IRewardsGateway {
    async getRewards(params: GetRewardsParams): GatewayResponse<GetRewardsResponse> {
        const { authToken, index } = params;
        const response: ApiResponse<GetRewardsResponse> = await this.api.get('/rewards', { index }, getHeaders(authToken));
        return this.process(response);
    }

    async createRewards(params: CreateRewardsParams): GatewayResponse<null> {
        const { authToken, data } = params;
        const response: ApiResponse<null> = await this.api.post('/rewards', data, getHeaders(authToken));
        return this.process(response);
    }

    async editReward(params: EditRewardParams): GatewayResponse<null> {
        const { authToken, id, code, expiresAt, value } = params;
        const response: ApiResponse<null> = await this.api.put('/rewards', { id, code, expiresAt, value }, getHeaders(authToken));
        return this.process(response);
    }

    async deleteReward(params: DeleteRewardsParams): GatewayResponse<DeleteRewardsResponse> {
        const { authToken, data } = params;
        const response: ApiResponse<DeleteRewardsResponse> = await this.api.delete('/rewards', {}, getHeaders(authToken, data));
        return this.process(response);
    }
}
