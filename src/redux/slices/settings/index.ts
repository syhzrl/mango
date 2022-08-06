import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISettings } from 'entities/settings';
import {
    SetSettingsActionPayload,
    SettingsReduxState,
} from './types';

const initialState: SettingsReduxState = {
    actions: {
        getAllSettings: false,
        setSettings: false,
    },
    settings: {
        iqosUrl: '',
    },
    error: {
        getAllSettings: '',
        setSettings: '',
    },
};

const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        getAllSettingsAttempt: (state) => {
            state.actions.getAllSettings = true;
            state.error.getAllSettings = '';
        },
        getAllSettingsSuccess: (state, action: PayloadAction<ISettings>) => {
            state.actions.getAllSettings = false;
            state.error.getAllSettings = '';

            state.settings = action.payload;
        },
        getAllSettingsFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getAllSettings = false;
            if (action.payload) {
                state.error.getAllSettings = action.payload;
            }
        },

        setSettingsAttempt: (state, _action: SetSettingsActionPayload) => {
            state.actions.setSettings = true;
            state.error.setSettings = '';
        },
        setSettingsSuccess: (state) => {
            state.actions.setSettings = false;
            state.error.setSettings = '';
        },
        setSettingsFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.setSettings = false;
            if (action.payload) {
                state.error.setSettings = action.payload;
            }
        },
    },
});

export type SettingsState = typeof initialState;

export default {
    actions: settingSlice.actions,
    reducers: settingSlice.reducer,
};
