import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { PayloadAction } from '@reduxjs/toolkit';
import ReportsGateway from 'api/Reports';
import { SagaWatcherReturnType } from 'sagas/types';
import { IGetSurveyResponsesParams } from 'redux/slices/reports/types';
import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { GatewayResponseStatus } from 'api/types/types';

export default function* watchGetSurveyResponses(api: ReportsGateway): SagaWatcherReturnType {
    yield takeEvery('reports/reportsGetSurveyResponsesAttempt', handleGetSurveyResponses, api);
}

function* handleGetSurveyResponses(api: ReportsGateway, data: PayloadAction<IGetSurveyResponsesParams>) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    if (!authToken) {
        yield put(Actions.reportsGetSurveyResponsesFailure('Unauthorized!'));
        return;
    }

    const response = yield* call([api, api.getSurveyResponses], { authToken, ...data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.reportsGetSurveyResponsesFailure(response.message || 'Something went wrong. Please try again'));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.reportsGetSurveyResponsesSuccess(response.data));
    }
}
