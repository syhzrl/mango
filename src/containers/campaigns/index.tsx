import React, { FunctionComponent, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Oval } from 'react-loader-spinner';

import { connect } from 'react-redux';
import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { AppDispatch, RootState } from 'redux/store';

import Text from 'components/Text';
import Button from 'components/Button';

import { ICampaign } from 'entities/campaign';

import { ContainerStyles, ItemStyles } from './styles/CampaignScreenStyles';

import CampaignCard from './components/CampaignCard';
import CreateNewModal from './components/CreateNewModal';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';

interface CampaignScreenProps {
    getAllCampaigns: () => void;
    setCreateModalOpen: (state: boolean) => void;
    campaignList: ICampaign[];
    campaignsListLoading: boolean;
    campaignsListError: string;
    resetQrs: () => void;
    getAllCampaignsReset: () => void;
}

const CampaignScreen: FunctionComponent<CampaignScreenProps> = (props: CampaignScreenProps) => {
    const {
        getAllCampaigns,
        campaignList,
        campaignsListLoading,
        campaignsListError,
        setCreateModalOpen,
        resetQrs,
        getAllCampaignsReset,
    } = props;

    const [campaignsLength, setCampaignsLength] = useState(0);
    const [campaignId, setCampaignId] = useState('');
    const [campaignName, setCampaignName] = useState('');
    const [campaignsData, setCampaignsData] = useState<ICampaign[]>([]);
    const [cardData, setCardData] = useState({
        id: '',
        name: '',
        status: 1,
        numberOfScans: 0,
        createdAt: '',
    });

    useEffect(() => {
        return (
            getAllCampaignsReset()
        );
    }, []);

    useEffect(() => {
        getAllCampaigns();
        resetQrs();
    }, []);

    useEffect(() => {
        if (campaignList.length) {
            setCampaignsData(campaignList);
            setCampaignsLength(campaignList.length);
        }
    }, [campaignList.length]);

    const renderCampaignCards = () => {
        if (!campaignList.length) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '24px',
                    }}
                >
                    <Text>No Campaigns Created</Text>
                </div>
            );
        }

        return (
            <>
                {campaignsData.map(item => {
                    const { id, name, createdAt, numberOfScans, status } = item;

                    const formattedDate = dayjs(createdAt).format('MMM DD, YYYY');

                    return (
                        <CampaignCard
                            campaignId={id}
                            title={name}
                            createdAt={formattedDate}
                            numberOfScans={numberOfScans}
                            key={name}
                            status={status}
                            onSelectedName={setCampaignName}
                            onSelectedId={setCampaignId}
                            onDeleteClicked={setCardData}
                        />
                    );
                })}
            </>
        );
    };

    if (campaignsListLoading) {
        return (
            <div style={ContainerStyles.spinnerContainer}>
                <Oval
                    height={200}
                    width={200}
                    color='#1998dd'
                    secondaryColor='#A5AAB5'
                />
            </div>
        );
    }

    if (campaignsListError) {
        return (
            <div style={ContainerStyles.spinnerContainer}>
                <Text style={{ color: 'red', marginBottom: '20px' }}>{campaignsListError}</Text>
                <Button
                    onClick={() => getAllCampaigns()}
                    css={ItemStyles.retryButton}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div style={ContainerStyles.mainContainer}>
            <div style={{ marginTop: '40px', width: '100%' }}>
                <div style={ContainerStyles.title}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ fontSize: '38px', fontWeight: 'bold' }}>
                            Campaigns
                        </Text>
                        <Text style={{ marginLeft: '20px', color: '#A5AAB5' }}>
                            {`(${campaignsLength})`}
                        </Text>
                    </div>

                    <Button
                        onClick={() => setCreateModalOpen(true)}
                        css={ItemStyles.newCampaignButton}
                    >
                        <Text>Create New Campaign</Text>
                    </Button>
                </div>

                <div style={ContainerStyles.campaignCardsContainer}>
                    {renderCampaignCards()}
                </div>

                <CreateNewModal />

                <EditModal
                    campaignName={campaignName}
                    campaignId={campaignId}
                />

                <DeleteModal
                    cardData={cardData}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    campaignsListLoading: Selectors.campaignGetAllAttempting(state),
    campaignsListError: Selectors.campaignGetAllError(state),
    campaignList: Selectors.campaignGetAll(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getAllCampaigns: () => dispatch(Actions.getAllCampaignAttempt()),
    getAllCampaignsReset: () => dispatch(Actions.getAllCampaignReset()),
    setCreateModalOpen: (state: boolean) => dispatch(Actions.setCreateModalOpen(state)),
    resetQrs: () => dispatch(Actions.getAllQrReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignScreen);
