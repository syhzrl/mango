import { ISettings } from 'entities/settings';
import { SettingsState } from '.';

const getAllSettingsAttempting = (state: SettingsState): boolean => state.actions.getAllSettings || false;
const getAllSettingsError = (state: SettingsState): string => state.error.getAllSettings || '';
const getAllSettings = (state: SettingsState): ISettings => state.settings || null;

const setSettingsAttempting = (state: SettingsState): boolean => state.actions.setSettings || false;
const setSettingsError = (state: SettingsState): string => state.error.setSettings || '';

export default {
    getAllSettingsAttempting,
    getAllSettingsError,
    getAllSettings,

    setSettingsAttempting,
    setSettingsError,
};
