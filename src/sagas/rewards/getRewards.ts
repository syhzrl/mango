import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import RewardsGateway from 'api/Rewards';

import Actions from 'redux/Actions';
import { IGetRewardsParams } from 'redux/slices/rewards/types';
import { GatewayResponseStatus } from 'api/types/types';
import { PayloadAction } from '@reduxjs/toolkit';
import Selectors from 'redux/Selectors';

export default function* watchGetRewards(api: RewardsGateway): SagaWatcherReturnType {
    yield takeEvery('rewards/rewardsGetRewardsAttempt', handleGetRewards, api);
}

function* handleGetRewards(api: RewardsGateway, data: PayloadAction<IGetRewardsParams>) {
    const { index } = data.payload;
    const authToken = yield* select(Selectors.authGetAuthToken);

    if (!index) {
        yield put(Actions.rewardsGetRewardsFailure('Something went wrong. Please try again later'));
        return;
    }

    const response = yield* call([api, api.getRewards], { authToken, index });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.rewardsGetRewardsFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.rewardsGetRewardsSuccess(response.data));
    }
}
