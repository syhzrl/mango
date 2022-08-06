import { fork } from 'redux-saga/effects';

import api from 'api';

import auth from './auth';
import campaign from './campaign';
import qr from './qr';
import rewards from './rewards';
import surveys from './survey';
import reports from './reports';
import settings from './settings';

import { SagaForkReturnType } from './types';

const apiInstance = api;

export default function* root(): SagaForkReturnType {
    yield fork(auth(apiInstance.auth).rootSaga);
    yield fork(campaign(apiInstance.campaign).rootSaga);
    yield fork(qr(apiInstance.qr).rootSaga);
    yield fork(rewards(apiInstance.rewards).rootSaga);
    yield fork(surveys(apiInstance.surveys).rootSaga);
    yield fork(reports(apiInstance.reports).rootSaga);
    yield fork(settings(apiInstance.settings).rootSaga);
}
