import React, { FunctionComponent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Oval } from 'react-loader-spinner';

import { connect } from 'react-redux';
import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { AppDispatch, RootState } from 'redux/store';

import { IQr } from 'entities/qr';
import { ICampaign } from 'entities/campaign';

import { NavToQrScreenParams } from 'lib/NavActionsParams';

import Text from 'components/Text';
import Button from 'components/Button';

import QrCard from './components/QrCard';
import DeleteQrModal from './components/DeleteQrModal';

import { ContainerStyles, ItemStyles } from './styles/QrScreenStyles';

interface QrScreenProps {
    qrListLoading: boolean;
    qrListError: string;
    qrList: IQr[];
    campaignList: ICampaign[];
    getAllQrs: (campaignId: string) => void;
    createNewQrLoading: boolean;
    createNewQr: (campaignId: string) => void;
    resetQrDetails: () => void;
    resetUniqueCodes: () => void;
    resetSurveyData: () => void;
}

const QrScreen: FunctionComponent<QrScreenProps> = (props: QrScreenProps) => {
    const {
        qrListLoading,
        qrListError,
        qrList,
        campaignList,
        getAllQrs,
        createNewQrLoading,
        createNewQr,
        resetQrDetails,
        resetUniqueCodes,
        resetSurveyData,
    } = props;

    const [screenName, setScreenName] = useState('');
    const [deleteParams, setDeleteParams] = useState({
        name: '',
        id: '',
    });

    const param = useParams();
    const { campaignId = '', campaignName = '' } = param;

    useEffect(() => {
        getAllQrs(campaignId);
        resetQrDetails();
        resetUniqueCodes();
        resetSurveyData();
        setScreenName(campaignName);
    }, []);

    const renderQrCards = () => {
        if (!qrListLoading && !qrList.length) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '24px',
                    }}
                >
                    <Text>No QRs Created</Text>
                </div>
            );
        }

        return (
            <>
                {qrList.map(item => {
                    const { id, name, qrType, status, createdAt, numberOfScans } = item;

                    const formattedDate = dayjs(createdAt).format('MMM DD, YYYY');

                    return (
                        <QrCard
                            key={id}
                            id={id}
                            name={name}
                            type={qrType}
                            status={status}
                            createdAt={formattedDate}
                            numOfScans={numberOfScans}
                            passQrNameToDeleteModal={setDeleteParams}
                            campaignId={campaignId}
                        />
                    );
                })}
            </>
        );
    };

    if (qrListLoading || createNewQrLoading) {
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

    if (qrListError) {
        return (
            <div style={ContainerStyles.spinnerContainer}>
                <Text style={{ color: 'red', marginBottom: '20px' }}>{qrListError}</Text>
                <Button
                    onClick={() => getAllQrs(campaignId)}
                    css={ItemStyles.retryButton}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div style={ContainerStyles.mainContainer}>
            <div style={ContainerStyles.topContainer}>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text css={ItemStyles.pageTitle}>
                        {screenName}
                    </Text>
                    <Text css={ItemStyles.qrArrayLength}>
                        {`(${qrList.length})`}
                    </Text>
                </div>

                <Button
                    onClick={() => createNewQr(campaignId)}
                    css={ItemStyles.newQrButton}
                >
                    <Text>Create New QR Code</Text>
                </Button>
            </div>
            <div style={ContainerStyles.qrCardsContainer}>
                {renderQrCards()}
            </div>

            <DeleteQrModal
                deleteParams={deleteParams}
                campaignId={campaignId}
            />
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    qrListLoading: Selectors.qrGetAllAttempting(state),
    qrListError: Selectors.qrGetAllError(state),
    qrList: Selectors.qrGetAll(state),
    campaignList: Selectors.campaignGetAll(state),
    createNewQrLoading: Selectors.qrCreateNewAttempting(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getAllQrs: (campaignId: string) => dispatch(Actions.getAllQrAttempt({ campaignId })),
    createNewQr: (campaignId: string) => dispatch(Actions.createNewQrAttempt({ campaignId })),
    resetQrDetails: () => dispatch(Actions.getQrDetailsReset()),
    resetUniqueCodes: () => dispatch(Actions.getUniqueCodesReset()),
    resetSurveyData: () => dispatch(Actions.getAllSurveyReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QrScreen);
