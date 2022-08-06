import { fork } from 'redux-saga/effects';

import QrGateway from 'api/Qr';
import { RootSagaReturnType } from 'sagas/types';
import watchGetAllQrs from './getAllQr';
import watchCreateNewQr from './createNewQr';
import watchGetQrDetails from './getQrDetails';
import watchUpdateQr from './updateQr';
import watchDeleteQr from './deleteQr';
import watchGetUniqueCodes from './getUniqueCodes';
import watchUploadUniqueCodes from './uploadUniqueCodes';
import watchReplaceUniqueCodes from './replaceUniqueCodes';
import watchGetQrStatistics from './getQrStatistics';

export default (api: QrGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchGetAllQrs, api);
        yield fork(watchCreateNewQr, api);
        yield fork(watchGetQrDetails, api);
        yield fork(watchUpdateQr, api);
        yield fork(watchDeleteQr, api);
        yield fork(watchGetUniqueCodes, api);
        yield fork(watchUploadUniqueCodes, api);
        yield fork(watchReplaceUniqueCodes, api);
        yield fork(watchGetQrStatistics, api);
    }

    return {
        rootSaga,
    };
};
