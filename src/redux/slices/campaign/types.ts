import { PayloadAction } from '@reduxjs/toolkit';
import { ICampaign } from 'entities/campaign';

export interface CampaignReduxState {
    actions: {
        getAll: boolean;
        createNew: boolean;
        edit: boolean;
        delete: boolean;
    },
    campaigns: ICampaign[];
    isCreateModalOpen: boolean;
    isEditModalOpen: boolean;
    isDeleteModalOpen: boolean;
    error: {
        getAll: string;
        createNew: string;
        edit: string;
        delete: string;
    },
}

export type GetAllCampaignActionPayload = PayloadAction<ICampaign[]>

export type CreateNewCampaignActionPayload = PayloadAction<{
    name: string;
}>;

export type EditCampaignActionPayload = PayloadAction<{
    name: string;
    id: string;
}>;

export type DeleteCampaignActionPayload = PayloadAction<{
    id: string;
}>
