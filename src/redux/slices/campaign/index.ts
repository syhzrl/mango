import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICampaign } from 'entities/campaign';
import {
    CampaignReduxState,
    CreateNewCampaignActionPayload,
    EditCampaignActionPayload,
    DeleteCampaignActionPayload,
} from './types';

const initialState: CampaignReduxState = {
    actions: {
        getAll: false,
        createNew: false,
        edit: false,
        delete: false,
    },
    campaigns: [],
    isCreateModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    error: {
        getAll: '',
        createNew: '',
        edit: '',
        delete: '',
    },
};

const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        getAllCampaignAttempt: (state) => {
            state.actions.getAll = true;
            state.error.getAll = '';
        },
        getAllCampaignSuccess: (state, action: PayloadAction<ICampaign[]>) => {
            state.actions.getAll = false;

            if (action.payload) {
                state.campaigns = action.payload;
            }
        },
        getAllCampaignFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getAll = false;
            if (action.payload) {
                state.error.getAll = action.payload;
            }
        },
        getAllCampaignReset: (state) => {
            state.campaigns = [];
        },

        setCreateModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isCreateModalOpen = action.payload;
            state.error.edit = '';
        },

        createNewCampaignAttempt: (state, _action: CreateNewCampaignActionPayload) => {
            state.actions.createNew = true;
            state.error.createNew = '';
        },
        createNewCampaignSuccess: (state) => {
            state.actions.createNew = false;
            state.error.createNew = '';
        },
        createNewCampaignFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.createNew = false;
            if (action.payload) {
                state.error.createNew = action.payload;
            }
        },

        setEditModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isEditModalOpen = action.payload;
            state.error.edit = '';
        },

        editCampaignAttempt: (state, _action: EditCampaignActionPayload) => {
            state.actions.edit = true;
            state.error.edit = '';
        },
        editCampaignSuccess: (state) => {
            state.actions.edit = false;
            state.error.edit = '';
        },
        editCampaignFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.edit = false;
            if (action.payload) {
                state.error.edit = action.payload;
            }
        },

        setDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isDeleteModalOpen = action.payload;
            state.error.delete = '';
        },

        deleteCampaignAttempt: (state, _action: DeleteCampaignActionPayload) => {
            state.actions.delete = true;
            state.error.delete = '';
        },
        deleteCampaignSuccess: (state) => {
            state.actions.delete = false;
            state.error.delete = '';
        },
        deleteCampaignFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.delete = false;
            if (action.payload) {
                state.error.delete = action.payload;
            }
        },
    },
});

export type CampaignState = typeof initialState;

export default {
    actions: campaignSlice.actions,
    reducers: campaignSlice.reducer,
};
