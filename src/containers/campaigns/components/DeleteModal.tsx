import React, { FunctionComponent, useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { css } from 'styled-components';
import { Oval } from 'react-loader-spinner';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';

import Text from 'components/Text';
import Button from 'components/Button';

import Fonts from 'assets/themes/Fonts';
import Colors from 'assets/themes/Colors';

import { ICampaign } from 'entities/campaign';

import CampaignCard from './CampaignCard';

interface DeleteModalProps {
    cardData: ICampaign;
    isModalOpen: boolean;
    loading: boolean;
    error: string;
    setModalOpen: (state: boolean) => void;
    deleteCampaign: (id: string) => void;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = (props: DeleteModalProps) => {
    const { cardData, isModalOpen, loading, error, setModalOpen, deleteCampaign } = props;

    const { id, name, status, createdAt, numberOfScans } = cardData;

    const confirmClickHandler = () => {
        deleteCampaign(id);
    };

    const cancelClickHandler = () => {
        setModalOpen(false);
    };

    const renderModalBody = () => {
        if (loading) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Oval
                        height={50}
                        width={50}
                        color='#1998dd'
                        secondaryColor='#A5AAB5'
                    />
                </div>
            );
        }

        return (
            <div>
                <Text css={styles.label}>
                    Are you sure you want to delete this campaign?
                </Text>
                <div
                    style={{
                        border: '1px solid rgb(0,0,0,0.3)',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '5px',
                    }}
                >

                    <CampaignCard
                        campaignId={id}
                        title={name}
                        createdAt={createdAt}
                        numberOfScans={numberOfScans}
                        status={status}
                        disabled
                    />

                </div>
                <Text css={styles.error}>
                    {error}
                </Text>
            </div>
        );
    };

    return (
        <Modal isOpen={isModalOpen} toggle={() => setModalOpen(!isModalOpen)} centered size='lg' style={{ fontFamily: Fonts.primary }}>
            <ModalHeader>
                Delete Campaign
            </ModalHeader>
            <ModalBody>
                {renderModalBody()}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={confirmClickHandler}
                    css={loading ? styles.disabledSubmitButton : styles.submitButton}
                    disabled={loading}
                >
                    Confirm
                </Button>
                <Button
                    onClick={cancelClickHandler}
                    css={loading ? styles.disabledCancelButton : styles.cancelButton}
                    disabled={loading}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

const styles = {
    label: css`
        margin-bottom: 10px;
    `,
    error: css`
        color: ${Colors.red.primary};
        margin-top: 20px;
    `,
    input: css`
        border: 0.5px solid rgb(0,0,0,0.3);
    `,
    submitButton: css`
        background-color: ${Colors.blue.primary};
        color: white;
        font-size: 18px;
        border-radius: 10px;

        &:hover {
            background-color: ${Colors.blue.secondary};
        }
    `,
    disabledSubmitButton: css`
        background-color: ${Colors.blue.primary};
        opacity: 50%;
        color: white;
        font-size: 18px;
        border-radius: 10px;
    `,
    cancelButton: css`
        background-color: ${Colors.red.primary};
        color: white;
        font-size: 18px;
        border-radius: 10px;

        &:hover {
            background-color: ${Colors.red.secondary};
        }
    `,
    disabledCancelButton: css`
        background-color: ${Colors.red.primary};
        opacity: 50%;
        color: white;
        font-size: 18px;
        border-radius: 10px;
    `,
};

const mapStateToProps = (state: RootState) => ({
    isModalOpen: Selectors.campaignGetIsDeleteModalOpen(state),
    loading: Selectors.campaignDeleteCampaignAttempting(state),
    error: Selectors.campaignDeleteCampaignError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setModalOpen: (state: boolean) => dispatch(Actions.setDeleteModalOpen(state)),
    deleteCampaign: (id: string) => dispatch(Actions.deleteCampaignAttempt({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
