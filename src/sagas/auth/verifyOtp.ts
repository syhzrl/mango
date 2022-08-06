import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import AuthGateway from 'api/Auth';

import Actions from 'redux/Actions';
import { VerifyOtpPayload } from 'redux/slices/auth/types';
import { GatewayResponseStatus } from 'api/types/types';
import { toast } from 'react-toastify';
import { PayloadAction } from '@reduxjs/toolkit';
import NavActions from 'lib/NavActions';

export default function* watchVerifyOtp(api: AuthGateway): SagaWatcherReturnType {
    yield takeEvery('auth/authVerifyOtpAttempt', handleVerifyOtp, api);
}

function* handleVerifyOtp(api: AuthGateway, data: PayloadAction<VerifyOtpPayload>) {
    const { email, otp } = data.payload;

    if (!email) {
        toast.error('Something went wrong. Please try again later');
        NavActions.navResetToLogin();
        return;
    }

    if (!otp) {
        yield put(Actions.authVerifyOtpFailure('Please enter the OTP that was sent to you'));
        return;
    }

    const response = yield* call([api, api.verifyOtp], { email, otp });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.authVerifyOtpFailure(response.message));
        toast.error(response.message || 'Verify OTP failed. Please try again later');
        NavActions.navResetToLogin();
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.authVerifyOtpSuccess());
        toast.success('OTP verified');
        NavActions.navToNewPassword(otp, email);
    }
}
