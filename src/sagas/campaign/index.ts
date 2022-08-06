import { fork } from 'redux-saga/effects';

import CampaignGateway from 'api/Campaign';
import { RootSagaReturnType } from 'sagas/types';

import watchGetAllCampaigns from './getAllCampaigns';
import watchCreateNewCampaign from './createNewCampaign';
import watchEditCampaign from './editCampaign';
import watchDeleteCampaign from './deleteCampaign';

export default (api: CampaignGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchGetAllCampaigns, api);
        yield fork(watchCreateNewCampaign, api);
        yield fork(watchEditCampaign, api);
        yield fork(watchDeleteCampaign, api);
    }

    return {
        rootSaga,
    };
};
