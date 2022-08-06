import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import QrGateway from 'api/Qr';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { IGetQrStatisticsParams } from 'redux/slices/qr/types';

import { GatewayResponseStatus } from 'api/types/types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function* watchGetQrStatistics(api: QrGateway): SagaWatcherReturnType {
    yield takeEvery('qr/qrGetQrStatisticsAttempt', handleGetQrStatistics, api);
}

function* handleGetQrStatistics(api: QrGateway, data: PayloadAction<IGetQrStatisticsParams>) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.getQrStatistics], { qrId: data.payload.qrId, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.qrGetQrStatisticsFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.qrGetQrStatisticsSuccess(response.data));
    }
}
