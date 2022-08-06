import { ICampaign } from 'entities/campaign';
import { CampaignState } from '.';

const getAllAttempting = (state: CampaignState): boolean => state.actions.getAll || false;
const getAllCampaigns = (state: CampaignState): ICampaign[] => state.campaigns || [];
const getAllError = (state: CampaignState): string => state.error.getAll || '';

const getIsCreateModalOpen = (state: CampaignState): boolean => state.isCreateModalOpen || false;

const createNewAttempting = (state: CampaignState): boolean => state.actions.createNew || false;
const createNewError = (state: CampaignState): string => state.error.createNew || '';

const getIsEditModalOpen = (state: CampaignState): boolean => state.isEditModalOpen || false;

const editCampaignAttempting = (state: CampaignState): boolean => state.actions.edit || false;
const editCampaignError = (state: CampaignState): string => state.error.edit || '';

const getIsDeleteModalOpen = (state: CampaignState): boolean => state.isDeleteModalOpen || false;

const deleteCampaignAttempting = (state: CampaignState): boolean => state.actions.delete || false;
const deleteCampaignError = (state: CampaignState): string => state.error.delete || '';

export default {
    getAllAttempting,
    getAllCampaigns,
    getAllError,

    getIsCreateModalOpen,

    createNewAttempting,
    createNewError,

    getIsEditModalOpen,

    editCampaignAttempting,
    editCampaignError,

    getIsDeleteModalOpen,

    deleteCampaignAttempting,
    deleteCampaignError,
};
