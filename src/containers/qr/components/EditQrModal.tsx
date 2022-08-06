import React, { FunctionComponent } from 'react';
import { css } from 'styled-components';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Oval } from 'react-loader-spinner';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { connect } from 'react-redux';
import { RootState, AppDispatch } from 'redux/store';

import { IUpdateQr } from 'entities/qr';

import NavActions from 'lib/NavActions';

import Fonts from 'assets/themes/Fonts';
import Colors from 'assets/themes/Colors';

import Text from 'components/Text';
import Button from 'components/Button';

interface EditQrModalProps {
    isUpdateQrModalOpen: boolean;
    setUpdateQrModalOpen: (state: boolean) => void;
    qrData: IUpdateQr | null;
    updateQrLoading: boolean;
    updateQrError: string;
    updateQr: (data: IUpdateQr) => void;
}

const EditQrModal: FunctionComponent<EditQrModalProps> = (props: EditQrModalProps) => {
    const { isUpdateQrModalOpen, setUpdateQrModalOpen, qrData, updateQrLoading, updateQrError, updateQr } = props;

    const confirmClickHandler = () => {
        NavActions.navBack();
        setUpdateQrModalOpen(false);
    };

    const renderModalBody = () => {
        if (updateQrLoading) {
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
                <Text>You have unsaved changes to this QR.</Text>
                <Text>Are you sure you want to leave this page?</Text>
            </>
        );
    };

    return (
        <Modal isOpen={isUpdateQrModalOpen} centered style={{ fontFamily: Fonts.primary }}>
            <ModalHeader>
                <Text style={{ fontWeight: 'bold' }}>Edit QR Code</Text>
            </ModalHeader>
            <ModalBody>
                {renderModalBody()}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={confirmClickHandler}
                    css={styles.confirmButton}
                >
                    <Text>Confirm</Text>
                </Button>
                <Button
                    onClick={() => setUpdateQrModalOpen(false)}
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
    isUpdateQrModalOpen: Selectors.qrGetIsUpdateModalOpen(state),
    updateQrLoading: Selectors.qrUpdateQrAttempting(state),
    updateQrError: Selectors.qrUpdateQrError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setUpdateQrModalOpen: (state: boolean) => dispatch(Actions.setUpdateQrModalOpen(state)),
    updateQr: (data: IUpdateQr) => dispatch(Actions.updateQrAttempt(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQrModal);
