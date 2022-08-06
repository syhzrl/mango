import { fork } from 'redux-saga/effects';

import RewardsGateway from 'api/Rewards';
import { RootSagaReturnType } from 'sagas/types';

import watchGetRewards from './getRewards';
import watchCreateRewards from './createRewards';
import watchEditReward from './editReward';
import watchDeleteRewards from './deleteRewards';

export default (api: RewardsGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchGetRewards, api);
        yield fork(watchCreateRewards, api);
        yield fork(watchEditReward, api);
        yield fork(watchDeleteRewards, api);
    }

    return {
        rootSaga,
    };
};
