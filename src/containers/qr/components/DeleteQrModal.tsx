import React, { FunctionComponent } from 'react';
import { css } from 'styled-components';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Oval } from 'react-loader-spinner';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';

import Colors from 'assets/themes/Colors';
import Fonts from 'assets/themes/Fonts';

import Button from 'components/Button';
import Text from 'components/Text';

interface DeleteQrModalProps {
    isDeleteModalOpen: boolean;
    setDeleteQrModalOpen: (state: boolean) => void;
    deleteQrLoading: boolean;
    deleteQrError: string;
    deleteQr: (qrId: string, campaignId: string) => void;
    deleteParams: { name: string, id: string };
    campaignId: string;
}

const DeleteQrModal: FunctionComponent<DeleteQrModalProps> = (props: DeleteQrModalProps) => {
    const { isDeleteModalOpen, setDeleteQrModalOpen, deleteQrLoading, deleteQrError, deleteQr, deleteParams, campaignId } = props;
    const { name, id } = deleteParams;

    const renderModalBody = () => {
        if (deleteQrLoading) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            <>
                <div style={{ display: 'flex' }}>
                    <Text>Are you sure you want to delete</Text>
                    <Text style={{ marginLeft: '5px', fontWeight: 'bold' }}>{name}</Text>
                    <Text style={{ marginLeft: '5px' }}>?</Text>
                </div>
                <Text style={{ color: Colors.red.primary }}>{deleteQrError}</Text>
            </>
        );
    };

    return (
        <Modal isOpen={isDeleteModalOpen} toggle={() => setDeleteQrModalOpen(!isDeleteModalOpen)} centered style={{ fontFamily: Fonts.primary }}>
            <ModalHeader>Delete QR Code</ModalHeader>
            <ModalBody>
                {renderModalBody()}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => deleteQr(id, campaignId)}
                    css={styles.confirmButton}
                >
                    <Text>Confirm</Text>
                </Button>
                <Button
                    onClick={() => setDeleteQrModalOpen(false)}
                    css={styles.cancelButton}
                >
                    <Text>Cancel</Text>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

const styles = {
    confirmButton: css`
        background-color: ${Colors.blue.primary};
        font-size: 18px;
        color: white;

        &:hover {
            background-color: ${Colors.blue.secondary};
        }
    `,

    cancelButton: css`
        background-color: ${Colors.red.primary};
        font-size: 18px;
        color: white;

        &:hover {
            background-color: ${Colors.red.secondary};
        }
    `,
};

const mapStateToProps = (state: RootState) => ({
    isDeleteModalOpen: Selectors.qrGetIsDeleteModalOpen(state),
    deleteQrLoading: Selectors.qrDeleteQrAttempting(state),
    deleteQrError: Selectors.qrDeleteQrError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setDeleteQrModalOpen: (state: boolean) => dispatch(Actions.setDeleteQrModalOpen(state)),
    deleteQr: (qrId: string, campaignId: string) => dispatch(Actions.deleteQrAttempt({ qrId, campaignId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteQrModal);
