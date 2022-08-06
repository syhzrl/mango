import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { CreateNewSurveyActionPayload } from 'redux/slices/survey/types';
import { toast } from 'react-toastify';

export default function* watchCreateNewSurvey(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/createNewSurveyAttempt', handleCreateNewSurvey, api);
}

function* handleCreateNewSurvey(api: SurveyGateway, data: CreateNewSurveyActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    let validationError = '';

    const { nameEn, descriptionEn } = data.payload;

    if (!nameEn.length || !nameEn.trim().length || !descriptionEn.length || !descriptionEn.trim().length) {
        validationError = 'Title and description cannot be empty!';
        yield put(Actions.createNewSurveyFailure(validationError));
        return;
    }

    const response = yield* call([api, api.createNewSurvey], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.createNewSurveyFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.createNewSurveySuccess());
        yield put(Actions.setCreateNewSurveyModalOpen(false));
        yield put(Actions.getAllSurveyReset());
        yield put(Actions.getAllSurveyAttempt({ qrId: data.payload.qrId, surveyType: data.payload.type }));

        toast.success('Survey created');
    }
}
