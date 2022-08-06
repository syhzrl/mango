import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import QrGateway from 'api/Qr';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { UpdateQrDetailsActionPayload } from 'redux/slices/qr/types';

import { GatewayResponseStatus } from 'api/types/types';

import { toast } from 'react-toastify';
import NavActions from 'lib/NavActions';

export default function* watchUpdateQr(api: QrGateway): SagaWatcherReturnType {
    yield takeEvery('qr/updateQrAttempt', handleUpdateQr, api);
}

function* handleUpdateQr(api: QrGateway, data: UpdateQrDetailsActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.updateQr], { data: data.payload, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        if (response.name === '238') {
            yield put(Actions.updateQrFailure('Please enable at least one survey to activate this QR'));
            toast.error('Please enable at least one survey to activate this QR');
        } else yield put(Actions.updateQrFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.updateQrSuccess());
        yield put(Actions.setUpdateQrModalOpen(false));
        yield put(Actions.getQrDetailsReset());
        yield put(Actions.getQrDetailsAttempt({ qrId: data.payload.qrId }));
        toast.success('QR Code Edited!');
    }
}
