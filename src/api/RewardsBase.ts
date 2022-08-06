import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';

export interface GetRewardsParams {
    authToken: string;
    index: number;
}

export interface GetRewardsResponse {
    index: number;
    maxIndex: number;
    rewards: {
        id: string,
        code: string,
        createdAt: string,
        expiresAt: string,
        value: number,
        status: number, // 0 is not awarded, 1 is awarded
        awardedTo: string,
    }[];
}

export interface CreateRewardsParams {
    authToken: string;
    data: {
        code: string;
        expiresAt: string;
        value: number;
    }[];
}

export interface EditRewardParams {
    authToken: string;
    id: string;
    code: string;
    expiresAt: string;
    value: number;
}

export interface DeleteRewardsParams {
    authToken: string;
    data: {
        code: string;
    }[];
}

export interface DeleteRewardsResponse {
    success: number;
    failed: number;
}

export abstract class IRewardsGateway extends Gateway {
    abstract getRewards(params: GetRewardsParams): GatewayResponse<GetRewardsResponse>;

    abstract createRewards(params: CreateRewardsParams): GatewayResponse<null>;

    abstract editReward(params: EditRewardParams): GatewayResponse<null>;

    abstract deleteReward(params: DeleteRewardsParams): GatewayResponse<DeleteRewardsResponse>;
}
