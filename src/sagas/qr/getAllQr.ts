import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import QrGateway from 'api/Qr';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';
import { GetAllQrActionPayload } from 'redux/slices/qr/types';

export default function* watchGetAllQrs(api: QrGateway): SagaWatcherReturnType {
    yield takeEvery('qr/getAllQrAttempt', handleGetAllQrs, api);
}

function* handleGetAllQrs(api: QrGateway, data: GetAllQrActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.getAllQr], { authToken, campaignId: data.payload.campaignId });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getAllQrFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.getAllQrSuccess(response.data));
    }
}
