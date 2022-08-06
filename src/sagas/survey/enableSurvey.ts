import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { EnableSurveyActionPayload } from 'redux/slices/survey/types';

export default function* watchEnableSurvey(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/enableSurveyAttempt', handleEnableSurvey, api);
}

function* handleEnableSurvey(api: SurveyGateway, data: EnableSurveyActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const { id, enabled, surveyType, qrId } = data.payload;

    const apiParams = {
        id,
        enabled,
    };

    const response = yield* call([api, api.enableSurvey], { authToken, data: apiParams });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.enableSurveyFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.enableSurveySuccess());
        yield put(Actions.setEnableSurveyModalOpen(false));
        yield put(Actions.enableSurveyParamsReset());
        yield put(Actions.getAllSurveyReset());
        yield put(Actions.getAllSurveyAttempt({ qrId, surveyType }));
    }
}
