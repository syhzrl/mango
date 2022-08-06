import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { PayloadAction } from '@reduxjs/toolkit';
import ReportsGateway from 'api/Reports';
import { SagaWatcherReturnType } from 'sagas/types';
import { IGetSurveyReportsParams } from 'redux/slices/reports/types';
import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { GatewayResponseStatus } from 'api/types/types';

export default function* watchGetSurveyReports(api: ReportsGateway): SagaWatcherReturnType {
    yield takeEvery('reports/reportsGetSurveyReportsAttempt', handleGetSurveyReports, api);
}

function* handleGetSurveyReports(api: ReportsGateway, data: PayloadAction<IGetSurveyReportsParams>) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    if (!authToken) {
        yield put(Actions.reportsGetSurveyReportsFailure('Unauthorized!'));
        return;
    }

    const response = yield* call([api, api.getSurveyReports], { authToken, ...data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.reportsGetSurveyReportsFailure(response.message || 'Something went wrong. Please try again'));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.reportsGetSurveyReportsSuccess(response.data));
    }
}
