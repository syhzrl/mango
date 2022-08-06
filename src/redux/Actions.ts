import authSlice from 'redux/slices/auth';
import campaignSlice from 'redux/slices/campaign';
import qrSlice from 'redux/slices/qr';
import rewardsSlice from 'redux/slices/rewards';
import surveySlice from 'redux/slices/survey';
import reportsSlice from 'redux/slices/reports';
import settingsSlice from 'redux/slices/settings';

export default {
    ...authSlice.actions,
    ...campaignSlice.actions,
    ...qrSlice.actions,
    ...rewardsSlice.actions,
    ...surveySlice.actions,
    ...reportsSlice.actions,
    ...settingsSlice.actions,
};
