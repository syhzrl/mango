import { fork } from 'redux-saga/effects';

import { RootSagaReturnType } from 'sagas/types';
import SettingsGateway from 'api/Setting';

import watchGetAllSettings from './getAllSettings';
import watchSetSettings from './setSettings';

export default (api: SettingsGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchGetAllSettings, api);
        yield fork(watchSetSettings, api);
    }

    return {
        rootSaga,
    };
};
