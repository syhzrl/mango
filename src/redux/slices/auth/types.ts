import { PayloadAction } from '@reduxjs/toolkit';

export interface AuthReduxState {
    actions: {
        login: boolean;
        startup: boolean;
        requestOtp: boolean;
        verifyOtp: boolean;
        resetPassword: boolean;
    },
    authToken: string;
    error: {
        login: string;
        startup: string;
        requestOtp: string;
        verifyOtp: string;
        resetPassword: string;
    },
}

export type LoginActionPayload = PayloadAction<{
    username: string;
    password: string;
}>

export interface RequestOtpPayload {
    email: string;
}

export interface VerifyOtpPayload {
    email: string;
    otp: string;
}

export interface ResetPasswordPayload {
    email: string;
    otp: string;
    newPassword: string;
}
