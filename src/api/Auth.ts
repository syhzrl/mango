import { ApiResponse } from 'apisauce';

import { GatewayResponse } from 'api/types/types';

import { LoginParams, LoginResponse, IAuthGateway, RequestOtpParams, VerifyOtpParams, ResetPasswordParams } from './AuthBase';

export default class AuthGateway extends IAuthGateway {
    async login(params: LoginParams): GatewayResponse<LoginResponse> {
        const response: ApiResponse<LoginResponse> = await this.api.post('auth/login', params);
        return this.process(response);
    }

    async requestOtp(params: RequestOtpParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.post('auth/requestOtp', params);
        return this.process(response);
    }

    async verifyOtp(params: VerifyOtpParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.post('auth/verifyOtp', params);
        return this.process(response);
    }

    async resetPassword(params: ResetPasswordParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.post('auth/newPassword', params);
        return this.process(response);
    }
}
