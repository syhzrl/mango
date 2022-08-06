import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import QrGateway from 'api/Qr';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { CreateNewQrActionPayload } from 'redux/slices/qr/types';

import { GatewayResponseStatus } from 'api/types/types';

import NavActions from 'lib/NavActions';

import { toast } from 'react-toastify';

export default function* watchCreateNewQr(api: QrGateway): SagaWatcherReturnType {
    yield takeEvery('qr/createNewQrAttempt', handleCreateNewQr, api);
}

function* handleCreateNewQr(api: QrGateway, data: CreateNewQrActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.createNewQr], { campaignId: data.payload.campaignId, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.createNewQrError(response.message));
        toast.error(response.message);
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.createNewQrSuccess());
        NavActions.navToEditQrScreen({ qrId: response.data.id });
        toast.success('QR Code created!');
    }
}
