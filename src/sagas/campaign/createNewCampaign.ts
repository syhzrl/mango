import { put, select, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import CampaignGateway from 'api/Campaign';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { CreateNewCampaignActionPayload } from 'redux/slices/campaign/types';

import { GatewayResponseStatus } from 'api/types/types';

import Validators from 'lib/Validators';

import { toast } from 'react-toastify';

export default function* watchCreateNewCampaign(api: CampaignGateway): SagaWatcherReturnType {
    yield takeEvery('campaign/createNewCampaignAttempt', handleCreateNewCampaign, api);
}

function* handleCreateNewCampaign(api: CampaignGateway, data: CreateNewCampaignActionPayload) {
    const authToken = yield* select(Selectors.authGetAuthToken);

    const validateError = yield* call(Validators.ValidateCreateNewCampaign, data.payload.name);

    if (validateError) {
        yield* put(Actions.createNewCampaignFailure(validateError));
        return;
    }

    const response = yield* call([api, api.createNewCampaign], { name: data.payload.name, authToken });

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.createNewCampaignFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.createNewCampaignSuccess());
        yield put(Actions.setCreateModalOpen(false));
        yield put(Actions.getAllCampaignAttempt());
        toast.success('Campaign created!');
    }
}
