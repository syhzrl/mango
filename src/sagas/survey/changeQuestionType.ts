import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { ChangeQuestionTypeActionPayload } from 'redux/slices/survey/types';
import { ISurveyTypeEnum } from 'entities/survey';
import { toast } from 'react-toastify';

export default function* watchChangeQuestionType(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/changeQuestionTypeAttempt', handleChangeQuestionType, api);
}

function* handleChangeQuestionType(api: SurveyGateway, data: ChangeQuestionTypeActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.changeQuestionType], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.changeQuestionTypeFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.changeQuestionTypeSuccess(data.payload));
    }
}
