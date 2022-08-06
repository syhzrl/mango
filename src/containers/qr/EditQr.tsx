import React, { FunctionComponent, useState, useEffect, useRef, SyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { Oval } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import FileSaver from 'file-saver';
import Papa from 'papaparse';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { connect } from 'react-redux';
import { RootState, AppDispatch } from 'redux/store';

import NavActions from 'lib/NavActions';
import { IQrDetails, IUpdateQr, IUniqueCode, UploadUniqueCode } from 'entities/qr';
import { ISurvey, ISurveySelector, ISurveyTypeEnum } from 'entities/survey';

import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import Toggle from 'components/Toggle';
import UploadField from 'components/UploadField';

import icons from 'assets/icons';
import Colors from 'assets/themes/Colors';
import uniqueCodesCSV from 'assets/documents/uniqueCodes.csv';

import { NavToEditQrParams } from 'lib/NavActionsParams';

import { ContainerStyles, ItemStyles } from './styles/EditQrStyles';

import StatusToggle from './components/StatusToggle';
import EditQrModal from './components/EditQrModal';
import SurveyCard from './components/SurveyCard';
import CreateSurveyModal from './components/CreateSurveyModal';
import EnableSurveyModal from './components/EnableSurveyModal';
import DeleteSurveyModal from './components/DeleteSurveyModal';
import ErrorModal from './components/ErrorModal';
import UploadImageModal from './components/UploadImageModal';

interface EditQrScreenProps {
    // Datas
    uniqueCodesList: IUniqueCode[];
    qrDetails: IQrDetails | null;
    surveySelector: ISurveySelector | null;
    selectedSurveyType: ISurveyTypeEnum;

    // Loadings
    getQrDetailsLoading: boolean;
    uniqueCodesLoading: boolean;
    surveySelectorLoading: boolean;
    updateQrLoading: boolean;
    uploadUniqueCodesLoading: boolean;

    // Errors
    getQrDetailsError: string;
    uniqueCodesError: string;
    surveySelectorError: string;
    updateQrError: string;
    uploadUniqueCodesError: string;

    // Dispatchs
    getQrDetails: (qrId: string) => void;
    updateQr: (data: IUpdateQr) => void;
    setUpdateQrModalOpen: (state: boolean) => void;
    getUniqueCodes: (qrId: string) => void;
    setSelectedSurveyType: (type: ISurveyTypeEnum) => void;
    getAllSurveys: (qrId: string, surveyType: ISurveyTypeEnum) => void;
    setCreateSurveyModalOpen: (state: boolean) => void;
    uploadUniqueCodes: (qrId: string, uniqueCodes: string[]) => void;
    replaceUniqueCodes: (qrId: string, uniqueCodes: string[]) => void
}

const EditQrScreen: FunctionComponent<EditQrScreenProps> = (props: EditQrScreenProps) => {
    const {
        // Datas
        uniqueCodesList,
        qrDetails,
        surveySelector,
        selectedSurveyType,

        // Loadings
        getQrDetailsLoading,
        uniqueCodesLoading,
        surveySelectorLoading,
        updateQrLoading,
        uploadUniqueCodesLoading,

        // Errors
        getQrDetailsError,
        uniqueCodesError,
        surveySelectorError,
        updateQrError,
        uploadUniqueCodesError,

        // Dispatchs
        getQrDetails,
        updateQr,
        setUpdateQrModalOpen,
        getUniqueCodes,
        setSelectedSurveyType,
        getAllSurveys,
        setCreateSurveyModalOpen,
        uploadUniqueCodes,
        replaceUniqueCodes,
    } = props;

    const [qrName, setQrName] = useState('');
    const [qrStatus, setQrStatus] = useState(0);
    const [stateQrType, setStateQrType] = useState(0);
    const [fileName, setFileName] = useState('');
    const [uniqueCodes, setUniqueCodes] = useState<Array<string>>([]);
    const [uniqueCodesParsingError, setUniqueCodesParsingError] = useState('');
    const [qrData, setQrData] = useState<IUpdateQr | null>(null);
    const [unsavedChangesAlert, setUnsavedChangesAlert] = useState('');
    const [csvData, setCsvData] = useState('');
    const [stateHasUniqueCodes, setStateHasUniqueCodes] = useState(false);
    const [uploadFieldLabel, setUploadFieldLabel] = useState('Upload Unique Codes CSV');
    const [surveyListData, setSurveyListData] = useState<ISurvey[]>([]);

    const fileInput = useRef<HTMLInputElement>(null);

    const param = useParams();
    const { qrId = '' } = param;

    useEffect(() => {
        getQrDetails(qrId);
    }, []);

    useEffect(() => {
        if (qrDetails) {
            const { name, qrType, status, hasUniqueCodes } = qrDetails;

            setQrName(name);
            setQrStatus(status);
            setStateQrType(qrType);
            setStateHasUniqueCodes(hasUniqueCodes);

            if (qrType === 1 && hasUniqueCodes) {
                setUploadFieldLabel('Replace Unique Codes CSV');
                getUniqueCodes(qrId);
            }

            switch (qrType) {
                case 0: setSelectedSurveyType(1); break;
                case 1: setSelectedSurveyType(2); break;
                default:
            }
        }
    }, [qrDetails]);

    useEffect(() => {
        if (qrDetails) {
            if (selectedSurveyType === 1) {
                getAllSurveys(qrId, selectedSurveyType);
            }

            if (selectedSurveyType === 2 && !surveySelector?.trialist.length) {
                getAllSurveys(qrId, selectedSurveyType);
            }

            if (selectedSurveyType === 3 && !surveySelector?.repeated.length) {
                getAllSurveys(qrId, selectedSurveyType);
            }
        }
    }, [selectedSurveyType, stateQrType, qrDetails]);

    useEffect(() => {
        if (surveySelector) {
            switch (selectedSurveyType) {
                case ISurveyTypeEnum.Standard: setSurveyListData(surveySelector.standard); break;
                case ISurveyTypeEnum.Trialist: setSurveyListData(surveySelector.trialist); break;
                case ISurveyTypeEnum.RepeatedBuyer: setSurveyListData(surveySelector.repeated); break;
                default:
            }
        }
    }, [surveySelector, selectedSurveyType]);

    useEffect(() => {
        if (uniqueCodesList.length) {
            const parsedUniqueCodesList = uniqueCodesList.map(item => {
                const { code, isUsed } = item;

                return { UniqueCode: code, isUsed };
            });

            const unparsedUniqueCodes = Papa.unparse(parsedUniqueCodesList); // array of object or array of arrays

            setCsvData(unparsedUniqueCodes);
        }
    }, [uniqueCodesList.length]);

    useEffect(() => {
        if (qrDetails) {
            const { name, qrType, status } = qrDetails;

            if (qrName !== name || stateQrType !== qrType || qrStatus !== status) {
                setUnsavedChangesAlert('You have unsaved changes!');
            } else setUnsavedChangesAlert('');
        }

        setQrData({
            qrId,
            name: qrName,
            qrType: stateQrType,
            status: qrStatus,
        });
    }, [qrName, stateQrType, qrStatus, uniqueCodes]);

    useEffect(() => {
        setFileName('');
        setUniqueCodesParsingError('');
        setUniqueCodes([]);
    }, [stateQrType]);

    useEffect(() => {
        if (updateQrError === 'Please enable at least one survey to activate this QR') {
            setQrStatus(1);
        }
    }, [updateQrError]);

    const answeredOnceHandler = () => {
        setStateQrType(0);
        setSelectedSurveyType(ISurveyTypeEnum.Standard);
    };

    const answeredMultipleHandler = () => {
        setStateQrType(1);
        setSelectedSurveyType(ISurveyTypeEnum.Trialist);
    };

    const uploadCSVHandler = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        if (target.files) {
            const [file] = target.files;
            const { name } = file;

            setFileName('');

            Papa.parse<UploadUniqueCode>(file, {
                header: true,
                complete: results => {
                    const { data } = results || [];

                    data.pop(); // papaparse always returns an extra empty element in array, hence we pop it

                    let emptyLineError = '';
                    const emptyLineIndexes: Array<string> = [];

                    data.forEach((item, index) => {
                        const { UniqueCode } = item;
                        if (!UniqueCode) {
                            emptyLineIndexes.push((index + 2).toString());
                        }
                    });

                    if (emptyLineIndexes.length) {
                        emptyLineError = `Line ${emptyLineIndexes.join(', ')} is empty! `;

                        setUniqueCodesParsingError(emptyLineError);
                    }

                    if (!emptyLineError.length) {
                        const parsedCSVData = data.map(item => {
                            const { UniqueCode } = item;
                            return UniqueCode;
                        });

                        setUniqueCodesParsingError('');
                        setFileName(name);
                        setUniqueCodes(parsedCSVData);
                        if (stateHasUniqueCodes) {
                            replaceUniqueCodes(qrId, parsedCSVData);
                        } else {
                            uploadUniqueCodes(qrId, parsedCSVData);
                        }
                    }
                },
            });
        }
    };

    const ChooseFileClickHandler = () => {
        if (fileInput.current) {
            fileInput.current.value = ''; // to make sure uploadCSVHandler fires on every file upload even if its the same file
            fileInput.current.click();
        }
    };

    const downloadUniqueCodesTemplate = () => {
        FileSaver.saveAs(uniqueCodesCSV, 'Unique Codes Template.csv');
    };

    const downloadUniqueCodes = () => {
        const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        FileSaver.saveAs(csvBlob, 'Unique Codes.csv');
    };

    const saveChangesHandler = () => {
        let validationError = '';

        if (!qrName || !qrName.trim().length) {
            validationError = 'Fill in all the inputs!';
            toast.error(validationError);
        }

        if (!validationError.length) {
            if (qrData) {
                updateQr(qrData);
                setUnsavedChangesAlert('');
            }
        }
    };

    const onBackClickHandler = () => {
        if (unsavedChangesAlert) setUpdateQrModalOpen(true);
        else {
            NavActions.navBack();
            setSelectedSurveyType(ISurveyTypeEnum.Reset);
        }
    };

    const renderUniqueCodesAttachedButtonBody = () => {
        if (uniqueCodesLoading) {
            return (
                <Oval
                    height={30}
                    width={30}
                    color='#1998dd'
                    secondaryColor='#A5AAB5'
                />
            );
        }

        if (uniqueCodesError || uploadUniqueCodesError) {
            return (
                <Text style={{ color: Colors.red.primary }}>
                    {uniqueCodesError || uploadUniqueCodesError}
                </Text>
            );
        }

        return (
            <>
                <Text css={ItemStyles.templateFile}>
                    Unique Codes Attached
                </Text>
                <Text css={ItemStyles.downloadCSV}>
                    View here
                </Text>
            </>
        );
    };

    const renderSurveyCards = () => {
        if (surveySelectorLoading) {
            return (
                <div style={{ width: '100%' }}>
                    <Skeleton count={4} height={50} />
                </div>
            );
        }

        if (surveySelectorError) {
            return (
                <Text css={ItemStyles.surveyListError}>
                    {surveySelectorError}
                </Text>
            );
        }

        if (!surveyListData.length) {
            return (
                <Text>No Surveys Created!</Text>
            );
        }

        return (
            <>
                {surveyListData.map((item, index) => {
                    const {
                        id,
                        nameEn,
                        nameMs,
                        nameZh,
                        isActive,
                        descriptionEn,
                        descriptionMs,
                        descriptionZh,
                        isFinalized,
                        questions,
                        isOpen,
                        selectedLang,
                        isEditing,
                        updatedAt,
                    } = item;

                    return (
                        <SurveyCard
                            surveyId={id}
                            surveyType={selectedSurveyType}
                            qrId={qrId}
                            key={nameEn + Math.random()}
                            nameEn={nameEn}
                            nameMs={nameMs}
                            nameZh={nameZh}
                            isActive={isActive}
                            isFinalized={isFinalized}
                            descriptionEn={descriptionEn}
                            descriptionMs={descriptionMs}
                            descriptionZh={descriptionZh}
                            questions={questions}
                            surveyIndex={index}
                            isCardOpen={isOpen}
                            isCardEditing={isEditing}
                            selectedLang={selectedLang}
                            updatedAt={updatedAt || ''}
                        />
                    );
                })}
            </>
        );
    };

    if (getQrDetailsLoading || updateQrLoading) {
        return (
            <div style={ContainerStyles.spinnerContainer}>
                <Oval
                    height={200}
                    width={200}
                    color='#1998dd'
                    secondaryColor='#A5AAB5'
                />
            </div>
        );
    }

    if (getQrDetailsError) {
        return (
            <div style={ContainerStyles.spinnerContainer}>
                <Text css={ItemStyles.qrDetailsError}>{getQrDetailsError}</Text>
                <Button
                    onClick={() => getQrDetails(qrId)}
                    css={ItemStyles.retryButton}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div style={ContainerStyles.mainContainer}>
            <Button
                onClick={onBackClickHandler}
                css={ItemStyles.backButton}
            >
                <SVG src={icons.ChevronLeft} id='backIcon' />
                <Text style={{ marginLeft: '5px' }}>BACK</Text>
            </Button>

            <div style={{ borderTop: '0.5px solid rgb(0,0,0,0.1)' }} />

            <div style={ContainerStyles.innerMainContainer}>
                <div>
                    <Text css={ItemStyles.pageTitle}>
                        Edit QR Code
                    </Text>

                    <div
                        style={ContainerStyles.qrNameContainer}
                    >
                        <SVG
                            src={icons.Qr}
                            style={{ width: '40px', height: '40px', opacity: '30%' }}
                        />
                        <Input
                            value={qrName}
                            onChange={e => setQrName(e.target.value)}
                            css={ItemStyles.qrNameInput}
                            placeholder='Name your QR code'
                        />
                    </div>
                </div>

                <div style={ContainerStyles.generalSettingCard}>
                    <div style={ContainerStyles.generalSetting}>
                        <Text>
                            General Setting
                        </Text>

                        <StatusToggle
                            checked={qrStatus === 0}
                            onChange={() => setQrStatus(prev => 1 - prev)}
                        />
                    </div>

                    <div style={{ paddingLeft: '40px', paddingRight: '40px' }}>
                        <div style={ContainerStyles.answeredContainer}>
                            <div>
                                <Text css={ItemStyles.answeredText}>
                                    Answered Once
                                </Text>
                                <Text css={ItemStyles.answeredDescription}>
                                    Customers can only answer this once
                                </Text>
                            </div>
                            <Toggle
                                onChange={answeredOnceHandler}
                                checked={stateQrType === 0}
                            />
                        </div>

                        <div style={{ borderTop: '0.5px solid rgb(0,0,0,0.1)' }} />

                        <div style={ContainerStyles.answeredContainer}>
                            <div>
                                <Text css={ItemStyles.answeredText}>
                                    Answered Multiple
                                </Text>
                                <Text css={ItemStyles.answeredDescription}>
                                    Customers can only answer this multiple times using the same phone number
                                </Text>
                            </div>
                            <Toggle
                                onChange={answeredMultipleHandler}
                                checked={stateQrType === 1}
                            />
                        </div>

                        <div style={{ borderTop: '0.5px solid rgb(0,0,0,0.1)' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px', marginBottom: '20px' }}>
                            {stateQrType === 1 ? (
                                <div style={ContainerStyles.uploadFieldContainer}>
                                    <div>
                                        <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
                                            {uploadFieldLabel}
                                        </Text>

                                        {!uploadUniqueCodesLoading ? (
                                            <UploadField
                                                onClick={ChooseFileClickHandler}
                                                onChange={uploadCSVHandler}
                                                reference={fileInput}
                                                fileName={fileName}
                                                accept='.csv'
                                            />
                                        ) : (
                                            <Oval
                                                height={30}
                                                width={30}
                                                color='#1998dd'
                                                secondaryColor='#A5AAB5'
                                            />
                                        )}
                                        <Text style={{ marginTop: '10px', color: Colors.red.primary }}>
                                            {uniqueCodesParsingError}
                                        </Text>

                                        {stateHasUniqueCodes && (
                                            <Button
                                                onClick={downloadUniqueCodes}
                                                css={ItemStyles.uniqueCodesAttachedButton}
                                            >
                                                {renderUniqueCodesAttachedButtonBody()}
                                            </Button>
                                        )}

                                        <Button
                                            onClick={downloadUniqueCodesTemplate}
                                            css={ItemStyles.downloadCsvButton}
                                        >
                                            <Text css={ItemStyles.downloadCSV}>
                                                Download csv
                                            </Text>
                                            <Text css={ItemStyles.templateFile}>
                                                template file
                                            </Text>
                                        </Button>

                                        <Text style={{ marginTop: '10px', color: Colors.red.primary }}>
                                            {updateQrError}
                                        </Text>
                                    </div>
                                </div>
                            ) : (
                                <div style={ContainerStyles.uploadFieldContainer}>
                                    <Text style={{ marginTop: '10px', color: Colors.red.primary }}>
                                        {updateQrError}
                                    </Text>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '45%' }}>
                                <Text style={{ color: Colors.red.primary, marginRight: '20px' }}>{unsavedChangesAlert}</Text>

                                <Button
                                    onClick={saveChangesHandler}
                                    css={ItemStyles.saveButton}
                                >
                                    <Text>SAVE CHANGES</Text>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '80px', marginBottom: '40px' }}>
                    {stateQrType !== 0 && (
                        <div>
                            <Button
                                onClick={() => setSelectedSurveyType(ISurveyTypeEnum.Trialist)}
                                css={selectedSurveyType === ISurveyTypeEnum.Trialist ? ItemStyles.surveyCategoryButtonSelected : ItemStyles.surveyCategoryButtonIdle}
                            >
                                <Text>TRIALIST</Text>
                            </Button>
                            <Button
                                onClick={() => setSelectedSurveyType(ISurveyTypeEnum.RepeatedBuyer)}
                                css={selectedSurveyType === ISurveyTypeEnum.RepeatedBuyer ? ItemStyles.surveyCategoryButtonSelected : ItemStyles.surveyCategoryButtonIdle}
                            >
                                <Text>REPEATED BUYER</Text>
                            </Button>
                        </div>
                    )}
                    <Button
                        onClick={() => setCreateSurveyModalOpen(true)}
                        css={ItemStyles.createSurveyButton}
                    >
                        <Text>CREATE SURVEY</Text>
                    </Button>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '40px',
                    marginBottom: '200px',
                }}
                >
                    {renderSurveyCards()}
                </div>
            </div>

            <EditQrModal
                qrData={qrData}
            />

            <CreateSurveyModal
                qrId={qrId}
                surveyType={selectedSurveyType}
            />

            <EnableSurveyModal />
            <DeleteSurveyModal />
            <ErrorModal />
            <UploadImageModal />
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    getQrDetailsLoading: Selectors.qrGetQrDetailsAttempting(state),
    getQrDetailsError: Selectors.qrGetQrDetailsError(state),
    qrDetails: Selectors.qrGetQrDetails(state),
    uniqueCodesLoading: Selectors.qrGetUniqueCodesAttempting(state),
    uniqueCodesError: Selectors.qrGetUniqueCodesError(state),
    uniqueCodesList: Selectors.qrGetUniqueCodes(state),
    surveySelectorLoading: Selectors.surveyGetSurveyAttempting(state),
    surveySelectorError: Selectors.surveyGetSurveyError(state),
    surveySelector: Selectors.surveyGetSurvey(state),
    selectedSurveyType: Selectors.surveySelectedSurveyType(state),
    updateQrLoading: Selectors.qrUpdateQrAttempting(state),
    updateQrError: Selectors.qrUpdateQrError(state),
    uploadUniqueCodesLoading: Selectors.qrUploadUniqueCodesAttempting(state),
    uploadUniqueCodesError: Selectors.qrUploadUniqueCodesError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getQrDetails: (qrId: string) => dispatch(Actions.getQrDetailsAttempt({ qrId })),
    setUpdateQrModalOpen: (state: boolean) => dispatch(Actions.setUpdateQrModalOpen(state)),
    getUniqueCodes: (qrId: string) => dispatch(Actions.getUniqueCodesAttempt({ qrId })),
    getAllSurveys: (qrId: string, surveyType: ISurveyTypeEnum) => dispatch(Actions.getAllSurveyAttempt({ qrId, surveyType })),
    setCreateSurveyModalOpen: (state: boolean) => dispatch(Actions.setCreateNewSurveyModalOpen(state)),
    setSelectedSurveyType: (type: ISurveyTypeEnum) => dispatch(Actions.setSelectedSurveyType(type)),
    updateQr: (data: IUpdateQr) => dispatch(Actions.updateQrAttempt(data)),
    uploadUniqueCodes: (qrId: string, uniqueCodes: string[]) => dispatch(Actions.uploadUniqueCodesAttempt({ qrId, code: uniqueCodes })),
    replaceUniqueCodes: (qrId: string, uniqueCodes: string[]) => dispatch(Actions.replaceUniqueCodesAttempt({ qrId, code: uniqueCodes })),
    resetQrDetails: () => dispatch(Actions.getQrDetailsReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQrScreen);
