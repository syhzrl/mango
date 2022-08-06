import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { DeleteSurveyActionPayload } from 'redux/slices/survey/types';
import { toast } from 'react-toastify';

export default function* watchDeleteSurvey(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/deleteSurveyAttempt', handleDeleteSurvey, api);
}

function* handleDeleteSurvey(api: SurveyGateway, data: DeleteSurveyActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.deleteSurvey], { authToken, id: data.payload.id });

    const { qrId } = data.payload;

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.deleteSurveyFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.deleteSurveySuccess());
        yield put(Actions.setDeleteSurveyModalOpen(false));
        yield put(Actions.deleteSurveyParamsReset());
        yield put(Actions.getQrDetailsReset());
        yield put(Actions.getQrDetailsAttempt({ qrId }));
        yield put(Actions.getAllSurveyReset());
        yield put(Actions.getAllSurveyAttempt({ qrId: data.payload.qrId, surveyType: data.payload.surveyType }));
        toast.success('Survey deleted');
    }
}
