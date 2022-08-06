import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginActionPayload, AuthReduxState, RequestOtpPayload, VerifyOtpPayload, ResetPasswordPayload } from './types';

const initialState: AuthReduxState = {
    actions: {
        login: false,
        startup: true,
        requestOtp: false,
        verifyOtp: false,
        resetPassword: false,
    },
    authToken: '',
    error: {
        login: '',
        startup: '',
        requestOtp: '',
        verifyOtp: '',
        resetPassword: '',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStartupAttempt: (state) => {
            state.actions.startup = true;
            state.error.startup = '';
        },
        authStartupSuccess: (state) => {
            state.actions.startup = false;
        },
        authStartupFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.startup = false;
            if (action.payload) state.error.startup = action.payload;
        },
        authLoginAttempt: (state, _action: LoginActionPayload) => {
            state.actions.login = true;
            state.error.login = '';
        },
        authLoginSuccess: (state, action: PayloadAction<string>) => {
            state.actions.login = false;
            state.authToken = action.payload;
        },
        authLoginFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.login = false;
            if (action.payload) {
                state.error.login = action.payload;
            }
        },
        authLogout: (state) => {
            state.actions.login = false;
            state.authToken = '';
        },
        authResetLogin: (state) => {
            state.actions.login = false;
            state.error.login = '';
        },
        authRequestOtpAttempt: (state, _action: PayloadAction<RequestOtpPayload>) => {
            state.actions.requestOtp = true;
            state.error.requestOtp = '';
        },
        authRequestOtpSuccess: (state) => {
            state.actions.requestOtp = false;
        },
        authRequestOtpFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.requestOtp = false;
            if (action.payload) {
                state.error.requestOtp = action.payload;
            }
        },
        authResetRequestOtp: (state) => {
            state.actions.requestOtp = false;
            state.error.requestOtp = '';
        },
        authVerifyOtpAttempt: (state, _action: PayloadAction<VerifyOtpPayload>) => {
            state.actions.verifyOtp = true;
            state.error.verifyOtp = '';
        },
        authVerifyOtpSuccess: (state) => {
            state.actions.verifyOtp = false;
        },
        authVerifyOtpFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.verifyOtp = false;
            if (action.payload) {
                state.error.verifyOtp = action.payload;
            }
        },
        authResetVerifyOtp: (state) => {
            state.actions.verifyOtp = false;
            state.error.verifyOtp = '';
        },
        authResetPasswordAttempt: (state, _action: PayloadAction<ResetPasswordPayload>) => {
            state.actions.resetPassword = true;
            state.error.resetPassword = '';
        },
        authResetPasswordSuccess: (state) => {
            state.actions.resetPassword = false;
        },
        authResetPasswordFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.resetPassword = false;
            if (action.payload) {
                state.error.resetPassword = action.payload;
            }
        },
        authResetResetPassword: (state) => {
            state.actions.resetPassword = false;
            state.error.resetPassword = '';
        },
    },
});

export type AuthState = typeof initialState;

export default {
    actions: authSlice.actions,
    reducers: authSlice.reducer,
};
