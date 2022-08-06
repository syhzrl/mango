import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import QrGateway from 'api/Qr';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { UploadUniqueCodeActionPayload } from 'redux/slices/qr/types';

import { GatewayResponseStatus } from 'api/types/types';
import { toast } from 'react-toastify';

export default function* watchReplaceUniqueCodes(api: QrGateway): SagaWatcherReturnType {
    yield takeEvery('qr/replaceUniqueCodesAttempt', handleReplaceUniqueCodes, api);
}

function* handleReplaceUniqueCodes(api: QrGateway, data: UploadUniqueCodeActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.replaceUniqueCodes], { data: data.payload, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.replaceUniqueCodesFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.replaceUniqueCodesSuccess());
        toast.success('Unique Codes replaced');
    }
}
