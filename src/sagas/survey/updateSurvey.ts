import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';
import { toast } from 'react-toastify';

import { UpdateSurveyActionPayload } from 'redux/slices/survey/types';

export default function* watchUpdateSurvey(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/updateSurveyAttempt', handleUpdateSurvey, api);
}

function* handleUpdateSurvey(api: SurveyGateway, data: UpdateSurveyActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.updateSurvey], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.updateSurveyFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.updateSurveySuccess(data.payload));
    }
}
