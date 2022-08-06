import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';

export interface LoginParams {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface RequestOtpParams {
    email: string;
}

export interface VerifyOtpParams {
    email: string;
    otp: string;
}

export interface ResetPasswordParams {
    email: string;
    otp: string;
    newPassword: string;
}

export abstract class IAuthGateway extends Gateway {
    abstract login(params: LoginParams): GatewayResponse<LoginResponse | null>;

    abstract requestOtp(params: RequestOtpParams): GatewayResponse<null>;

    abstract verifyOtp(params: VerifyOtpParams): GatewayResponse<null>;

    abstract resetPassword(params: ResetPasswordParams): GatewayResponse<null>;
}
