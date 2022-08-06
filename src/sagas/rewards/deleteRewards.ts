import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import RewardsGateway from 'api/Rewards';

import Actions from 'redux/Actions';
import { IDeleteRewardsParams } from 'redux/slices/rewards/types';
import { GatewayResponseStatus } from 'api/types/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Selectors from 'redux/Selectors';

export default function* watchDeleteRewards(api: RewardsGateway): SagaWatcherReturnType {
    yield takeEvery('rewards/rewardsDeleteRewardsAttempt', handleDeleteRewards, api);
}

function* handleDeleteRewards(api: RewardsGateway, data: PayloadAction<IDeleteRewardsParams[]>) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    if (!data.payload.length) {
        yield put(Actions.rewardsDeleteRewardsFailure('Something went wrong. Please try again later'));
        return;
    }

    const response = yield* call([api, api.deleteReward], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.rewardsDeleteRewardsFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        const { success, failed } = response.data;

        if (failed === 0 && success > 0) {
            toast.success('Reward(s) successfully deleted!');
        } if (failed !== 0 && success > 0) {
            toast.warn(`Deleted ${success} reward(s). ${failed} failed.`);
        } if (failed > 0 && success === 0) {
            toast.error(`All ${failed} attempt(s) to delete failed`);
        }
        yield put(Actions.rewardsGetRewardsAttempt({ index: 1 }));
        yield put(Actions.rewardsSetCurrentIndex(1));
        yield put(Actions.rewardsSetCurrentPage(1));
        yield put(Actions.rewardsDeleteRewardsSuccess());
        yield put(Actions.rewardsSetDeleteRewardsModalIsOpen(false));
        yield put(Actions.rewardsSetBulkDeleteRewardsModalIsOpen(false));
    }
}
