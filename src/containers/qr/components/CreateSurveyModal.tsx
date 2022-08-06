import React, { FunctionComponent, useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { css } from 'styled-components';
import { Oval } from 'react-loader-spinner';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';

import { ICreateSurvey, ISurveyTypeEnum } from 'entities/survey';

import Fonts from 'assets/themes/Fonts';
import Colors from 'assets/themes/Colors';

import Button from 'components/Button';
import Text from 'components/Text';
import Input from 'components/Input';
import TextArea from 'components/TextArea';

interface CreateSurveyModalProps {
    qrId: string;
    surveyType: ISurveyTypeEnum;
    createSurveyLoading: boolean;
    createSurveyError: string;
    createSurvey: (data: ICreateSurvey) => void;
    isCreateSurveyModalOpen: boolean;
    setCreateSurveyModalOpen: (state: boolean) => void;
}

const CreateSurveyModal: FunctionComponent<CreateSurveyModalProps> = (props: CreateSurveyModalProps) => {
    const { qrId, surveyType, createSurveyLoading, createSurveyError, createSurvey, isCreateSurveyModalOpen, setCreateSurveyModalOpen } = props;

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        setTitle('');
        setDesc('');
    }, [isCreateSurveyModalOpen]);

    const confirmClickHandler = () => {
        const dataToSubmit = {
            qrId,
            type: surveyType,
            nameEn: title,
            descriptionEn: desc,
        };

        createSurvey(dataToSubmit);
    };

    const renderModalBody = () => {
        if (createSurveyLoading) {
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
                <div style={{ marginBottom: '20px' }}>
                    <Text css={ItemStyles.label}>
                        Survey Title
                    </Text>
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        css={ItemStyles.inputField}
                        maxLength={100}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <Text css={ItemStyles.label}>
                        Survey Desc
                    </Text>
                    <TextArea
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        css={ItemStyles.inputField}
                        maxLength={2000}
                    />
                </div>

                <Text style={{ color: Colors.red.primary }}>{createSurveyError}</Text>
            </>
        );
    };

    return (
        <Modal isOpen={isCreateSurveyModalOpen} centered size='lg' style={{ fontFamily: Fonts.primary }}>
            <ModalHeader>
                <Text css={ItemStyles.modalHeader}>Create New Survey</Text>
            </ModalHeader>
            <ModalBody>
                {renderModalBody()}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={confirmClickHandler}
                    css={ItemStyles.confirmButton}
                >
                    <Text>Confirm</Text>
                </Button>

                <Button
                    onClick={() => setCreateSurveyModalOpen(false)}
                    css={ItemStyles.cancelButton}
                >
                    <Text>Cancel</Text>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

const ItemStyles = {
    modalHeader: css`
        font-weight: bold;
        font-size: 28px;
    `,
    label: css`
        font-size: 18px;
        margin-bottom: 10px;
    `,
    inputField: css`
        border: 1px solid rgb(0,0,0,0.2);
    `,

    confirmButton: css`
        background-color: ${Colors.blue.primary};
        color: white;

        font-size: 18px;

        border-radius: 5px;

        transition: background-color ease 0.3s;

        &:hover {
            background-color: ${Colors.blue.secondary};
        }
    `,
    cancelButton: css`
        background-color: ${Colors.red.primary};
        color: white;

        font-size: 18px;

        border-radius: 5px;

        transition: background-color ease 0.3s;

        &:hover {
            background-color: ${Colors.red.secondary};
        }
    `,
};

const mapStateToProps = (state: RootState) => ({
    createSurveyLoading: Selectors.surveyCreateNewSurveyAttempting(state),
    createSurveyError: Selectors.surveyCreateNewSurveyError(state),
    isCreateSurveyModalOpen: Selectors.surveyIsCreateNewSurveyModalOpen(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    createSurvey: (data: ICreateSurvey) => dispatch(Actions.createNewSurveyAttempt(data)),
    setCreateSurveyModalOpen: (state: boolean) => dispatch(Actions.setCreateNewSurveyModalOpen(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurveyModal);
