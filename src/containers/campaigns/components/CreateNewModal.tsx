import React, { FunctionComponent, useState } from 'react';
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

interface CreateNewModalProps {
    isModalOpen: boolean;
    loading: boolean;
    error: string;
    setCreateModalOpen: (state: boolean) => void;
    createNewCampaign: (name: string) => void;
}

const CreateNewModal: FunctionComponent<CreateNewModalProps> = (props: CreateNewModalProps) => {
    const { isModalOpen, loading, error, setCreateModalOpen, createNewCampaign } = props;
    const [campaignName, setCampaignName] = useState('');

    const saveClickHandler = () => {
        createNewCampaign(campaignName);
    };

    const cancelClickHandler = () => {
        setCampaignName('');
        setCreateModalOpen(false);
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
                    value={campaignName}
                    onChange={e => setCampaignName(e.target.value)}
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
                Create New Campaign
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
    isModalOpen: Selectors.campaignGetIsCreateModalOpen(state),
    loading: Selectors.campaignCreateNewAttempting(state),
    error: Selectors.campaignCreateNewError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setCreateModalOpen: (state: boolean) => dispatch(Actions.setCreateModalOpen(state)),
    createNewCampaign: (name: string) => dispatch(Actions.createNewCampaignAttempt({ name })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewModal);
