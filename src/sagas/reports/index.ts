import { fork } from 'redux-saga/effects';

import ReportsGateway from 'api/Reports';
import { RootSagaReturnType } from 'sagas/types';

import watchGetReports from './getReports';
import watchGetSurveyReports from './getSurveyReports';
import watchGetSurveyResponses from './getSurveyResponses';

export default (api: ReportsGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchGetReports, api);
        yield fork(watchGetSurveyReports, api);
        yield fork(watchGetSurveyResponses, api);
    }

    return {
        rootSaga,
    };
};
