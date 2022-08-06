import { PayloadAction } from '@reduxjs/toolkit';
import { ISettings } from 'entities/settings';

export interface SettingsReduxState {
    actions: {
        getAllSettings: boolean;
        setSettings: boolean;
    },
    settings: ISettings;
    error: {
        getAllSettings: string;
        setSettings: string;
    },
}

export type SetSettingsActionPayload = PayloadAction<ISettings>;
