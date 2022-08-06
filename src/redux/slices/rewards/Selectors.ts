import { RewardsState } from '.';
import { IRewards } from './types';

const getRewardsAttempting = (state: RewardsState): boolean => state.actions.rewards || false;
const getRewardsError = (state: RewardsState): string => state.error.rewards || '';
const getRewards = (state: RewardsState): IRewards[] => state.rewards || [];

const getRewardsCurrentIndex = (state: RewardsState): number => state.currentIndex || 1;
const getRewardsCurrentPage = (state: RewardsState): number => state.currentPage || 1;

const getCreateRewardsModalIsOpen = (state: RewardsState): boolean => state.createRewardModalIsOpen || false;
const getCreateRewardsAttempting = (state: RewardsState): boolean => state.actions.createRewards || false;
const getCreateRewardsError = (state: RewardsState): string => state.error.createRewards || '';
const getBulkCreateRewardsModalIsOpen = (state: RewardsState): boolean => state.bulkCreateRewardsModalIsOpen || false;

const getEditRewardModalIsOpen = (state: RewardsState): boolean => state.editRewardModalIsOpen || false;
const getEditRewardAttempting = (state: RewardsState): boolean => state.actions.editReward || false;
const getEditRewardError = (state: RewardsState): string => state.error.editReward || '';

const getDeleteRewardsModalIsOpen = (state: RewardsState): boolean => state.deleteRewardsModalIsOpen || false;
const getDeleteRewardsAttempting = (state: RewardsState): boolean => state.actions.deleteRewards || false;
const getDeleteRewardsError = (state: RewardsState): string => state.error.deleteRewards || '';
const getBulkDeleteRewardsModalIsOpen = (state: RewardsState): boolean => state.bulkDeleteRewardsModalIsOpen || false;

export default {
    getRewardsAttempting,
    getRewardsError,
    getRewards,

    getRewardsCurrentIndex,
    getRewardsCurrentPage,

    getCreateRewardsModalIsOpen,
    getCreateRewardsAttempting,
    getCreateRewardsError,

    getBulkCreateRewardsModalIsOpen,
    getEditRewardModalIsOpen,
    getEditRewardAttempting,
    getEditRewardError,

    getDeleteRewardsModalIsOpen,
    getDeleteRewardsAttempting,
    getDeleteRewardsError,
    getBulkDeleteRewardsModalIsOpen,
};
