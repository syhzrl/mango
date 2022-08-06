import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { UpdateQuestionActionPayload } from 'redux/slices/survey/types';

export default function* watchUpdateQuestion(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/updateQuestionAttempt', handleUpdateQuestion, api);
}

function* handleUpdateQuestion(api: SurveyGateway, data: UpdateQuestionActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.updateQuestion], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.updateQuestionFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.updateQuestionSuccess(data.payload));
    }
}
