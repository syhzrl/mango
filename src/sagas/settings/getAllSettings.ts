import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { delay } from 'redux-saga/effects';
import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import SettingsGateway from 'api/Setting';

export default function* watchGetAllSettings(api: SettingsGateway): SagaWatcherReturnType {
    yield takeEvery('settings/getAllSettingsAttempt', handleGetAllSettings, api);
}

function* handleGetAllSettings(api: SettingsGateway) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.getAllSettings], { authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getAllSettingsFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.getAllSettingsSuccess(response.data));
    }
}
