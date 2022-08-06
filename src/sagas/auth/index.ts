import { fork } from 'redux-saga/effects';

import AuthGateway from 'api/Auth';
import { RootSagaReturnType } from 'sagas/types';

import watchStartup from './startup';
import watchLogin from './login';
import watchRequestOtp from './requestOtp';
import watchVerifyOtp from './verifyOtp';
import watchResetPassword from './resetPassword';
import watchLogout from './logout';

export default (api: AuthGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchStartup);
        yield fork(watchLogin, api);
        yield fork(watchRequestOtp, api);
        yield fork(watchVerifyOtp, api);
        yield fork(watchResetPassword, api);
        yield fork(watchLogout);
    }

    return {
        rootSaga,
    };
};
