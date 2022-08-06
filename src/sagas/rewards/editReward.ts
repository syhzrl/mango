import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import RewardsGateway from 'api/Rewards';

import Actions from 'redux/Actions';
import { IEditRewardParams } from 'redux/slices/rewards/types';
import { GatewayResponseStatus } from 'api/types/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Selectors from 'redux/Selectors';

export default function* watchEditReward(api: RewardsGateway): SagaWatcherReturnType {
    yield takeEvery('rewards/rewardsEditRewardAttempt', handleEditReward, api);
}

function* handleEditReward(api: RewardsGateway, data: PayloadAction<IEditRewardParams>) {
    const { code, expiresAt, value, id } = data.payload;
    const authToken = yield* select(Selectors.authGetAuthToken);

    if (!id) {
        yield put(Actions.rewardsEditRewardFailure('Something went wrong. Please try again later'));
        return;
    }

    if (!code || !value) {
        yield put(Actions.rewardsEditRewardFailure('Please fill in all the mandatory fields!'));
        return;
    }

    const response = yield* call([api, api.editReward], { authToken, id, code, expiresAt, value });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.rewardsEditRewardFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        toast.success('Reward successfully edited!');
        yield put(Actions.rewardsEditRewardSuccess(data.payload));
        yield put(Actions.rewardsSetEditRewardModalIsOpen(false));
    }
}
