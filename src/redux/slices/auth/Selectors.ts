import { AuthState } from '.';

const getLoginAttempting = (state: AuthState): boolean => state.actions.login || false;
const getLoginError = (state: AuthState): string => state.error.login || '';

const getAuthToken = (state: AuthState): string => state.authToken || '';

const getStartupAttempting = (state: AuthState): boolean => state.actions.startup || false;
const getStartupError = (state: AuthState): string => state.error.startup || '';

const getRequestOtpAttempting = (state: AuthState): boolean => state.actions.requestOtp || false;
const getRequestOtpError = (state: AuthState): string => state.error.requestOtp || '';

const getVerifyOtpAttempting = (state: AuthState): boolean => state.actions.verifyOtp || false;
const getVerifyOtpError = (state: AuthState): string => state.error.verifyOtp || '';

const getResetPasswordAttempting = (state: AuthState): boolean => state.actions.resetPassword || false;
const getResetPasswordError = (state: AuthState): string => state.error.resetPassword || '';

export default {
    getLoginAttempting,
    getLoginError,

    getAuthToken,

    getStartupAttempting,
    getStartupError,

    getRequestOtpAttempting,
    getRequestOtpError,

    getVerifyOtpAttempting,
    getVerifyOtpError,

    getResetPasswordAttempting,
    getResetPasswordError,
};
