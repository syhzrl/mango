import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import CampaignGateway from 'api/Campaign';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { EditCampaignActionPayload } from 'redux/slices/campaign/types';

import { GatewayResponseStatus } from 'api/types/types';

import { toast } from 'react-toastify';

export default function* watchDeleteCampaign(api: CampaignGateway): SagaWatcherReturnType {
    yield takeEvery('campaign/deleteCampaignAttempt', handleDeleteCampaigns, api);
}

function* handleDeleteCampaigns(api: CampaignGateway, data: EditCampaignActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const response = yield* call([api, api.deleteCampaign], { id: data.payload.id, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.deleteCampaignFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.deleteCampaignSuccess());
        yield put(Actions.setDeleteModalOpen(false));
        yield put(Actions.getAllCampaignAttempt());
        toast.success('Campaign deleted!');
    }
}
