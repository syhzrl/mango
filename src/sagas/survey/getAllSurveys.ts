import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { GetAllSurveyActionPayload } from 'redux/slices/survey/types';

export default function* watchGetAllSurveys(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/getAllSurveyAttempt', handleGetAllSurveys, api);
}

function* handleGetAllSurveys(api: SurveyGateway, data: GetAllSurveyActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.getAllSurveys], { authToken, id: data.payload.qrId });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getAllSurveyFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        const parsedResponseData = response.data.map(item => {
            return {
                ...item,
                isOpen: false,
                selectedLang: 'en',
            };
        });

        yield put(Actions.getAllSurveySuccess(parsedResponseData));
    }
}
