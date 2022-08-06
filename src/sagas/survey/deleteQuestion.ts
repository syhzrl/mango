import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { DeleteQuestionActionPayload } from 'redux/slices/survey/types';
import { toast } from 'react-toastify';

export default function* watchDeleteQuestion(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/deleteQuestionAttempt', handleDeleteQuestion, api);
}

function* handleDeleteQuestion(api: SurveyGateway, data: DeleteQuestionActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.deleteQuestion], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.deleteQuestionFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.deleteQuestionSuccess(data.payload));
        toast.success('Question deleted');
    }
}
