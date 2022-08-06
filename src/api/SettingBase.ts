import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';
import { ISettings } from 'entities/settings';

export interface GetSettingsParams {
    authToken: string;
}

export interface SetSettingsParams {
    authToken: string;
    data: ISettings;
}

export abstract class ISettingsGateway extends Gateway {
    abstract getAllSettings(params: GetSettingsParams): GatewayResponse<ISettings>;

    abstract setSettings(params: SetSettingsParams): GatewayResponse<null>;
}
