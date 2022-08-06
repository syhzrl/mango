import React, { FunctionComponent } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Oval } from 'react-loader-spinner';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import Fonts from 'assets/themes/Fonts';

import { IEnableSurvey, IEnableSurveyParams } from 'entities/survey';

import Button from 'components/Button';
import Text from 'components/Text';

import { ContainerStyles, ItemStyles } from './styles/SurveyCardStyles';

interface EnableSurveyModalProps {
    enableSurveyLoading: boolean;
    enableSurveyError: string;

    enableSurveyModalOpen: boolean;

    enableSurveyPayload: IEnableSurveyParams;

    setEnableSurveyModalOpen: (state: boolean) => void;
    enableSurvey: (params: IEnableSurvey) => void;
    setSurveyEditing: (surveyId: string, state: boolean) => void;
}

const EnableSurveyModal: FunctionComponent<EnableSurveyModalProps> = (props: EnableSurveyModalProps) => {
    const {
        enableSurveyLoading,
        enableSurveyError,
        enableSurveyModalOpen,
        setEnableSurveyModalOpen,
        enableSurvey,
        enableSurveyPayload,
        setSurveyEditing,
    } = props;

    const { isFinalized, ...restOfParams } = enableSurveyPayload;

    const confirmClickHandler = () => {
        enableSurvey(restOfParams);
        setSurveyEditing(restOfParams.id, false); // set editing to false when user activates a survey
    };

    const renderConfirmationModalBody = () => {
        if (enableSurveyLoading) {
            return (
                <div style={ContainerStyles.spinnerContainer}>
                    <Oval
                        height={50}
                        width={50}
                        color='#1998dd'
                        secondaryColor='#A5AAB5'
                    />
                </div>
            );
        }

        if (enableSurveyError) {
            return (
                <Text css={ItemStyles.enableSurveyError}>
                    {enableSurveyError}
                </Text>
            );
        }

        if (!isFinalized) {
            return (
                <>
                    <Text>Are you sure you want to activate this survey?</Text>
                    <Text>Once activated all the other survey will be deactivated</Text>
                    <Text>You may no longer edit the survey questions of this survey once activated</Text>
                </>
            );
        }

        return (
            <Text>Are you sure you want to activate this survey?</Text>
        );
    };

    return (
        <Modal isOpen={enableSurveyModalOpen} style={{ fontFamily: Fonts.primary }}>
            <ModalHeader>Activate Survey</ModalHeader>
            <ModalBody>
                {renderConfirmationModalBody()}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={confirmClickHandler}
                    css={ItemStyles.modalConfirmButton}
                    disabled={enableSurveyLoading}
                >
                    <Text>Confirm</Text>
                </Button>
                <Button
                    onClick={() => setEnableSurveyModalOpen(false)}
                    css={ItemStyles.modalCancelButton}
                    disabled={enableSurveyLoading}
                >
                    <Text>Cancel</Text>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

const mapStateToProps = (state: RootState) => ({
    enableSurveyLoading: Selectors.surveyEnableSurveyAttempting(state),
    enableSurveyError: Selectors.surveyEnableSurveyError(state),
    enableSurveyModalOpen: Selectors.surveyIsEnableSurveyModalOpen(state),
    enableSurveyPayload: Selectors.surveyGetEnableSurveyParams(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setEnableSurveyModalOpen: (state: boolean) => dispatch(Actions.setEnableSurveyModalOpen(state)),
    enableSurvey: (params: IEnableSurvey) => dispatch(Actions.enableSurveyAttempt(params)),
    setSurveyEditing: (surveyId: string, state: boolean) => dispatch(Actions.setSurveyCardEditing({ surveyId, isEditing: state })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnableSurveyModal);
