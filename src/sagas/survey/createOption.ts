import { put, select, call, takeEvery } from 'typed-redux-saga/macro';
import { PayloadAction } from '@reduxjs/toolkit';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { ISurveyCreateOption } from 'entities/question';

export default function* watchCreateNewOption(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/createOptionAttempt', handleCreateNewOption, api);
}

function* handleCreateNewOption(api: SurveyGateway, data: PayloadAction<ISurveyCreateOption>) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.createOption], { authToken, data: data.payload });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.createOptionFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.createOptionSuccess(data.payload));
    }
}
