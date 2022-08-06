import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGetRewardsParams, RewardsReduxState, IRewards, ICreateRewardsParams, IEditRewardParams, IDeleteRewardsParams } from './types';

const initialState: RewardsReduxState = {
    actions: {
        rewards: false,
        createRewards: false,
        editReward: false,
        deleteRewards: false,
    },
    currentIndex: 0,
    currentPage: 0,
    createRewardModalIsOpen: false,
    bulkCreateRewardsModalIsOpen: false,
    editRewardModalIsOpen: false,
    deleteRewardsModalIsOpen: false,
    bulkDeleteRewardsModalIsOpen: false,
    rewards: [],
    error: {
        rewards: '',
        createRewards: '',
        editReward: '',
        deleteRewards: '',
    },
};

const rewardsSlice = createSlice({
    name: 'rewards',
    initialState,
    reducers: {
        rewardsGetRewardsAttempt: (state, _action: PayloadAction<IGetRewardsParams>) => {
            state.actions.rewards = true;
            state.error.rewards = '';
        },
        rewardsGetRewardsSuccess: (state, action: PayloadAction<IRewards>) => {
            state.actions.rewards = false;
            if (action.payload) {
                state.rewards[action.payload.index - 1] = action.payload;
            }
        },
        rewardsGetRewardsFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.rewards = false;
            if (action.payload) {
                state.error.rewards = action.payload;
            }
        },
        rewardsSetCurrentIndex: (state, action: PayloadAction<number>) => {
            state.currentIndex = action.payload;
        },
        rewardsSetCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        rewardsSetCreateRewardModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.createRewardModalIsOpen = action.payload;
        },
        rewardsCreateRewardsAttempt: (state, _action: PayloadAction<ICreateRewardsParams[]>) => {
            state.actions.createRewards = true;
            state.error.createRewards = '';
        },
        rewardsCreateRewardsSuccess: (state) => {
            state.actions.createRewards = false;
        },
        rewardsCreateRewardsFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.createRewards = false;
            if (action.payload) {
                state.error.createRewards = action.payload;
            }
        },
        rewardsResetCreateRewards: (state) => {
            state.actions.createRewards = false;
            state.error.createRewards = '';
        },
        rewardsSetBulkCreateRewardsModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.bulkCreateRewardsModalIsOpen = action.payload;
        },
        rewardsSetEditRewardModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.editRewardModalIsOpen = action.payload;
        },
        rewardsEditRewardAttempt: (state, _action: PayloadAction<IEditRewardParams>) => {
            state.actions.editReward = true;
            state.error.editReward = '';
        },
        rewardsEditRewardSuccess: (state, action: PayloadAction<IEditRewardParams>) => {
            state.actions.editReward = false;
            const newRewards = state.rewards.slice().map(reward => {
                return {
                    index: reward.index,
                    maxIndex: reward.maxIndex,
                    rewards: reward.rewards.map(item => {
                        if (item.id === action.payload.id) {
                            return {
                                ...item,
                                code: action.payload.code,
                                expiresAt: action.payload.expiresAt,
                                value: action.payload.value,
                            };
                        } return item;
                    }),
                };
            });
            state.rewards = newRewards;
        },
        rewardsEditRewardFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.editReward = false;
            if (action.payload) {
                state.error.editReward = action.payload;
            }
        },
        rewardsResetEditReward: (state) => {
            state.actions.editReward = false;
            state.error.editReward = '';
        },
        rewardsSetDeleteRewardsModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.deleteRewardsModalIsOpen = action.payload;
        },
        rewardsDeleteRewardsAttempt: (state, _action: PayloadAction<IDeleteRewardsParams[]>) => {
            state.actions.deleteRewards = true;
            state.error.deleteRewards = '';
        },
        rewardsDeleteRewardsSuccess: (state) => {
            state.actions.deleteRewards = false;
        },
        rewardsDeleteRewardsFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.deleteRewards = false;
            if (action.payload) {
                state.error.deleteRewards = action.payload;
            }
        },
        rewardsResetDeleteRewards: (state) => {
            state.actions.deleteRewards = false;
            state.error.deleteRewards = '';
        },
        rewardsSetBulkDeleteRewardsModalIsOpen: (state, action: PayloadAction<boolean>) => {
            state.bulkDeleteRewardsModalIsOpen = action.payload;
        },
    },
});

export type RewardsState = typeof initialState;

export default {
    actions: rewardsSlice.actions,
    reducers: rewardsSlice.reducer,
};
