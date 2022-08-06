export enum IRewardStatusEnum {
    NotAwarded = 0,
    Awarded = 1,
}

export interface IReward {
    id: string;
    code: string;
    createdAt: string;
    value: number;
    status: IRewardStatusEnum;
    expiresAt?: string;
}
