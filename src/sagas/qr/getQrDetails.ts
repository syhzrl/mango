import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import QrGateway from 'api/Qr';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GetQrDetailsActionPayload } from 'redux/slices/qr/types';

import { GatewayResponseStatus } from 'api/types/types';

export default function* watchGetQrDetails(api: QrGateway): SagaWatcherReturnType {
    yield takeEvery('qr/getQrDetailsAttempt', handleGetQrDetails, api);
}

function* handleGetQrDetails(api: QrGateway, data: GetQrDetailsActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    // console.log(data);

    const response = yield* call([api, api.getQrDetails], { qrId: data.payload.qrId, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getQrDetailsFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.getQrDetailsSuccess(response.data));
    }
}
