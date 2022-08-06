import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { toast } from 'react-toastify';
import { ReorderQuestionActionPayload } from 'redux/slices/survey/types';

export default function* watchReorderQuestion(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/reorderQuestionAttempt', handleReorderQuestion, api);
}

function* handleReorderQuestion(api: SurveyGateway, data: ReorderQuestionActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.reorderQuestion], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        if (response.message === 'Min Index Reached') {
            toast.error('Question is already at the first position');
            yield put(Actions.reorderQuestionFailure(''));
        } else if (response.message === 'Max Index Reached') {
            toast.error('Question is already at the last position');
            yield put(Actions.reorderQuestionFailure(''));
        } else {
            yield put(Actions.reorderQuestionFailure(response.message));
        }
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.reorderQuestionSuccess(data.payload));
    }
}
