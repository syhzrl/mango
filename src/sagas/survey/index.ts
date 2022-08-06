import { fork } from 'redux-saga/effects';

import SurveyGateway from 'api/Survey';
import { RootSagaReturnType } from 'sagas/types';

import watchGetAllSurveys from './getAllSurveys';
import watchCreateNewSurvey from './createNewSurvey';
import watchEnableSurvey from './enableSurvey';
import watchDeleteSurvey from './deleteSurvey';
import watchUpdateSurvey from './updateSurvey';
import watchCreateNewQuestion from './createNewQuestion';
import watchUpdateOption from './updateOption';
import watchUpdateQuestion from './updateQuestion';
import watchReorderQuestion from './reorderQuestion';
import watchChangeQuestionType from './changeQuestionType';
import watchCreateNewOption from './createOption';
import watchDeleteOption from './deleteOption';
import watchDeleteQuestion from './deleteQuestion';
import watchDeleteImage from './deleteImage';

export default (api: SurveyGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchGetAllSurveys, api);
        yield fork(watchCreateNewSurvey, api);
        yield fork(watchEnableSurvey, api);
        yield fork(watchDeleteSurvey, api);
        yield fork(watchUpdateSurvey, api);
        yield fork(watchCreateNewQuestion, api);
        yield fork(watchUpdateOption, api);
        yield fork(watchUpdateQuestion, api);
        yield fork(watchReorderQuestion, api);
        yield fork(watchChangeQuestionType, api);
        yield fork(watchCreateNewOption, api);
        yield fork(watchDeleteOption, api);
        yield fork(watchDeleteQuestion, api);
        yield fork(watchDeleteImage, api);
    }

    return {
        rootSaga,
    };
};
