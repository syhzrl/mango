import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import AuthGateway from 'api/Auth';

import Actions from 'redux/Actions';
import { ResetPasswordPayload } from 'redux/slices/auth/types';
import { GatewayResponseStatus } from 'api/types/types';
import { toast } from 'react-toastify';
import { PayloadAction } from '@reduxjs/toolkit';
import NavActions from 'lib/NavActions';

export default function* watchResetPassword(api: AuthGateway): SagaWatcherReturnType {
    yield takeEvery('auth/authResetPasswordAttempt', handleResetPassword, api);
}

function* handleResetPassword(api: AuthGateway, data: PayloadAction<ResetPasswordPayload>) {
    const { email, otp, newPassword } = data.payload;

    if (!email || !otp) {
        yield put(Actions.authResetPasswordFailure('Something went wrong. Please try again later'));
        return;
    }

    if (!newPassword) {
        yield put(Actions.authResetPasswordFailure('Please enter new password'));
        return;
    }

    const response = yield* call([api, api.resetPassword], { email, otp, newPassword });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.authResetPasswordFailure(response.message));
        toast.error(response.message || 'Something went wrong. Please try again later');
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.authResetPasswordSuccess());
        toast.success('Password updated!');
        NavActions.navResetToLogin();
    }
}
