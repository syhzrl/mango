import React, { FunctionComponent } from 'react';
import { css } from 'styled-components';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Oval } from 'react-loader-spinner';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';

import { IDeleteSurvey, ISurveyTypeEnum } from 'entities/survey';

import Colors from 'assets/themes/Colors';
import Fonts from 'assets/themes/Fonts';

import Button from 'components/Button';
import Text from 'components/Text';

interface DeleteSurveyModalProps {
    isDeleteModalOpen: boolean;
    setDeleteSurveyModalOpen: (state: boolean) => void;
    deleteSurveyLoading: boolean;
    deleteSurveyError: string;
    deleteSurvey: (params: IDeleteSurvey) => void;
    deleteSurveyParams: IDeleteSurvey;
}

const DeleteSurveyModal: FunctionComponent<DeleteSurveyModalProps> = (props: DeleteSurveyModalProps) => {
    const {
        isDeleteModalOpen,
        setDeleteSurveyModalOpen,
        deleteSurveyLoading,
        deleteSurveyError,
        deleteSurvey,
        deleteSurveyParams,
    } = props;

    const renderModalBody = () => {
        if (deleteSurveyLoading) {
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
                    <Text>Are you sure you want to delete this?</Text>
                </div>
                <Text style={{ color: Colors.red.primary }}>{deleteSurveyError}</Text>
            </>
        );
    };

    return (
        <Modal isOpen={isDeleteModalOpen} toggle={() => setDeleteSurveyModalOpen(!isDeleteModalOpen)} centered style={{ fontFamily: Fonts.primary }}>
            <ModalHeader>Delete QR Code</ModalHeader>
            <ModalBody>
                {renderModalBody()}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => deleteSurvey(deleteSurveyParams)}
                    css={styles.confirmButton}
                >
                    <Text>Confirm</Text>
                </Button>
                <Button
                    onClick={() => setDeleteSurveyModalOpen(false)}
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

        border-radius: 5px;

        &:hover {
            background-color: ${Colors.blue.secondary};
        }
    `,

    cancelButton: css`
        background-color: ${Colors.red.primary};
        font-size: 18px;
        color: white;

        border-radius: 5px;

        &:hover {
            background-color: ${Colors.red.secondary};
        }
    `,
};

const mapStateToProps = (state: RootState) => ({
    isDeleteModalOpen: Selectors.surveyIsDeleteSurveyModalOpen(state),
    deleteSurveyLoading: Selectors.surveyDeleteSurveyAttempting(state),
    deleteSurveyError: Selectors.surveyDeleteSurveyError(state),
    deleteSurveyParams: Selectors.surveyGetDeleteSurveyParams(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setDeleteSurveyModalOpen: (state: boolean) => dispatch(Actions.setDeleteSurveyModalOpen(state)),
    deleteSurvey: (params: IDeleteSurvey) => dispatch(Actions.deleteSurveyAttempt(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSurveyModal);
