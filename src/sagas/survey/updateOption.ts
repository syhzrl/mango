import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { UpdateOptionActionPayload } from 'redux/slices/survey/types';

export default function* watchUpdateOption(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/updateOptionAttempt', handleUpdateOption, api);
}

function* handleUpdateOption(api: SurveyGateway, data: UpdateOptionActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.updateOption], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.updateOptionFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.updateOptionSuccess(data.payload));
    }
}
