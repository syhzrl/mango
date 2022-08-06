import { push, replace, goBack } from 'redux-first-history';

import { store } from 'redux/store';

import { NavToEditQrParams, NavToQrDetailsParams, NavToQrScreenParams, NavToSurveyReportsParams, NavToSurveyResponsesParams } from './NavActionsParams';

export interface INavActionState {
    [key: string]: any;
}

const navPush = (routeName: string, state?: INavActionState): void => {
    store.dispatch(push(routeName, state));
};

const navReplace = (routeName: string) => {
    store.dispatch(replace(routeName));
};

const navBack = (): void => {
    store.dispatch(goBack());
};

const navResetToLogin = (): void => navReplace('/login');

const navToHome = (): void => navPush('/');

const navToForgotPassword = (): void => navPush('/forgotPassword');

const navToCampaignScreen = (): void => navPush('/campaigns');

const navToOtp = (email: string): void => navPush('/otp', { email });

const navToRewards = (): void => navPush('/rewards');

const navToQrScreen = (params: NavToQrScreenParams): void => navPush(`/campaigns/${params.campaignId}/${params.campaignName}`);

const navToEditQrScreen = (params: NavToEditQrParams): void => navPush(`/editQr/${params.qrId}`);

const navToNewPassword = (otp: string, email: string): void => navPush('/newPassword', { otp, email });

const navToReports = (): void => navPush('/reports');

const navToQrDetails = (params: NavToQrDetailsParams): void => navPush(`/qr/details/${params.qrId}/${params.qrName}/${params.campaignId}`);

const navToSurveyReports = (params: NavToSurveyReportsParams): void => navPush(`/reports/survey/${params.surveyId}/${params.surveyName}`);

const navToSurveyResponses = (params: NavToSurveyResponsesParams): void => navPush(`/reports/survey/responses/${params.surveyId}/${params.surveyName}`);

const navToSettings = (): void => navPush('/settings');

export default {
    navBack,

    navResetToLogin,

    navToHome,

    navToForgotPassword,

    navToOtp,

    navToNewPassword,

    navToCampaignScreen,

    navToRewards,

    navToQrScreen,

    navToEditQrScreen,

    navToReports,

    navToQrDetails,

    navToSurveyReports,

    navToSurveyResponses,

    navToSettings,
};
