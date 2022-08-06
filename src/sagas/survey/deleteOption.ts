import { put, select, call, takeEvery } from 'typed-redux-saga/macro';
import { PayloadAction } from '@reduxjs/toolkit';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { ISurveyDeleteOption } from 'entities/question';

export default function* watchDeleteOption(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/deleteOptionAttempt', handleDeleteOption, api);
}

function* handleDeleteOption(api: SurveyGateway, data: PayloadAction<ISurveyDeleteOption>) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.deleteOption], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.deleteOptionFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.deleteOptionSuccess(data.payload));
    }
}
