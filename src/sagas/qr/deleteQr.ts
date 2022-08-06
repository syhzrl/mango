import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import QrGateway from 'api/Qr';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { toast } from 'react-toastify';
import { DeleteQrActionPayload } from 'redux/slices/qr/types';

export default function* watchDeleteQr(api: QrGateway): SagaWatcherReturnType {
    yield takeEvery('qr/deleteQrAttempt', handleDeleteQr, api);
}

function* handleDeleteQr(api: QrGateway, data: DeleteQrActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.deleteQr], { qrId: data.payload.qrId, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.deleteQrFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.deleteQrSuccess());
        yield put(Actions.setDeleteQrModalOpen(false));
        yield put(Actions.getAllQrReset());
        yield put(Actions.getAllQrAttempt({ campaignId: data.payload.campaignId }));
        toast.success('QR Code deleted!');
    }
}
