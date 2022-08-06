import React, { FunctionComponent } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { css } from 'styled-components';

import Selectors from 'redux/Selectors';
import { RootState } from 'redux/store';
import { connect } from 'react-redux';

import Colors from 'assets/themes/Colors';
import Fonts from 'assets/themes/Fonts';

import Button from 'components/Button';
import Text from 'components/Text';

interface ErrorModalProps {
    updateSurveyError: string;
    updateQuestionError: string;
    updateOptionError: string;
    changeQuestionTypeError: string;
    createOptionError: string;
    deleteImageError: string;
    reorderQuestionError: string;
    deleteQuestionError: string;
    deleteOptionError: string;
}

const ErrorModal: FunctionComponent<ErrorModalProps> = (props: ErrorModalProps) => {
    const {
        updateSurveyError,
        updateQuestionError,
        updateOptionError,
        changeQuestionTypeError,
        createOptionError,
        deleteImageError,
        reorderQuestionError,
        deleteQuestionError,
        deleteOptionError,
    } = props;

    const onRefreshClickHandler = () => {
        window.location.reload();
    };

    return (
        <Modal
            isOpen={
                updateSurveyError !== ''
                || updateQuestionError !== ''
                || updateOptionError !== ''
                || changeQuestionTypeError !== ''
                || createOptionError !== ''
                || deleteImageError !== ''
                || reorderQuestionError !== ''
                || deleteQuestionError !== ''
                || deleteOptionError !== ''
            }
            centered
            size='lg'
            style={{ fontFamily: Fonts.primary }}
        >
            <ModalHeader>
                <Text css={ItemStyles.errorTitle}>
                    Error Occured
                </Text>
            </ModalHeader>
            <ModalBody>
                <Text css={ItemStyles.errorText}>
                    Something went wrong. Please refresh the page
                </Text>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={onRefreshClickHandler}
                    css={ItemStyles.refreshButton}
                >
                    <Text>Refresh</Text>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

const ItemStyles = {
    refreshButton: css`
        background-color: ${Colors.blue.primary};

        color: white;

        border-radius: 5px;

        font-size: 16px;
    `,

    errorTitle: css`
        font-size: 20px;
        font-weight: bold;
    `,

    errorText: css`
        color: ${Colors.red.primary};
    `,
};

const mapStateToProps = (state: RootState) => ({
    updateSurveyError: Selectors.surveyUpdateSurveyError(state),
    updateQuestionError: Selectors.surveyUpdateQuestionError(state),
    updateOptionError: Selectors.surveyUpdateOptionError(state),
    changeQuestionTypeError: Selectors.surveyChangeQuestionTypeError(state),
    createOptionError: Selectors.surveyCreateOptionError(state),
    deleteImageError: Selectors.surveyGetDeleteImageError(state),
    reorderQuestionError: Selectors.surveyReorderQuestionError(state),
    deleteQuestionError: Selectors.surveyDeleteQuestionError(state),
    deleteOptionError: Selectors.surveyDeleteOptionError(state),
});

export default connect(mapStateToProps)(ErrorModal);
