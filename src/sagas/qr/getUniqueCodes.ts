import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import QrGateway from 'api/Qr';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GetQrDetailsActionPayload } from 'redux/slices/qr/types';

import { GatewayResponseStatus } from 'api/types/types';

export default function* watchGetUniqueCodes(api: QrGateway): SagaWatcherReturnType {
    yield takeEvery('qr/getUniqueCodesAttempt', handleGetUniqueCodes, api);
}

function* handleGetUniqueCodes(api: QrGateway, data: GetQrDetailsActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.getUniqueCodes], { qrId: data.payload.qrId, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getUniqueCodesFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.getUniqueCodesSuccess(response.data));
    }
}
