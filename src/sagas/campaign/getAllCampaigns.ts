import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import CampaignGateway from 'api/Campaign';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GatewayResponseStatus } from 'api/types/types';

export default function* watchGetAllCampaigns(api: CampaignGateway): SagaWatcherReturnType {
    yield takeEvery('campaign/getAllCampaignAttempt', handleGetAllCampaigns, api);
}

function* handleGetAllCampaigns(api: CampaignGateway) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.getAllCampaigns], { authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getAllCampaignFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.getAllCampaignSuccess(response.data));
    }
}
