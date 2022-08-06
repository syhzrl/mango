import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { delay } from 'redux-saga/effects';
import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import SettingsGateway from 'api/Setting';
import { SetSettingsActionPayload } from 'redux/slices/settings/types';
import { GatewayResponseStatus } from 'api/types/types';
import { toast } from 'react-toastify';

export default function* watchSetSettings(api: SettingsGateway): SagaWatcherReturnType {
    yield takeEvery('settings/setSettingsAttempt', handleSetSettings, api);
}

function* handleSetSettings(api: SettingsGateway, data: SetSettingsActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.setSettings], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.setSettingsFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.setSettingsSuccess());
        toast.success('Settings updated');
    }
}
