import { ApiResponse } from 'apisauce';
import { GatewayResponse } from 'api/types/types';
import { ISettings } from 'entities/settings';

import { GetSettingsParams, ISettingsGateway, SetSettingsParams } from './SettingBase';

const getHeaders = (authToken: string, data?: any) => ({
    headers: {
        Authorization: `Bearer ${authToken}`,
    },
    data,
});

export default class SettingsGateway extends ISettingsGateway {
    async getAllSettings(params: GetSettingsParams): GatewayResponse<ISettings> {
        const response: ApiResponse<ISettings> = await this.api.get('settings', {}, getHeaders(params.authToken));
        return this.process(response);
    }

    async setSettings(params: SetSettingsParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.post('settings', params.data, getHeaders(params.authToken));
        return this.process(response);
    }
}
