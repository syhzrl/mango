import config from 'config';

import AuthGateway from './Auth';
import CampaignGateway from './Campaign';
import QrGateway from './Qr';
import RewardsGateway from './Rewards';
import SurveyGateway from './Survey';
import ReportsGateway from './Reports';
import SettingsGateway from './Setting';

const baseUrl = config.baseUrl as string;

const auth = new AuthGateway(baseUrl);
const campaign = new CampaignGateway(baseUrl);
const qr = new QrGateway(baseUrl);
const rewards = new RewardsGateway(baseUrl);
const surveys = new SurveyGateway(baseUrl);
const reports = new ReportsGateway(baseUrl);
const settings = new SettingsGateway(baseUrl);

export default {
    auth,
    campaign,
    qr,
    rewards,
    surveys,
    reports,
    settings,
};
