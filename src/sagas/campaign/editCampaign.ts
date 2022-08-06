import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import CampaignGateway from 'api/Campaign';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { EditCampaignActionPayload } from 'redux/slices/campaign/types';

import { GatewayResponseStatus } from 'api/types/types';

import Validators from 'lib/Validators';

import { toast } from 'react-toastify';

export default function* watchEditCampaign(api: CampaignGateway): SagaWatcherReturnType {
    yield takeEvery('campaign/editCampaignAttempt', handleEditCampaigns, api);
}

function* handleEditCampaigns(api: CampaignGateway, data: EditCampaignActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const validateError = yield* call(Validators.ValidateCreateNewCampaign, data.payload.name);

    if (validateError) {
        yield* put(Actions.editCampaignFailure(validateError));
        return;
    }

    const response = yield* call([api, api.editCampaign], { id: data.payload.id, name: data.payload.name, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.editCampaignFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.editCampaignSuccess());
        yield put(Actions.setEditModalOpen(false));
        yield put(Actions.getAllCampaignReset());
        yield put(Actions.getAllCampaignAttempt());
        toast.success('Campaign edited!');
    }
}
