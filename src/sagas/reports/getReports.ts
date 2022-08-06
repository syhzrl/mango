import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { PayloadAction } from '@reduxjs/toolkit';
import ReportsGateway from 'api/Reports';
import { SagaWatcherReturnType } from 'sagas/types';
import { IGetReportsParams } from 'redux/slices/reports/types';
import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { GatewayResponseStatus } from 'api/types/types';

export default function* watchGetReports(api: ReportsGateway): SagaWatcherReturnType {
    yield takeEvery('reports/reportsGetReportsAttempt', handleGetReports, api);
}

function* handleGetReports(api: ReportsGateway, data: PayloadAction<IGetReportsParams>) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    if (!authToken) {
        yield put(Actions.reportsGetReportsFailure('Unauthorized!'));
        return;
    }

    const response = yield* call([api, api.getReports], { authToken, ...data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.reportsGetReportsFailure(response.message || 'Something went wrong. Please try again'));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.reportsGetReportsSuccess(response.data));
    }
}
