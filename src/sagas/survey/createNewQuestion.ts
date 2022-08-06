import { put, select, call, takeEvery } from 'typed-redux-saga/macro';
import { PayloadAction } from '@reduxjs/toolkit';

import { SagaWatcherReturnType } from 'sagas/types';

import SurveyGateway from 'api/Survey';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

import { ISurveyQuestion, IServerCreateQuestion } from 'entities/question';

import { toast } from 'react-toastify';

export default function* watchCreateNewQuestion(api: SurveyGateway): SagaWatcherReturnType {
    yield takeEvery('survey/createQuestionAttempt', handleCreateNewQuestion, api);
}

function* handleCreateNewQuestion(api: SurveyGateway, data: PayloadAction<IServerCreateQuestion>) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const { surveyId, id, initialOptionId, index, type, questionEn, questionMs, questionZh } = data.payload;

    const response = yield* call([api, api.createQuestion], { authToken, data: data.payload });

    const newQuestionTemplate: ISurveyQuestion = {
        id,
        index, // represents question number
        questionEn,
        questionMs,
        questionZh,
        type,
        options: [{
            id: initialOptionId,
            valueEn: 'Option A En',
            valueMs: 'Option A Ms',
            valueZh: 'Option A Zh',
        }],
    };

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.createNewSurveyFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.createQuestionSuccess({ surveyId, data: newQuestionTemplate }));
        toast.success('Question Created!');
    }
}
