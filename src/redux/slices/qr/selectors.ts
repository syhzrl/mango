import { GetQrStatisticsResponse } from 'api/QrBase';
import { IQr, IQrDetails, IUniqueCode } from 'entities/qr';
import { QrState } from '.';

const getAllAttempting = (state: QrState): boolean => state.actions.getAll || false;
const getAllQrs = (state: QrState): IQr[] => state.qrs || [];
const getAllError = (state: QrState): string => state.error.getAll || '';

const createNewAttempting = (state: QrState): boolean => state.actions.createNew || false;
const createNewError = (state: QrState): string => state.error.createNew || '';

const getQrDetailsAttempting = (state: QrState): boolean => state.actions.getDetails || false;
const getQrDetails = (state: QrState): IQrDetails | null => state.qrDetails || null;
const getQrDetailsError = (state: QrState): string => state.error.getDetails || '';

const getIsUpdateQrModalOpen = (state: QrState): boolean => state.isUpdateQrModalOpen || false;

const updateQrAttempting = (state: QrState): boolean => state.actions.updateQr || false;
const updateQrError = (state: QrState): string => state.error.updateQr || '';

const getIsDeleteQrModalOpen = (state: QrState): boolean => state.isDeleteQrModalOpen || false;

const deleteQrAttempting = (state: QrState): boolean => state.actions.deleteQr || false;
const deleteQrError = (state: QrState): string => state.error.deleteQr || '';

const getUniqueCodesAttempting = (state: QrState): boolean => state.actions.getUniqueCodes || false;
const getUniqueCodesError = (state: QrState): string => state.error.getUniqueCodes || '';

const getUniqueCodes = (state: QrState): IUniqueCode[] => state.uniqueCodes || [];

const uploadUniqueCodesAttempting = (state: QrState): boolean => state.actions.uploadUniqeCodes || false;
const uploadUniqueCodesError = (state: QrState): string => state.error.uploadUniqeCodes || '';

const getQrStatisticsAttempting = (state: QrState): boolean => state.actions.getQrStatistics || false;
const getQrStatisticsError = (state: QrState): string => state.error.getQrStatistics || '';
const getQrStatistics = (state: QrState): GetQrStatisticsResponse => state.qrStatistics || {};

export default {
    getAllAttempting,
    getAllQrs,
    getAllError,

    createNewAttempting,
    createNewError,

    getQrDetailsAttempting,
    getQrDetails,
    getQrDetailsError,

    getIsUpdateQrModalOpen,

    updateQrAttempting,
    updateQrError,

    getIsDeleteQrModalOpen,

    deleteQrAttempting,
    deleteQrError,

    getUniqueCodesAttempting,
    getUniqueCodesError,
    getUniqueCodes,

    uploadUniqueCodesAttempting,
    uploadUniqueCodesError,

    getQrStatisticsAttempting,
    getQrStatisticsError,
    getQrStatistics,
};
