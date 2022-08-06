import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { toast } from 'react-toastify';
import { DeleteImageActionPayload } from 'redux/slices/survey/types';

export default function* watchDeleteImage(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/deleteImageAttempt', handleDeleteImage, api);
}

function* handleDeleteImage(api: SurveyGateway, data: DeleteImageActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const { questionId, url } = data.payload;

    const apiParams = {
        questionId,
        imageUrl: url,
    };

    const response = yield* call([api, api.deleteImage], { authToken, data: apiParams });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.deleteImageFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.deleteImageSuccess(data.payload));
        toast.success('Image deleted!');
    }
}
