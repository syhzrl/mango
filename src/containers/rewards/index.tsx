import React, { useState, useEffect, useRef } from 'react';
import Icons from 'assets/icons';
import Button from 'components/Button';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import dayjs from 'dayjs';
import Papa from 'papaparse';
import createRewardsTemplate from 'assets/documents/createRewardsTemplate.csv';
import deleteRewardsTemplate from 'assets/documents/deleteRewardsTemplate.csv';
import FileSaver from 'file-saver';

import {
    Card,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalFooter,
    Spinner,
    UncontrolledDropdown,
} from 'reactstrap';

import { Oval } from 'react-loader-spinner';
import Text from 'components/Text';
import Table from 'components/ReactTable';
import Pagination from 'components/Pagination';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import UploadField from 'components/UploadField';

import { IDeleteRewardsParams, IEditRewardParams, IRewards, ICreateRewardsParams } from 'redux/slices/rewards/types';
import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';

import Input from 'components/Input';
import { ContainerStyles as CampaignStyles, ItemStyles as CampaignItemStyles } from 'containers/campaigns/styles/CampaignScreenStyles';
import Styles from './styles';

interface RewardsProps {
    gettingRewards: boolean;
    getRewardsError: string;
    allRewards: IRewards[];
    currentIndex: number;
    currentPage: number;
    createRewardModalIsOpen: boolean;
    creatingRewards: boolean;
    createRewardsError: string;
    bulkCreateRewardsModalIsOpen: boolean;
    editRewardModalIsOpen: boolean;
    editingReward: boolean;
    editRewardError: string;
    deleteRewardsModalIsOpen: boolean;
    deletingRewards: boolean;
    deleteRewardsError: string;
    bulkDeleteRewardsModalIsOpen: boolean;
    getRewards: (index: number) => void;
    setCurrentIndex: (index: number) => void;
    setCurrentPage: (page: number) => void;
    setCreateRewardModalsIsOpen: (open: boolean) => void;
    createRewards: (params: ICreateRewardsParams[]) => void;
    resetCreateRewards: () => void;
    setBulkCreateRewardsModalIsOpen: (open: boolean) => void;
    setEditRewardModalIsOpen: (open: boolean) => void,
    editReward: (params: IEditRewardParams) => void,
    resetEditReward: () => void,
    setDeleteRewardsModalIsOpen: (open: boolean) => void,
    deleteRewards: (params: IDeleteRewardsParams[]) => void,
    resetDeleteRewards: () => void,
    setBulkDeleteRewardsModalIsOpen: (open: boolean) => void;
}

interface IRewardFields {
    code: string;
    expiresAt: string;
    value: number;
}

interface IParseError {
    row: number;
    code: string;
}

const Rewards = (props: RewardsProps): JSX.Element => {
    const {
        gettingRewards,
        getRewardsError,
        allRewards,
        currentIndex,
        currentPage,
        createRewardModalIsOpen,
        creatingRewards,
        createRewardsError,
        bulkCreateRewardsModalIsOpen,
        editRewardModalIsOpen,
        editingReward,
        editRewardError,
        deleteRewardsModalIsOpen,
        deletingRewards,
        deleteRewardsError,
        bulkDeleteRewardsModalIsOpen,
        getRewards,
        setCurrentIndex,
        setCurrentPage,
        setCreateRewardModalsIsOpen,
        createRewards,
        resetCreateRewards,
        setBulkCreateRewardsModalIsOpen,
        setEditRewardModalIsOpen,
        editReward,
        resetEditReward,
        setDeleteRewardsModalIsOpen,
        deleteRewards,
        resetDeleteRewards,
        setBulkDeleteRewardsModalIsOpen,
    } = props;

    const [rewardCode, setRewardCode] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [rewardValue, setRewardValue] = useState<number>();
    const [bulkCreateRewardsFileName, setBulkCreateRewardsFileName] = useState('');
    const [bulkCreateRewardsParsedCSV, setBulkCreateRewardsParsedCSV] = useState<IRewardFields[]>([]);
    const [bulkCreateRewardsParseError, setBulkCreateRewardsParseError] = useState<IParseError[]>([]);
    const bulkCreateRewardsUploadInputRef = useRef<HTMLInputElement>(null);

    const [editRewardId, setEditRewardId] = useState('');
    const [editRewardCode, setEditRewardCode] = useState('');
    const [editRewardExpiresAt, setEditRewardExpiresAt] = useState<Date>();
    const [editRewardValue, setEditRewardValue] = useState<number>();
    const [editted, setEditted] = useState(false);

    const [deleteRewardsId, setDeleteRewardsId] = useState('');
    const [bulkDeleteRewardsFileName, setBulkDeleteRewardsFileName] = useState('');
    const [bulkDeleteRewardsParsedCSV, setBulkDeleteRewardsParsedCSV] = useState<IDeleteRewardsParams[]>([]);
    const [bulkDeleteRewardsParseError, setBulkDeleteRewardsParseError] = useState<IParseError[]>([]);
    const bulkDeleteRewardsUploadInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (currentPage >= 0) {
            getRewards(currentPage);
        }

        return () => {
            setCreateRewardModalsIsOpen(false);
            resetCreateRewards();
            resetEditReward();
        };
    }, [currentPage]);

    useEffect(() => {
        if (allRewards) {
            const currentReward = allRewards[currentPage - 1]?.rewards?.find(item => item.id === editRewardId);
            if (currentReward?.code !== editRewardCode || dayjs(currentReward?.expiresAt).format('YYYY/MM/DD') !== dayjs(editRewardExpiresAt).format('YYYY/MM/DD') || currentReward?.value !== editRewardValue) {
                setEditted(true);
            } else setEditted(false);
        }
    }, [editRewardCode, editRewardExpiresAt, editRewardValue]);

    const handleDownloadCreateCSVClick = () => {
        FileSaver.saveAs(createRewardsTemplate, 'Create Rewards Template.csv');
    };

    const handleDownloadDeleteCSVClick = () => {
        FileSaver.saveAs(deleteRewardsTemplate, 'Delete Rewards Template.csv');
    };

    const handleBulkCreateRewardsClick = () => {
        if (bulkCreateRewardsUploadInputRef.current) {
            bulkCreateRewardsUploadInputRef.current.value = '';
            bulkCreateRewardsUploadInputRef.current.click();
        }
        setBulkCreateRewardsParseError([]);
    };

    const handleBulkDeleteRewardsClick = () => {
        if (bulkDeleteRewardsUploadInputRef.current) {
            bulkDeleteRewardsUploadInputRef.current.value = '';
            bulkDeleteRewardsUploadInputRef.current.click();
        }
        setBulkDeleteRewardsParseError([]);
    };

    const handleEditRewardClick = (id: string, code: string, expiresAt: string, value: number) => {
        setEditRewardId(id);
        setEditRewardCode(code);
        setEditRewardExpiresAt(new Date(expiresAt));
        setEditRewardValue(value);
        setEditted(false);
        setEditRewardModalIsOpen(true);
    };

    const handleDeleteRewardsClick = (code: string) => {
        setDeleteRewardsId(code);
        setDeleteRewardsModalIsOpen(true);
    };

    const handleCreateRewards = () => {
        if (rewardCode && selectedDate && dayjs(selectedDate).isValid() && rewardValue && rewardValue > 0) {
            createRewards([{ code: rewardCode, expiresAt: dayjs(selectedDate).format(), value: rewardValue }]);
        }
    };

    const handleBulkCreateRewards = () => {
        if (!bulkCreateRewardsParseError.length && bulkCreateRewardsParsedCSV.length > 0) {
            createRewards(bulkCreateRewardsParsedCSV);
        }
    };

    const handleBulkDeleteRewards = () => {
        if (!bulkDeleteRewardsParseError.length && bulkDeleteRewardsParsedCSV.length > 0) {
            deleteRewards(bulkDeleteRewardsParsedCSV);
        }
    };

    const handleEditReward = () => {
        if (editRewardCode && editRewardId && editRewardValue) {
            editReward({ id: editRewardId, code: editRewardCode, expiresAt: dayjs(editRewardExpiresAt).format(), value: editRewardValue });
        }
    };

    const handleDeleteIndividualReward = () => {
        if (deleteRewardsId) {
            deleteRewards([{ code: deleteRewardsId }]);
        }
    };

    const toggleBulkCreateRewardsModal = () => {
        setBulkCreateRewardsModalIsOpen(!bulkCreateRewardsModalIsOpen);
        setBulkCreateRewardsParseError([]);
        setBulkCreateRewardsFileName('');
        resetCreateRewards();
    };

    const toggleCreateRewardsModal = () => {
        setCreateRewardModalsIsOpen(!createRewardModalIsOpen);
        resetCreateRewards();
        setSelectedDate(new Date());
        setRewardCode('');
        setRewardValue(undefined);
    };

    const toggleBulkDeleteRewardsModal = () => {
        setBulkDeleteRewardsModalIsOpen(!bulkDeleteRewardsModalIsOpen);
        setBulkDeleteRewardsParseError([]);
        setBulkDeleteRewardsFileName('');
        resetDeleteRewards();
    };

    const renderBulkCreateRewardsParseError = () => {
        return bulkCreateRewardsParseError.map(error => {
            return (
                <div key={error.row.toString().concat(error.code)} style={{ color: 'red', fontSize: '12px' }}>
                    Row
                    {' '}
                    {error.row}
                    :
                    {' '}
                    {error.code}
                </div>
            );
        });
    };

    const renderBulkDeleteRewardsParseError = () => {
        return bulkDeleteRewardsParseError.map(error => {
            return (
                <div key={error.row.toString().concat(error.code)} style={{ color: 'red', fontSize: '12px' }}>
                    Row
                    {' '}
                    {error.row}
                    :
                    {' '}
                    {error.code}
                </div>
            );
        });
    };

    const handleBulkCreateRewardsOnChange = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        if (target.files) {
            const [file] = target.files;
            const { name } = file;
            setBulkCreateRewardsFileName(name);

            Papa.parse<IRewardFields>(file, {
                skipEmptyLines: false,
                header: true,
                complete: results => {
                    const { data } = results;
                    if (data.length) {
                        const error: IParseError[] = [];
                        const parsedData: IRewardFields[] = [];
                        data.forEach((item, index) => {
                            if (index + 1 === data.length && !item.code?.trim().length && !item.expiresAt?.trim().length && !item.value) {
                                return;
                            } if (!item.code?.trim().length && !item.expiresAt?.trim().length && !item.value) {
                                error.push({ row: index + 2, code: 'Empty row' });
                            } else {
                                if (!item.code?.trim().length) {
                                    error.push({ row: index + 2, code: 'Missing code' });
                                } if (item.code?.trim().length > 11) {
                                    error.push({ row: index + 2, code: 'Code exceeded the character limit of 11' });
                                } if (item.code?.trim().length && !item.code.match(/^[a-z0-9]*$/i)) {
                                    error.push({ row: index + 2, code: 'Invalid characters detected' });
                                } if (!item.expiresAt?.trim().length) {
                                    error.push({ row: index + 2, code: 'Missing expiry date' });
                                } if (item.expiresAt?.trim().length && !dayjs(item.expiresAt).isValid()) {
                                    error.push({ row: index + 2, code: 'Invalid expiry date' });
                                } if (!item.value) {
                                    error.push({ row: index + 2, code: 'Missing value' });
                                } if (item.value && !Number(item.value)) {
                                    error.push({ row: index + 2, code: 'Invalid value' });
                                } if (item.value && Number(item.value) && !Number.isInteger(Number(item.value))) {
                                    error.push({ row: index + 2, code: 'Value not integer' });
                                } if (item.value && item.value > 500) {
                                    error.push({ row: index + 2, code: 'Value is over the limit of RM500' });
                                } if (item.code?.trim().length && parsedData.find(parsed => parsed.code === item.code)) {
                                    error.push({ row: index + 2, code: 'Duplicate code' });
                                } else parsedData.push({ code: item.code, expiresAt: item.expiresAt, value: Number(item.value) });
                            }
                        });
                        setBulkCreateRewardsParseError(error);
                        setBulkCreateRewardsParsedCSV(parsedData);
                    } else setBulkCreateRewardsParseError([{ row: 0, code: 'Invalid headers' }]);
                },
            });
        }
    };

    const handleBulkDeleteRewardsOnChange = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        if (target.files) {
            const [file] = target.files;
            const { name } = file;
            setBulkDeleteRewardsFileName(name);

            Papa.parse<IDeleteRewardsParams>(file, {
                skipEmptyLines: false,
                header: true,
                complete: results => {
                    const { data } = results;

                    if (data.length) {
                        const error: IParseError[] = [];
                        const parsedData: IDeleteRewardsParams[] = [];
                        data.forEach((item, index) => {
                            if (index + 1 === data.length && !item.code?.trim().length) {
                                return;
                            } if (!item.code?.trim().length) {
                                error.push({ row: index + 2, code: 'Missing code' });
                                return;
                            } if (item.code?.trim().length && Object.keys(item).filter(key => key !== 'code').length > 0) {
                                error.push({ row: index + 2, code: 'Extra field(s) found! Check if the header and data are in the correct format.' });
                            } if (item.code?.trim().length && parsedData.find(parsed => parsed.code === item.code)) {
                                error.push({ row: index + 2, code: 'Duplicate code' });
                            } else parsedData.push({ code: item.code });
                        });
                        setBulkDeleteRewardsParseError(error);
                        setBulkDeleteRewardsParsedCSV(parsedData);
                    } else setBulkDeleteRewardsParseError([{ row: 0, code: 'Invalid headers' }]);
                },
            });
        }
    };

    const toggleEditRewardModal = () => {
        setEditRewardModalIsOpen(!editRewardModalIsOpen);
        resetEditReward();
        setEditRewardId('');
        setEditRewardCode('');
        setEditRewardExpiresAt(undefined);
        setEditRewardValue(undefined);
    };

    const toggleDeleteRewardsModal = () => {
        setDeleteRewardsModalIsOpen(!deleteRewardsModalIsOpen);
        resetDeleteRewards();
        setDeleteRewardsId('');
    };

    const renderAddRewardModal = () => {
        return (
            <Modal isOpen={createRewardModalIsOpen} toggle={toggleCreateRewardsModal}>
                <ModalBody>
                    <div style={{ fontSize: '24px', marginBottom: '20px' }}>New Reward</div>
                    <Input
                        disabled={creatingRewards}
                        label='Reward Code*'
                        maxLength={11}
                        value={rewardCode}
                        onChange={(e) => {
                            if (e.currentTarget.value.match(/^[a-z0-9]*$/ig)) {
                                setRewardCode(e.currentTarget.value);
                            }
                        }}
                        labelCss={['font-size: 16px']}
                        css={[
                            `
                            margin-bottom: 20px;
                            border: 1px solid rgb(0,0,0,0.1);
                            transition: box-shadow .15s ease-in-out;
                            &:focus {
                                box-shadow: 0px 0px 0px 4px rgb(194,219,254);
                            }
                    `,
                        ]}
                    />

                    <div style={{ marginBottom: '20px' }}>
                        Expires At
                        <DatePicker
                            dateFormat='dd/MM/yyyy'
                            minDate={new Date()}
                            disabled={creatingRewards}
                            selected={selectedDate}
                            onChange={(date: Date) => setSelectedDate(date)}
                        />
                    </div>

                    <Input
                        disabled={creatingRewards}
                        label='Value (RM)*'
                        value={rewardValue || ''}
                        type='number'
                        onChange={(e) => {
                            if (e.currentTarget.value.match(/^[0-9]*$/)) {
                                setRewardValue(e.currentTarget.valueAsNumber);
                            }
                        }}
                        labelCss={['font-size: 16px']}
                        css={[
                            `
                            margin-bottom: 20px;
                            border: 1px solid rgb(0,0,0,0.1);
                            transition: box-shadow .15s ease-in-out;
                            &:focus {
                                box-shadow: 0px 0px 0px 4px rgb(194,219,254);
                            }
                    `,
                        ]}
                    />
                    <div style={{ ...Styles.ErrorMessage, marginTop: '0px' }}>{rewardValue !== undefined && rewardValue > 500 ? 'Value is over the limit of RM500' : ''}</div>
                </ModalBody>

                <ModalFooter>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '10px auto auto' }}>
                        <Button
                            style={{
                                backgroundColor: 'red',
                                color: '#FFFFFF',
                                width: '100px',
                            }}
                            onClick={() => {
                                toggleCreateRewardsModal();
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={!rewardCode.length || !selectedDate || rewardValue === undefined || rewardValue > 500 || !rewardValue || creatingRewards || rewardValue < 1}
                            style={{
                                backgroundColor: '#021778',
                                opacity: (!rewardCode.length || !selectedDate || rewardValue === undefined || rewardValue > 500 || !rewardValue || rewardValue < 1) ? 0.5 : 1,
                                cursor: (!rewardCode.length || !selectedDate || rewardValue === undefined || rewardValue > 500 || !rewardValue || creatingRewards || rewardValue < 1) ? 'not-allowed' : 'pointer',
                                color: '#FFFFFF',
                                width: '100px',
                            }}
                            onClick={handleCreateRewards}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {creatingRewards ? <Spinner /> : 'Create'}
                            </div>
                        </Button>
                    </div>
                </ModalFooter>
                <div style={{ ...Styles.ErrorMessage }}>{createRewardsError}</div>
            </Modal>
        );
    };

    const renderBulkCreateRewardsModal = () => {
        return (
            <Modal size='lg' isOpen={bulkCreateRewardsModalIsOpen} toggle={toggleBulkCreateRewardsModal}>
                <ModalBody>
                    <div style={{ fontSize: '24px', marginBottom: '20px' }}>
                        Bulk Create Rewards
                    </div>

                    <UploadField accept='.csv' onClick={handleBulkCreateRewardsClick} onChange={handleBulkCreateRewardsOnChange} reference={bulkCreateRewardsUploadInputRef} fileName={bulkCreateRewardsFileName} />

                    <div style={{ marginTop: '10px' }}>{renderBulkCreateRewardsParseError()}</div>
                </ModalBody>

                <ModalFooter>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '10px auto auto' }}>
                        <Button
                            style={{
                                backgroundColor: 'red',
                                color: '#FFFFFF',
                                width: '100px',
                            }}
                            onClick={() => {
                                toggleBulkCreateRewardsModal();
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={bulkCreateRewardsParseError.length > 0 || !bulkCreateRewardsParsedCSV.length || creatingRewards}
                            style={{
                                backgroundColor: '#021778',
                                opacity: (bulkCreateRewardsParseError.length > 0 || !bulkCreateRewardsParsedCSV.length) ? 0.5 : 1,
                                cursor: (bulkCreateRewardsParseError.length > 0 || !bulkCreateRewardsParsedCSV.length || creatingRewards) ? 'not-allowed' : 'pointer',
                                color: '#FFFFFF',
                                width: '100px',
                            }}
                            onClick={handleBulkCreateRewards}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {creatingRewards ? <Spinner /> : 'Upload'}
                            </div>
                        </Button>
                    </div>
                </ModalFooter>
                <div style={{ ...Styles.ErrorMessage }}>{createRewardsError}</div>
            </Modal>
        );
    };

    const renderEditRewardModal = () => {
        return (
            <Modal isOpen={editRewardModalIsOpen} toggle={toggleEditRewardModal}>
                <ModalBody>
                    <div style={{ fontSize: '24px', marginBottom: '20px' }}>Edit Reward</div>
                    <Input
                        disabled={editingReward}
                        maxLength={11}
                        label='Reward Code*'
                        value={editRewardCode}
                        onChange={(e) => {
                            if (e.currentTarget.value.match(/^[a-z0-9]*$/ig)) {
                                setEditRewardCode(e.currentTarget.value);
                            }
                        }}
                        labelCss={['font-size: 16px']}
                        css={[
                            `
                            margin-bottom: 20px;
                            border: 1px solid rgb(0,0,0,0.1);
                            transition: box-shadow .15s ease-in-out;
                            &:focus {
                                box-shadow: 0px 0px 0px 4px rgb(194,219,254);
                            }
                    `,
                        ]}
                    />

                    <div style={{ marginBottom: '20px' }}>
                        Expires At
                        <DatePicker
                            minDate={new Date()}
                            dateFormat='dd/MM/yyyy'
                            disabled={editingReward}
                            selected={editRewardExpiresAt}
                            onChange={(date: Date) => setEditRewardExpiresAt(date)}
                        />
                    </div>

                    <Input
                        disabled={editingReward}
                        label='Value (RM)*'
                        value={editRewardValue || ''}
                        type='number'
                        onChange={(e) => {
                            if (e.currentTarget.value.match(/^[0-9]*$/)) {
                                setEditRewardValue(e.currentTarget.valueAsNumber);
                            }
                        }}
                        labelCss={['font-size: 16px']}
                        css={[
                            `
                            margin-bottom: 20px;
                            border: 1px solid rgb(0,0,0,0.1);
                            transition: box-shadow .15s ease-in-out;
                            &:focus {
                                box-shadow: 0px 0px 0px 4px rgb(194,219,254);
                            }
                    `,
                        ]}
                    />
                    <div style={{ ...Styles.ErrorMessage, marginTop: '0px' }}>{editRewardValue !== undefined && editRewardValue > 500 ? 'Value is over the limit of RM500' : ''}</div>
                </ModalBody>

                <ModalFooter>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '10px auto auto' }}>
                        <Button
                            style={{
                                backgroundColor: 'red',
                                color: '#FFFFFF',
                                width: '100px',
                            }}
                            onClick={() => {
                                toggleEditRewardModal();
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={!editRewardCode.length || editRewardValue === undefined || editRewardValue > 500 || !editRewardValue || editingReward || !editted}
                            style={{
                                backgroundColor: '#021778',
                                opacity: (!editRewardCode.length || editRewardValue === undefined || editRewardValue > 500 || !editRewardValue || !editted) ? 0.5 : 1,
                                cursor: (!editRewardCode.length || editRewardValue === undefined || editRewardValue > 500 || !editRewardValue || editingReward || !editted) ? 'not-allowed' : 'pointer',
                                color: '#FFFFFF',
                                width: '100px',
                            }}
                            onClick={handleEditReward}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {editingReward ? <Spinner /> : 'Update'}
                            </div>
                        </Button>
                    </div>
                </ModalFooter>
                <div style={{ ...Styles.ErrorMessage }}>{editRewardError}</div>
            </Modal>
        );
    };

    const renderDeleteRewardsModal = () => {
        return (
            <Modal size='sm' isOpen={deleteRewardsModalIsOpen} toggle={toggleDeleteRewardsModal}>
                <ModalBody>
                    <div style={{ fontSize: '24px' }}>
                        Confirm delete reward?
                    </div>
                </ModalBody>

                <ModalFooter>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '10px auto auto' }}>
                        <Button
                            style={{
                                backgroundColor: 'red',
                                color: '#FFFFFF',
                                width: '100px',
                            }}
                            onClick={() => {
                                toggleDeleteRewardsModal();
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={deletingRewards}
                            style={{
                                backgroundColor: '#021778',
                                opacity: 1,
                                cursor: (deletingRewards) ? 'not-allowed' : 'pointer',
                                color: '#FFFFFF',
                                width: '100px',
                            }}
                            onClick={handleDeleteIndividualReward}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {deletingRewards ? <Spinner /> : 'Delete'}
                            </div>
                        </Button>
                    </div>
                </ModalFooter>
                <div style={{ ...Styles.ErrorMessage }}>{deleteRewardsError}</div>
            </Modal>
        );
    };

    const renderBulkDeleteRewardsModal = () => {
        return (
            <Modal size='lg' isOpen={bulkDeleteRewardsModalIsOpen} toggle={toggleBulkDeleteRewardsModal}>
                <ModalBody>
                    <div style={{ fontSize: '24px', marginBottom: '20px' }}>
                        Bulk Delete Rewards
                    </div>

                    <UploadField accept='.csv' onClick={handleBulkDeleteRewardsClick} onChange={handleBulkDeleteRewardsOnChange} reference={bulkDeleteRewardsUploadInputRef} fileName={bulkDeleteRewardsFileName} />

                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={Styles.DownloadCSVButton}>
                            <Button
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#888888',
                                    width: 'auto',
                                }}
                                onClick={handleDownloadDeleteCSVClick}
                            >
                                <div style={{ color: '#021778' }}>download delete .csv</div>
                            </Button>
                            template file
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>{renderBulkDeleteRewardsParseError()}</div>
                </ModalBody>

                <ModalFooter>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '10px auto auto' }}>
                        <Button
                            style={{
                                backgroundColor: 'red',
                                color: '#FFFFFF',
                                width: '100px',
                            }}
                            onClick={() => {
                                toggleBulkDeleteRewardsModal();
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={bulkDeleteRewardsParseError.length > 0 || deletingRewards}
                            style={{
                                backgroundColor: '#021778',
                                opacity: (bulkDeleteRewardsParseError.length > 0 || !bulkDeleteRewardsParsedCSV.length) ? 0.5 : 1,
                                cursor: (bulkDeleteRewardsParseError.length > 0 || deletingRewards) ? 'not-allowed' : 'pointer',
                                color: '#FFFFFF',
                                width: '100px',
                            }}
                            onClick={handleBulkDeleteRewards}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {deletingRewards ? <Spinner /> : 'Upload'}
                            </div>
                        </Button>
                    </div>
                </ModalFooter>
                <div style={{ ...Styles.ErrorMessage }}>{deleteRewardsError}</div>
            </Modal>
        );
    };

    const prepareTableData = () => {
        const tableHeaders = ['Code', 'Created At', 'Value', 'Award Status', 'Awarded To', ''];

        const tableData = allRewards[currentPage - 1]?.rewards?.map(item => {
            const { id, code, createdAt, value, status, awardedTo, expiresAt } = item;
            const renderAwardedLabel = () => {
                return (
                    <div style={{ backgroundColor: status === 1 ? '#E8F4FF' : '#FDF5E7', color: status === 1 ? '#021778' : '#EF950F', padding: 0 }}>
                        {status === 1 ? 'AWARDED' : 'NOT AWARDED'}
                    </div>
                );
            };

            return [
                <div style={{ color: '#888888' }}>{code}</div>,
                <div style={{ color: '#888888' }}>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>,
                <div style={{ color: '#888888' }}>{value}</div>,
                renderAwardedLabel(),
                <div style={{ color: '#888888' }}>{awardedTo}</div>,
                (
                    <UncontrolledDropdown hidden={status === 1}>
                        <DropdownToggle
                            style={{
                                backgroundColor: 'transparent',
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                color: '#888888',
                                border: 0,
                            }}
                        >
                            ...
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem onClick={() => handleEditRewardClick(id, code, expiresAt, value)}>Edit</DropdownItem>
                            <DropdownItem onClick={() => handleDeleteRewardsClick(code)}>Delete</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                ),
            ];
        });

        return {
            tableHeaders,
            tableData,
        };
    };

    const renderTable = () => {
        const { tableHeaders, tableData } = prepareTableData();

        return (
            <div style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '40px' }}>
                    {getRewardsError ? <div style={{ color: 'red' }}>{getRewardsError}</div> : <Table tableHeaders={tableHeaders} tableData={tableData?.length ? tableData : []} loading={false} />}

                    <div style={{ position: 'absolute', bottom: '5px' }}>
                        <Pagination pagesPerIndex={10} setPage={setCurrentPage} currentPage={currentPage} maxPages={allRewards[0]?.maxIndex > 0 ? allRewards[0]?.maxIndex : 0} index={currentIndex} setIndex={setCurrentIndex} />
                    </div>
                </div>
            </div>
        );
    };

    if (gettingRewards) {
        return (
            <div style={CampaignStyles.spinnerContainer}>
                <Oval
                    height={200}
                    width={200}
                    color='#1998dd'
                    secondaryColor='#A5AAB5'
                />
            </div>
        );
    }

    if (getRewardsError) {
        return (
            <div style={CampaignStyles.spinnerContainer}>
                <Text style={{ color: 'red', marginBottom: '20px' }}>{getRewardsError}</Text>
                <Button
                    hidden={currentPage === 0}
                    onClick={() => getRewards(currentPage)}
                    css={CampaignItemStyles.retryButton}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div
            style={{
                ...Styles.PageContainer,
            }}
        >
            <div
                style={{
                    ...Styles.divider,
                    margin: '40px auto',
                }}
            />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div
                    style={{
                        ...Styles.PageHeader,
                    }}
                >
                    Rewards
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        style={{
                            backgroundColor: 'transparent',
                            color: '#021778',
                            width: 'auto',
                        }}
                        onClick={() => toggleCreateRewardsModal()}
                    >
                        + Add new rewards
                    </Button>

                    <Button
                        style={{
                            display: 'flex',
                            backgroundColor: 'transparent',
                            color: '#A5AAB5',
                            width: 'auto',
                            alignItems: 'center',
                        }}
                        onClick={() => toggleBulkDeleteRewardsModal()}
                    >
                        <img
                            alt='delete'
                            src={Icons.Trashcan}
                        />
                        Remove .csv file
                    </Button>

                    <div style={{ ...Styles.verticalDivider }} />

                    <Button
                        style={{
                            ...Styles.UploadCSVButton,
                            backgroundColor: creatingRewards ? 'rgb(128,128,128)' : '#021778',
                            cursor: creatingRewards ? 'not-allowed' : 'pointer',
                        }}
                        onClick={() => toggleBulkCreateRewardsModal()}
                    >
                        {creatingRewards ? <Spinner /> : 'UPLOAD .CSV FILE'}
                    </Button>
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <div style={Styles.DownloadCSVButton}>
                    <Button
                        style={{
                            backgroundColor: 'transparent',
                            color: '#888888',
                            width: 'auto',
                        }}
                        onClick={handleDownloadCreateCSVClick}
                    >
                        <div style={{ color: '#021778' }}>download create .csv</div>
                    </Button>
                    template file
                </div>
            </div>

            <Card
                style={{
                    minWidth: '900px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 0,
                    padding: '15px',
                }}
            >
                {renderTable()}
            </Card>
            {renderAddRewardModal()}
            {renderBulkCreateRewardsModal()}
            {renderEditRewardModal()}
            {renderDeleteRewardsModal()}
            {renderBulkDeleteRewardsModal()}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    gettingRewards: Selectors.rewardsGetRewardsAttempting(state),
    getRewardsError: Selectors.rewardsGetRewardsError(state),
    allRewards: Selectors.rewardsGetRewards(state),
    currentIndex: Selectors.rewardsGetRewardsCurrentIndex(state),
    currentPage: Selectors.rewardsGetRewardsCurrentPage(state),
    createRewardModalIsOpen: Selectors.rewardsGetCreateRewardsModalIsOpen(state),
    creatingRewards: Selectors.rewardsGetCreateRewardsAttempting(state),
    createRewardsError: Selectors.rewardsGetCreateRewardsError(state),
    bulkCreateRewardsModalIsOpen: Selectors.rewardsGetBulkCreateRewardsModalIsOpen(state),
    editRewardModalIsOpen: Selectors.rewardsGetEditRewardModalIsOpen(state),
    editingReward: Selectors.rewardsGetEditRewardAttempting(state),
    editRewardError: Selectors.rewardsGetEditRewardError(state),
    deleteRewardsModalIsOpen: Selectors.rewardsGetDeleteRewardsModalIsOpen(state),
    deletingRewards: Selectors.rewardsGetDeleteRewardsAttempting(state),
    deleteRewardsError: Selectors.rewardsGetDeleteRewardsError(state),
    bulkDeleteRewardsModalIsOpen: Selectors.rewardsGetBulkDeleteRewardsModalIsOpen(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getRewards: (index: number) => dispatch(Actions.rewardsGetRewardsAttempt({ index })),
    setCurrentIndex: (index: number) => dispatch(Actions.rewardsSetCurrentIndex(index)),
    setCurrentPage: (page: number) => dispatch(Actions.rewardsSetCurrentPage(page)),
    setCreateRewardModalsIsOpen: (open: boolean) => dispatch(Actions.rewardsSetCreateRewardModalIsOpen(open)),
    createRewards: (params: ICreateRewardsParams[]) => dispatch(Actions.rewardsCreateRewardsAttempt(params)),
    resetCreateRewards: () => dispatch(Actions.rewardsResetCreateRewards()),
    setBulkCreateRewardsModalIsOpen: (open: boolean) => dispatch(Actions.rewardsSetBulkCreateRewardsModalIsOpen(open)),
    setIsOpen: (open: boolean) => dispatch(Actions.rewardsSetCreateRewardModalIsOpen(open)),
    setEditRewardModalIsOpen: (open: boolean) => dispatch(Actions.rewardsSetEditRewardModalIsOpen(open)),
    editReward: (params: IEditRewardParams) => dispatch(Actions.rewardsEditRewardAttempt({ ...params })),
    resetEditReward: () => dispatch(Actions.rewardsResetEditReward()),
    setDeleteRewardsModalIsOpen: (open: boolean) => dispatch(Actions.rewardsSetDeleteRewardsModalIsOpen(open)),
    deleteRewards: (params: IDeleteRewardsParams[]) => dispatch(Actions.rewardsDeleteRewardsAttempt(params)),
    resetDeleteRewards: () => dispatch(Actions.rewardsResetDeleteRewards()),
    setBulkDeleteRewardsModalIsOpen: (open: boolean) => dispatch(Actions.rewardsSetBulkDeleteRewardsModalIsOpen(open)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rewards);
