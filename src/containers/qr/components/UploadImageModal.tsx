import React, { FunctionComponent, useState, useEffect, SyntheticEvent, useRef } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { css } from 'styled-components';
import SVG from 'react-inlinesvg';
import { create } from 'apisauce';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import { UploadImageParams } from 'entities/survey';

import Config from 'config';

import icons from 'assets/icons';
import Colors from 'assets/themes/Colors';
import Fonts from 'assets/themes/Fonts';

import Text from 'components/Text';
import Button from 'components/Button';
import UploadField from 'components/UploadField';

import Grid from './questionBody/Grid';

interface UploadImageModalProps {
    authToken: string;
    isModalOpen: boolean;
    uploadParams: UploadImageParams;
    deleteImageLoading: boolean;
    deleteImageError: string;
    setModalOpen: (state: boolean) => void;
    setImageUrls: (questionId: string, surveyId: string, urls: string[]) => void;
    deleteImage: (questionId: string, surveyId: string, url: string[]) => void;
}

const UploadImageModal: FunctionComponent<UploadImageModalProps> = (props: UploadImageModalProps) => {
    const {
        authToken,
        isModalOpen,
        uploadParams,
        setModalOpen,
        setImageUrls,
        deleteImageLoading,
        deleteImageError,
        deleteImage,
    } = props;

    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [fileName, setFileName] = useState<string[]>([]);
    const [fileUrls, setFileUrls] = useState<string[]>([]);

    const { questionId, surveyId } = uploadParams;

    const fileInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            setFileUrls([]);
            setFileName([]);
        };
    }, []);

    const uploadImage = (file: File) => {
        setUploading(true);
        setUploadError('');

        const endpoint = `${Config.baseUrl}/surveys/addImage`;

        const formData = new FormData();
        formData.append('surveyId', surveyId);
        formData.append('questionId', questionId);
        formData.append('image', file);

        const api = create({
            baseURL: endpoint,
            headers: {
                Authorization: `Bearer ${authToken}`,
                'content-type': 'multipart/form-data',
            },
        });

        api.post(endpoint, formData).then(response => {
            const testUrl = response.data as string;
            setFileUrls(prev => [...prev, testUrl]);
            setUploading(false);
        }).catch((error: any) => {
            console.log('error', error);
            setUploading(false);
            setUploadError(error.message);
        });
    };

    const uploadImageHandler = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        if (target.files) {
            if (target.files.length > 4) {
                toast.error('Maximum 4 images allowed');
                return;
            }

            for (let i = 0; i < target.files.length; i += 1) {
                const img = target.files[i];

                setFileName(prev => [...prev, img.name]);

                uploadImage(img);
            }
        }
    };

    const ChooseFileClickHandler = () => {
        if (fileInput.current) {
            fileInput.current.value = ''; // to make sure uploadCSVHandler fires on every file upload even if its the same file
            fileInput.current.click();
        }
    };

    const confirmClickHandler = () => {
        console.log(fileUrls);
        setImageUrls(questionId, surveyId, fileUrls);
        setModalOpen(false);
    };

    const cancelClickHandler = () => {
        if (fileUrls.length) {
            deleteImage(questionId, surveyId, fileUrls);
        }

        setModalOpen(false);
    };

    const gridDeleteImageHandler = (imageUrl: string) => {
        deleteImage(questionId, surveyId, [imageUrl]);

        setFileUrls(prev => {
            return prev.filter(item => ![imageUrl].includes(item));
        });
    };

    const renderModalBody = () => {
        if (uploading || deleteImageLoading) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Oval
                        height={150}
                        width={150}
                        color='#1998dd'
                        secondaryColor='#A5AAB5'
                    />
                </div>
            );
        }

        if (uploadError || deleteImageError) {
            return (
                <Text>
                    {uploadError || deleteImageError}
                </Text>
            );
        }

        return (
            <>
                <UploadField
                    onClick={ChooseFileClickHandler}
                    onChange={uploadImageHandler}
                    reference={fileInput}
                    fileName={fileName.join(', ')}
                    accept='.jpg, .png, .jpeg'
                    multiple
                />

                {fileUrls.length > 0 && (
                    <Grid>
                        {fileUrls.map(item => {
                            return (
                                <div style={{ position: 'relative' }} key={item}>
                                    <Button
                                        onClick={() => gridDeleteImageHandler(item)}
                                        css={ItemStyles.deleteButton}
                                    >
                                        <SVG src={icons.Trash} id='trash' />
                                    </Button>
                                    <img
                                        key={item}
                                        src={item}
                                        alt='no img'
                                        id='img'
                                    />
                                </div>
                            );
                        })}
                    </Grid>
                )}
            </>
        );
    };

    return (
        <Modal isOpen={isModalOpen} centered size='lg' style={{ fontFamily: Fonts.primary }}>
            <ModalHeader>
                <Text>Upload Images</Text>
            </ModalHeader>
            <ModalBody>
                {renderModalBody()}
            </ModalBody>
            <ModalFooter>
                <Button onClick={confirmClickHandler} css={ItemStyles.confirmButton} disabled={fileUrls.length === 0}>
                    Confirm
                </Button>
                <Button onClick={cancelClickHandler} css={ItemStyles.cancelButton}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

const ItemStyles = {
    deleteButton: css`
        width: fit-content;
        height: fit-content;

        background-color: transparent;

        position: absolute;
        top: 0;
        right: 0;

        margin-top: 10px;
        margin-right: 5px;

        color: #A5AAB5;

        &:hover {
            color: ${Colors.red.primary};
        }

        #trash {
            height: 30px;
            width: 30px;
        }
    `,
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
    uploadParams: Selectors.surveyGetUploadImageParams(state),
    isModalOpen: Selectors.surveyIsUploadImageModalOpen(state),
    authToken: Selectors.authGetAuthToken(state),
    deleteImageLoading: Selectors.surveyGetDeleteImageAttempting(state),
    deleteImageError: Selectors.surveyGetDeleteImageError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setModalOpen: (state: boolean) => dispatch(Actions.setUploadImageModalOpen(state)),
    setImageUrls: (questionId: string, surveyId: string, urls: string[]) => dispatch(Actions.setImageUrls({ questionId, surveyId, urls })),
    deleteImage: (questionId: string, surveyId: string, url: string[]) => dispatch(Actions.deleteImageAttempt({ questionId, surveyId, url })),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageModal);
