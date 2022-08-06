import auth from 'redux/slices/auth/Selectors';
import campaign from 'redux/slices/campaign/selectors';
import qr from 'redux/slices/qr/selectors';
import rewards from 'redux/slices/rewards/Selectors';
import survey from 'redux/slices/survey/selectors';
import reports from 'redux/slices/reports/selectors';
import settings from 'redux/slices/settings/selectors';

import { GetQrStatisticsResponse } from 'api/QrBase';
import { ICampaign } from 'entities/campaign';
import { IQr, IQrDetails, IUniqueCode } from 'entities/qr';
import { IDeleteSurvey, IEnableSurveyParams, ISurveySelector, ISurveyTypeEnum, UploadImageParams } from 'entities/survey';
import { ISettings } from 'entities/settings';

import { RootState } from './store';
import { IRewards } from './slices/rewards/types';
import { IReports, ISurveyReports, ISurveyResponses } from './slices/reports/types';

// Auth
const authGetLoginAttempting = (state: RootState): boolean => auth.getLoginAttempting(state.auth);
const authGetLoginError = (state: RootState): string => auth.getLoginError(state.auth);

const authGetAuthToken = (state: RootState): string => auth.getAuthToken(state.auth);
const authGetStartupAttempting = (state: RootState): boolean => auth.getStartupAttempting(state.auth);
const authGetStartupError = (state: RootState): string => auth.getStartupError(state.auth);

const authGetRequestOtpAttempting = (state: RootState): boolean => auth.getRequestOtpAttempting(state.auth);
const authGetRequestOtpError = (state: RootState): string => auth.getRequestOtpError(state.auth);

const authGetVerifyOtpAttempting = (state: RootState): boolean => auth.getVerifyOtpAttempting(state.auth);
const authGetVerifyOtpError = (state: RootState): string => auth.getVerifyOtpError(state.auth);

const getAuthResetPasswordAttempting = (state: RootState): boolean => auth.getResetPasswordAttempting(state.auth);
const getAuthResetPasswordError = (state: RootState): string => auth.getResetPasswordError(state.auth);

// Campaign
const campaignGetAllAttempting = (state: RootState): boolean => campaign.getAllAttempting(state.campaign);
const campaignGetAll = (state: RootState): ICampaign[] => campaign.getAllCampaigns(state.campaign);
const campaignGetAllError = (state: RootState): string => campaign.getAllError(state.campaign);

const campaignGetIsCreateModalOpen = (state: RootState): boolean => campaign.getIsCreateModalOpen(state.campaign);

const campaignCreateNewAttempting = (state: RootState): boolean => campaign.createNewAttempting(state.campaign);
const campaignCreateNewError = (state: RootState): string => campaign.createNewError(state.campaign);

const campaignGetIsEditModalOpen = (state: RootState): boolean => campaign.getIsEditModalOpen(state.campaign);

const campaignEditCampaignAttempting = (state: RootState): boolean => campaign.editCampaignAttempting(state.campaign);
const campaignEditCampaignError = (state: RootState): string => campaign.editCampaignError(state.campaign);

const campaignGetIsDeleteModalOpen = (state: RootState): boolean => campaign.getIsDeleteModalOpen(state.campaign);

const campaignDeleteCampaignAttempting = (state: RootState): boolean => campaign.deleteCampaignAttempting(state.campaign);
const campaignDeleteCampaignError = (state: RootState): string => campaign.deleteCampaignError(state.campaign);

// QR
const qrGetAllAttempting = (state: RootState): boolean => qr.getAllAttempting(state.qr);
const qrGetAll = (state: RootState): IQr[] => qr.getAllQrs(state.qr);
const qrGetAllError = (state: RootState): string => qr.getAllError(state.qr);

const qrCreateNewAttempting = (state: RootState): boolean => qr.createNewAttempting(state.qr);
const qrCreateNewError = (state: RootState): string => qr.createNewError(state.qr);

const qrGetQrDetailsAttempting = (state: RootState): boolean => qr.getQrDetailsAttempting(state.qr);
const qrGetQrDetails = (state: RootState): IQrDetails | null => qr.getQrDetails(state.qr);
const qrGetQrDetailsError = (state: RootState): string => qr.getQrDetailsError(state.qr);

const qrGetIsUpdateModalOpen = (state: RootState): boolean => qr.getIsUpdateQrModalOpen(state.qr);

const qrUpdateQrAttempting = (state: RootState): boolean => qr.updateQrAttempting(state.qr);
const qrUpdateQrError = (state: RootState): string => qr.updateQrError(state.qr);

const qrGetIsDeleteModalOpen = (state: RootState): boolean => qr.getIsDeleteQrModalOpen(state.qr);

const qrDeleteQrAttempting = (state: RootState): boolean => qr.deleteQrAttempting(state.qr);
const qrDeleteQrError = (state: RootState): string => qr.deleteQrError(state.qr);

const qrGetUniqueCodesAttempting = (state: RootState): boolean => qr.getUniqueCodesAttempting(state.qr);
const qrGetUniqueCodesError = (state: RootState): string => qr.getUniqueCodesError(state.qr);
const qrGetUniqueCodes = (state: RootState): IUniqueCode[] => qr.getUniqueCodes(state.qr);

const qrUploadUniqueCodesAttempting = (state: RootState): boolean => qr.uploadUniqueCodesAttempting(state.qr);
const qrUploadUniqueCodesError = (state: RootState): string => qr.uploadUniqueCodesError(state.qr);

const qrGetQrStatisticsAttempting = (state: RootState): boolean => qr.getQrStatisticsAttempting(state.qr);
const qrGetQrStatisticsError = (state: RootState): string => qr.getQrStatisticsError(state.qr);
const qrGetQrStatistics = (state: RootState): GetQrStatisticsResponse => qr.getQrStatistics(state.qr);

// Rewards
const rewardsGetRewardsAttempting = (state: RootState): boolean => rewards.getRewardsAttempting(state.rewards);
const rewardsGetRewardsError = (state: RootState): string => rewards.getRewardsError(state.rewards);
const rewardsGetRewards = (state: RootState): IRewards[] => rewards.getRewards(state.rewards);

const rewardsGetRewardsCurrentIndex = (state: RootState): number => rewards.getRewardsCurrentIndex(state.rewards);
const rewardsGetRewardsCurrentPage = (state: RootState): number => rewards.getRewardsCurrentPage(state.rewards);

const rewardsGetCreateRewardsModalIsOpen = (state: RootState): boolean => rewards.getCreateRewardsModalIsOpen(state.rewards);
const rewardsGetCreateRewardsAttempting = (state: RootState): boolean => rewards.getCreateRewardsAttempting(state.rewards);
const rewardsGetCreateRewardsError = (state: RootState): string => rewards.getCreateRewardsError(state.rewards);

const rewardsGetBulkCreateRewardsModalIsOpen = (state: RootState): boolean => rewards.getBulkCreateRewardsModalIsOpen(state.rewards);
const rewardsGetEditRewardModalIsOpen = (state: RootState): boolean => rewards.getEditRewardModalIsOpen(state.rewards);
const rewardsGetEditRewardAttempting = (state: RootState): boolean => rewards.getEditRewardAttempting(state.rewards);
const rewardsGetEditRewardError = (state: RootState): string => rewards.getEditRewardError(state.rewards);

const rewardsGetDeleteRewardsModalIsOpen = (state: RootState): boolean => rewards.getDeleteRewardsModalIsOpen(state.rewards);
const rewardsGetDeleteRewardsAttempting = (state: RootState): boolean => rewards.getDeleteRewardsAttempting(state.rewards);
const rewardsGetDeleteRewardsError = (state: RootState): string => rewards.getDeleteRewardsError(state.rewards);
const rewardsGetBulkDeleteRewardsModalIsOpen = (state: RootState): boolean => rewards.getBulkDeleteRewardsModalIsOpen(state.rewards);

// Survey
const surveyGetSurveyAttempting = (state: RootState): boolean => survey.getAllAttempting(state.survey);
const surveyGetSurveyError = (state: RootState): string => survey.getAllError(state.survey);
const surveyGetSurvey = (state: RootState): ISurveySelector | null => survey.getAllSurveys(state.survey);

const surveyIsCreateNewSurveyModalOpen = (state: RootState): boolean => survey.isCreateNewSurveyModalOpen(state.survey);

const surveyCreateNewSurveyAttempting = (state: RootState): boolean => survey.createNewAttempting(state.survey);
const surveyCreateNewSurveyError = (state: RootState): string => survey.createNewError(state.survey);

const surveyIsEnableSurveyModalOpen = (state: RootState): boolean => survey.isEnableSurveyModalOpen(state.survey);

const surveyEnableSurveyAttempting = (state: RootState): boolean => survey.enableSurveyAttempting(state.survey);
const surveyEnableSurveyError = (state: RootState): string => survey.enableSurveyError(state.survey);

const surveyIsDeleteSurveyModalOpen = (state: RootState): boolean => survey.isDeleteSurveyModalOpen(state.survey);

const surveyDeleteSurveyAttempting = (state: RootState): boolean => survey.deleteSurveyAttempting(state.survey);
const surveyDeleteSurveyError = (state: RootState): string => survey.deleteSurveyError(state.survey);

const surveyUpdateSurveyAttempting = (state: RootState): boolean => survey.updateSurveyAttempting(state.survey);
const surveyUpdateSurveyError = (state: RootState): string => survey.updateSurveyError(state.survey);

const surveySelectedSurveyType = (state: RootState): ISurveyTypeEnum => survey.selectedSurveyType(state.survey);

const surveyCreateQuestionAttempting = (state: RootState): boolean => survey.createQuestionAttempting(state.survey);
const surveyCreateQuestionError = (state: RootState): string => survey.createQuestionError(state.survey);

const surveyUpdateOptionAttempting = (state: RootState): boolean => survey.updateOptionAttempting(state.survey);
const surveyUpdateOptionError = (state: RootState): string => survey.updateOptionError(state.survey);

const surveyUpdateQuestionAttempting = (state: RootState): boolean => survey.updateQuestionAttempting(state.survey);
const surveyUpdateQuestionError = (state: RootState): string => survey.updateQuestionError(state.survey);

const surveyReorderQuestionAttempting = (state: RootState): boolean => survey.reorderQuestionAttempting(state.survey);
const surveyReorderQuestionError = (state: RootState): string => survey.reorderQuestionError(state.survey);

const surveyChangeQuestionTypeAttempting = (state: RootState): boolean => survey.changeQuestionTypeAttempting(state.survey);
const surveyChangeQuestionTypeError = (state: RootState): string => survey.changeQuestionTypeError(state.survey);

const surveyCreateOptionAttempting = (state: RootState): boolean => survey.createOptionAttempting(state.survey);
const surveyCreateOptionError = (state: RootState): string => survey.createOptionError(state.survey);

const surveyGetEnableSurveyParams = (state: RootState): IEnableSurveyParams => survey.getEnableSurveyParams(state.survey);
const surveyGetDeleteSurveyParams = (state: RootState): IDeleteSurvey => survey.getDeleteSurveyParams(state.survey);

const surveyIsUploadImageModalOpen = (state: RootState): boolean => survey.isUploadImageModalOpen(state.survey);
const surveyGetUploadImageParams = (state: RootState): UploadImageParams => survey.getUploadImageParams(state.survey);
const surveyGetDeleteImageAttempting = (state: RootState): boolean => survey.deleteImageAttempting(state.survey);
const surveyGetDeleteImageError = (state: RootState): string => survey.deleteImageError(state.survey);

const surveyDeleteQuestionAttempting = (state: RootState): boolean => survey.deleteQuestionAttempting(state.survey);
const surveyDeleteQuestionError = (state: RootState): string => survey.deleteQuestionError(state.survey);

const surveyDeleteOptionAttempting = (state: RootState): boolean => survey.deleteOptionAttempting(state.survey);
const surveyDeleteOptionError = (state: RootState): string => survey.deleteOptionError(state.survey);

const surveyGetSelectedSurveyId = (state: RootState): string => survey.selectedSurveyId(state.survey);
const surveyGetSelectedQuestionId = (state: RootState): string => survey.selectedQuestionId(state.survey);
const surveyGetSelectedInputOptionId = (state: RootState): string => survey.selectedOptionInputId(state.survey);

// Reports selectors
const reportsGetReportsAttempting = (state: RootState): boolean => reports.getReportsAttempting(state.reports);
const reportsGetReportsError = (state: RootState): string => reports.getReportsError(state.reports);
const reportsGetReports = (state: RootState): IReports => reports.getReports(state.reports);

const reportsGetFilterStartDate = (state: RootState): string | null => reports.getFilterStartDate(state.reports);
const reportsGetFilterEndDate = (state: RootState): string | null => reports.getFilterEndDate(state.reports);

const reportsGetSurveyReportsAttempting = (state: RootState): boolean => reports.getSurveyReportsAttempting(state.reports);
const reportsGetSurveyReportsError = (state: RootState): string => reports.getSurveyReportsError(state.reports);
const reportsGetSurveyReports = (state: RootState): ISurveyReports => reports.getSurveyReports(state.reports);

const reportsGetSurveyResponsesAttempting = (state: RootState): boolean => reports.getSurveyResponsesAttempting(state.reports);
const reportsGetSurveyResponsesError = (state: RootState): string => reports.getSurveyResponsesError(state.reports);
const reportsGetSurveyResponses = (state: RootState): ISurveyResponses => reports.getSurveyResponses(state.reports);

const settingsGetAllSettingsAttempting = (state: RootState): boolean => settings.getAllSettingsAttempting(state.settings);
const settingsGetAllSettingsError = (state: RootState): string => settings.getAllSettingsError(state.settings);
const settingsGetAllSettings = (state: RootState): ISettings => settings.getAllSettings(state.settings);

const settingsSetSettingsAttempting = (state: RootState): boolean => settings.setSettingsAttempting(state.settings);
const settingsSetSettingsError = (state: RootState): string => settings.setSettingsError(state.settings);

export default {
    // Auth
    authGetLoginAttempting,
    authGetLoginError,

    authGetAuthToken,
    authGetStartupAttempting,
    authGetStartupError,

    authGetRequestOtpAttempting,
    authGetRequestOtpError,

    authGetVerifyOtpAttempting,
    authGetVerifyOtpError,

    getAuthResetPasswordAttempting,
    getAuthResetPasswordError,

    // Campaign
    campaignGetAllAttempting,
    campaignGetAll,
    campaignGetAllError,

    campaignGetIsCreateModalOpen,

    campaignCreateNewAttempting,
    campaignCreateNewError,

    campaignGetIsEditModalOpen,

    campaignEditCampaignAttempting,
    campaignEditCampaignError,

    campaignGetIsDeleteModalOpen,

    campaignDeleteCampaignAttempting,
    campaignDeleteCampaignError,

    // QR
    qrGetAllAttempting,
    qrGetAll,
    qrGetAllError,

    qrCreateNewAttempting,
    qrCreateNewError,

    qrGetQrDetailsAttempting,
    qrGetQrDetails,
    qrGetQrDetailsError,

    qrGetIsUpdateModalOpen,

    qrUpdateQrAttempting,
    qrUpdateQrError,

    qrGetIsDeleteModalOpen,

    qrDeleteQrAttempting,
    qrDeleteQrError,

    qrGetUniqueCodesAttempting,
    qrGetUniqueCodesError,
    qrGetUniqueCodes,

    qrUploadUniqueCodesAttempting,
    qrUploadUniqueCodesError,

    qrGetQrStatisticsAttempting,
    qrGetQrStatisticsError,
    qrGetQrStatistics,

    // Rewards
    rewardsGetRewardsAttempting,
    rewardsGetRewardsError,
    rewardsGetRewards,

    rewardsGetRewardsCurrentIndex,
    rewardsGetRewardsCurrentPage,

    rewardsGetCreateRewardsModalIsOpen,
    rewardsGetCreateRewardsAttempting,
    rewardsGetCreateRewardsError,

    rewardsGetBulkCreateRewardsModalIsOpen,

    rewardsGetEditRewardModalIsOpen,
    rewardsGetEditRewardAttempting,
    rewardsGetEditRewardError,

    rewardsGetDeleteRewardsModalIsOpen,
    rewardsGetDeleteRewardsAttempting,
    rewardsGetDeleteRewardsError,
    rewardsGetBulkDeleteRewardsModalIsOpen,

    // Survey
    surveyGetSurveyAttempting,
    surveyGetSurveyError,
    surveyGetSurvey,

    surveyIsCreateNewSurveyModalOpen,

    surveyCreateNewSurveyAttempting,
    surveyCreateNewSurveyError,

    surveyIsEnableSurveyModalOpen,

    surveyEnableSurveyAttempting,
    surveyEnableSurveyError,

    surveyIsDeleteSurveyModalOpen,

    surveyDeleteSurveyAttempting,
    surveyDeleteSurveyError,

    surveyUpdateSurveyAttempting,
    surveyUpdateSurveyError,

    surveySelectedSurveyType,

    surveyCreateQuestionAttempting,
    surveyCreateQuestionError,

    surveyUpdateOptionAttempting,
    surveyUpdateOptionError,

    surveyUpdateQuestionAttempting,
    surveyUpdateQuestionError,

    surveyReorderQuestionAttempting,
    surveyReorderQuestionError,

    surveyChangeQuestionTypeAttempting,
    surveyChangeQuestionTypeError,

    surveyCreateOptionAttempting,
    surveyCreateOptionError,

    surveyGetEnableSurveyParams,
    surveyGetDeleteSurveyParams,

    surveyIsUploadImageModalOpen,
    surveyGetUploadImageParams,

    surveyGetDeleteImageAttempting,
    surveyGetDeleteImageError,

    surveyDeleteQuestionAttempting,
    surveyDeleteQuestionError,

    surveyDeleteOptionAttempting,
    surveyDeleteOptionError,

    surveyGetSelectedSurveyId,
    surveyGetSelectedQuestionId,
    surveyGetSelectedInputOptionId,

    reportsGetReportsAttempting,
    reportsGetReportsError,
    reportsGetReports,

    reportsGetFilterStartDate,
    reportsGetFilterEndDate,

    reportsGetSurveyReportsAttempting,
    reportsGetSurveyReportsError,
    reportsGetSurveyReports,

    reportsGetSurveyResponsesAttempting,
    reportsGetSurveyResponsesError,
    reportsGetSurveyResponses,

    settingsGetAllSettingsAttempting,
    settingsGetAllSettingsError,
    settingsGetAllSettings,

    settingsSetSettingsAttempting,
    settingsSetSettingsError,
};
