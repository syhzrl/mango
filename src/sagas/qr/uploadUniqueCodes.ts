import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import QrGateway from 'api/Qr';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { UploadUniqueCodeActionPayload } from 'redux/slices/qr/types';

import { GatewayResponseStatus } from 'api/types/types';
import { toast } from 'react-toastify';

export default function* watchUploadUniqueCodes(api: QrGateway): SagaWatcherReturnType {
    yield takeEvery('qr/uploadUniqueCodesAttempt', handleUploadUniqueCodes, api);
}

function* handleUploadUniqueCodes(api: QrGateway, data: UploadUniqueCodeActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.uploadUniqueCodes], { data: data.payload, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.uploadUniqueCodesFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.uploadUniqueCodesSuccess());
        toast.success('Unique Codes uploaded');
    }
}
