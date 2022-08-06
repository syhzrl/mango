import React, { FunctionComponent, useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { css } from 'styled-components';
import { Oval } from 'react-loader-spinner';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { connect } from 'react-redux';

import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';

import Fonts from 'assets/themes/Fonts';
import Colors from 'assets/themes/Colors';
import { AppDispatch, RootState } from 'redux/store';

interface EditModalProps {
    campaignId: string;
    campaignName: string;
    isModalOpen: boolean;
    loading: boolean;
    error: string;
    setModalOpen: (state: boolean) => void;
    editCampaign: (name: string, id: string) => void;
}

const EditModal: FunctionComponent<EditModalProps> = (props: EditModalProps) => {
    const { campaignId, campaignName, isModalOpen, loading, error, setModalOpen, editCampaign } = props;

    const [name, setName] = useState(campaignName);

    useEffect(() => {
        if (!isModalOpen) setName('');
        else setName(campaignName);
    }, [isModalOpen]);

    const saveClickHandler = () => {
        editCampaign(name, campaignId);
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
                    Campaign Name
                </Text>
                <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    css={styles.input}
                    maxLength={100}
                />
                <Text css={styles.error}>
                    {error}
                </Text>
            </div>
        );
    };

    return (
        <Modal isOpen={isModalOpen} centered size='lg' style={{ fontFamily: Fonts.primary }}>
            <ModalHeader>
                Edit Campaign
            </ModalHeader>
            <ModalBody>
                {renderModalBody()}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={saveClickHandler}
                    css={loading ? styles.disabledSubmitButton : styles.submitButton}
                    disabled={loading}
                >
                    Submit
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
    isModalOpen: Selectors.campaignGetIsEditModalOpen(state),
    loading: Selectors.campaignEditCampaignAttempting(state),
    error: Selectors.campaignEditCampaignError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setModalOpen: (state: boolean) => dispatch(Actions.setEditModalOpen(state)),
    editCampaign: (name: string, id: string) => dispatch(Actions.editCampaignAttempt({ name, id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
