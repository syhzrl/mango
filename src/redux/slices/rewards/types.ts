export interface RewardsReduxState {
    actions: {
        rewards: boolean;
        createRewards: boolean;
        editReward: boolean;
        deleteRewards: boolean;
    },
    currentIndex: number;
    currentPage: number;
    createRewardModalIsOpen: boolean;
    bulkCreateRewardsModalIsOpen: boolean;
    editRewardModalIsOpen: boolean;
    deleteRewardsModalIsOpen: boolean;
    bulkDeleteRewardsModalIsOpen: boolean;
    rewards: IRewards[];
    error: {
        rewards: string;
        createRewards: string;
        editReward: string;
        deleteRewards: string;
    },
}

export interface IGetRewardsParams {
    index: number;
}

export interface IRewards {
    index: number;
    maxIndex: number;
    rewards: {
        id: string,
        code: string,
        createdAt: string,
        expiresAt: string,
        value: number,
        status: number,
        awardedTo: string,
    }[];
}

export interface ICreateRewardsParams {
    code: string;
    expiresAt: string;
    value: number;
}

export interface IEditRewardParams {
    id: string;
    code: string;
    expiresAt: string;
    value: number;
}

export interface IDeleteRewardsParams {
    code: string;
}
