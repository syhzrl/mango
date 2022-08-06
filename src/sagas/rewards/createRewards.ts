import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import RewardsGateway from 'api/Rewards';

import Actions from 'redux/Actions';
import { ICreateRewardsParams } from 'redux/slices/rewards/types';
import { GatewayResponseStatus } from 'api/types/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Selectors from 'redux/Selectors';

export default function* watchCreateRewards(api: RewardsGateway): SagaWatcherReturnType {
    yield takeEvery('rewards/rewardsCreateRewardsAttempt', handleCreateRewards, api);
}

function* handleCreateRewards(api: RewardsGateway, data: PayloadAction<ICreateRewardsParams[]>) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    if (!data.payload.length) {
        yield put(Actions.rewardsCreateRewardsFailure('Please fill in all the mandatory fields!'));
        return;
    }

    const response = yield* call([api, api.createRewards], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.rewardsCreateRewardsFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        toast.success('Reward successfully created!');
        yield put(Actions.rewardsGetRewardsAttempt({ index: 1 }));
        yield put(Actions.rewardsSetCurrentIndex(1));
        yield put(Actions.rewardsSetCurrentPage(1));
        yield put(Actions.rewardsCreateRewardsSuccess());
        yield put(Actions.rewardsSetCreateRewardModalIsOpen(false));
        yield put(Actions.rewardsSetBulkCreateRewardsModalIsOpen(false));
    }
}
