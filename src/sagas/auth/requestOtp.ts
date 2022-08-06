import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import AuthGateway from 'api/Auth';

import Actions from 'redux/Actions';
import { RequestOtpPayload } from 'redux/slices/auth/types';
import { GatewayResponseStatus } from 'api/types/types';
import { toast } from 'react-toastify';
import { PayloadAction } from '@reduxjs/toolkit';
import NavActions from 'lib/NavActions';

export default function* watchRequestOtp(api: AuthGateway): SagaWatcherReturnType {
    yield takeEvery('auth/authRequestOtpAttempt', handleRequestOtp, api);
}

function* handleRequestOtp(api: AuthGateway, data: PayloadAction<RequestOtpPayload>) {
    const { email } = data.payload;

    if (!email) {
        yield put(Actions.authRequestOtpFailure('Please enter your email address'));
        return;
    }

    const response = yield* call([api, api.requestOtp], { email });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.authRequestOtpFailure(response.message));
        toast.error(response.message || 'Request OTP failed. Please try again later');
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.authRequestOtpSuccess());
        toast.success('OTP sent');
        NavActions.navToOtp(email);
    }
}
