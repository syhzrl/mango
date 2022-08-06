import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import QRCode from 'react-qr-code';
import FileSaver from 'file-saver';
import { Card } from 'reactstrap';
import dayjs from 'dayjs';

import { AppDispatch, RootState } from 'redux/store';
import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { GetQrStatisticsResponse, IDeviceTypeEnum } from 'api/QrBase';
import { IQr } from 'entities/qr';
import { IGetQrStatisticsParams } from 'redux/slices/qr/types';
import { IQrTypeEnum } from 'redux/slices/reports/types';
import { connect } from 'react-redux';

import NavActions from 'lib/NavActions';
import { useParams } from 'react-router-dom';
import config from 'config';

import Button from 'components/Button';
import Text from 'components/Text';
import Icons from 'assets/icons';
import DeleteQrModal from './components/DeleteQrModal';

import { ItemStyles } from './styles/EditQrStyles';
import { ContainerStyles as QRContainerStyles, ItemStyles as QRItemStyles } from './components/styles/QrCardStyles';
import ReportsStyles from '../reports/styles';
import QrDetailsStyles from './styles/QrDetailsStyles';

interface QrDetailsProps {
    gettingQrStatistics: boolean;
    getQrStatisticsError: string;
    qrStatistics: GetQrStatisticsResponse,
    qrList: IQr[];
    setDeleteQrModalOpen: (isOpen: boolean) => void;
    getQrStatistics: (params: IGetQrStatisticsParams) => void;
    getAllQrs: (campaignId: string) => void;
}

const QrDetails = (props: QrDetailsProps): JSX.Element => {
    const {
        gettingQrStatistics,
        getQrStatisticsError,
        qrStatistics,
        qrList,
        setDeleteQrModalOpen,
        getQrStatistics,
        getAllQrs,
    } = props;

    const [qrLink, setQrLink] = useState('');
    const [qrCreatedAt, setQrCreatedAt] = useState('');
    const [qrType, setQrType] = useState<number>();
    const [qrStatus, setQrStatus] = useState<number>();

    const param = useParams();
    const { qrId = '', qrName = '', campaignId = '' } = param;

    useEffect(() => {
        if (qrId) {
            setQrLink(`${config.hostUrl}/q/${qrId}`);
            getQrStatistics({ qrId });
        }
    }, [qrId]);

    useEffect(() => {
        if (!qrList.length) getAllQrs(campaignId);
    }, []);

    useEffect(() => {
        if (qrList.length) {
            const currentQr = qrList.find(qr => qr.name === qrName);

            if (currentQr) {
                setQrCreatedAt(currentQr.createdAt);
                setQrType(currentQr.qrType);
                setQrStatus(currentQr.status);
            }
        }
    }, [qrList]);

    const downloadQrCode = () => {
        const svg = document.getElementById(qrId) as Node; // put "as Node" here for typescript
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');

            FileSaver.saveAs(pngFile, `QR_${qrName}.png`);
        };

        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    const renderStatCards = () => {
        return (
            <div style={QrDetailsStyles.QrDetailsStatCardContainer}>
                <Card
                    style={{
                        ...ReportsStyles.StatsCard,
                        minWidth: '250px',
                    }}
                >
                    <div style={ReportsStyles.StatsCardValue}>
                        {qrStatistics.totalScans || '-'}
                    </div>

                    <div>
                        Total Scans
                    </div>
                </Card>

                <Card
                    style={{
                        ...ReportsStyles.StatsCard,
                        minWidth: '250px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                        }}
                    >
                        <div style={ReportsStyles.StatsCardValue}>
                            {
                                (qrStatistics.completedSurveySet.total && qrStatistics.completedSurveySet.value)
                                    ? `${Math.round((qrStatistics.completedSurveySet.value / qrStatistics.completedSurveySet.total) * 100)}%`
                                    : '-'
                            }
                        </div>

                        <div style={{ marginLeft: '10px' }}>
                            (
                            {qrStatistics.completedSurveySet.value || 0}
                            /
                            {qrStatistics.completedSurveySet.total || 0}
                            )
                        </div>
                    </div>

                    <div>
                        Completed the survey set
                    </div>
                </Card>

                <Card
                    style={{
                        ...ReportsStyles.StatsCard,
                        minWidth: '250px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'baseline',
                        }}
                    >
                        <div style={ReportsStyles.StatsCardValue}>
                            {
                                (qrStatistics.completionRate.total && qrStatistics.completionRate.value)
                                    ? `${Math.round((qrStatistics.completionRate.value / qrStatistics.completionRate.total) * 100)}%`
                                    : '-'
                            }
                        </div>

                        <div style={{ marginLeft: '10px' }}>
                            (
                            {qrStatistics.completionRate.value || 0}
                            /
                            {qrStatistics.completionRate.total || 0}
                            )
                        </div>
                    </div>

                    <div>
                        Average Completion Rate
                    </div>
                </Card>

                <Card
                    style={{
                        ...ReportsStyles.StatsCard,
                        minWidth: '250px',
                    }}
                >
                    <div style={ReportsStyles.StatsCardValue}>
                        {qrStatistics.timesOpenedByCustomers || '-'}
                    </div>

                    <div>
                        Times opened by customers
                    </div>
                </Card>

                <Card
                    style={{
                        ...ReportsStyles.StatsCard,
                        minWidth: '250px',
                    }}
                >
                    <div style={ReportsStyles.StatsCardValue}>
                        {qrStatistics.averageTimeSpent || '-'}
                    </div>

                    <div>
                        Average Time Spent on the survey
                    </div>
                </Card>
            </div>
        );
    };

    const renderScanByOsTable = () => {
        const osTableHeaders = [
            <div style={{ ...QrDetailsStyles.QrDetailsTableHeaderCells, width: '10%' }}>OS</div>,
            <div style={{ ...QrDetailsStyles.QrDetailsTableHeaderCells, width: '80%' }}>Scans</div>,
            <div style={{ ...QrDetailsStyles.QrDetailsTableHeaderCells, width: '10%' }}>%</div>,
        ];

        return (
            <div style={{ marginTop: '10px' }}>
                <div style={{ paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingRight: '8px' }}>
                        {qrStatistics.scansByDevice.length ? osTableHeaders.map(item => item) : 'No records found'}
                    </div>

                    <div style={{ overflowY: 'auto', maxHeight: '230px' }}>
                        {qrStatistics.scansByDevice.map(item => {
                            return (
                                <div style={{ display: 'flex', width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                    <div style={{ ...QrDetailsStyles.QrDetailsTableDataCells, color: '#888888', width: '10%' }}>{IDeviceTypeEnum[item.type]}</div>
                                    <div style={{ ...QrDetailsStyles.QrDetailsTableDataCells, color: '#888888', justifyContent: 'normal', width: '80%', alignItems: 'center' }}>
                                        <div
                                            style={{
                                                width: `${(item.percent * 300).toFixed(1)}px`,
                                                height: '14px',
                                                borderRadius: '7px',
                                                background: '#0074C0',
                                                marginRight: '10px',
                                            }}
                                        />
                                        {item.scans}
                                    </div>
                                    <div style={{ ...QrDetailsStyles.QrDetailsTableDataCells, color: '#888888', width: '10%' }}>
                                        {(item.percent * 100).toFixed(1)}
                                        %
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderScanByCityTable = () => {
        const cityTableHeaders = [
            <div style={{ ...QrDetailsStyles.QrDetailsTableHeaderCells, width: '10%' }}>#</div>,
            <div style={{ ...QrDetailsStyles.QrDetailsTableHeaderCells, width: '55%' }}>City</div>,
            <div style={{ ...QrDetailsStyles.QrDetailsTableHeaderCells, width: '20%' }}>Scans</div>,
            <div style={{ ...QrDetailsStyles.QrDetailsTableHeaderCells, width: '15%' }}>%</div>,
        ];

        return (
            <div style={{ marginTop: '10px' }}>
                <div style={{ paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingRight: '8px' }}>
                        {qrStatistics.scansByCities.length ? cityTableHeaders.map(item => item) : 'No records found'}
                    </div>

                    <div style={{ overflowY: 'auto', maxHeight: '230px' }}>
                        {qrStatistics.scansByCities.map((item, index) => {
                            return (
                                <div style={{ display: 'flex', width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                    <div style={{ ...QrDetailsStyles.QrDetailsTableDataCells, color: '#888888', width: '10%' }}>{index + 1}</div>
                                    <div style={{ ...QrDetailsStyles.QrDetailsTableDataCells, color: '#888888', width: '55%' }}>{item.name}</div>
                                    <div style={{ ...QrDetailsStyles.QrDetailsTableDataCells, color: '#888888', width: '20%' }}>{item.scans}</div>
                                    <div style={{ ...QrDetailsStyles.QrDetailsTableDataCells, color: '#888888', width: '15%' }}>
                                        {item.percent * 100}
                                        %
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderScanTables = () => {
        if (gettingQrStatistics) return false;

        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%', marginRight: '20px' }}>
                    <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Scans By Operation System
                    </Text>

                    <div style={QrDetailsStyles.QrDetailsScanTableContainer}>
                        {renderScanByOsTable()}
                    </div>
                </div>

                <div style={{ width: '50%' }}>
                    <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Scans By Cities
                    </Text>

                    <div style={QrDetailsStyles.QrDetailsScanTableContainer}>
                        {renderScanByCityTable()}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            style={{
                padding: '0px 20px 40px',
                backgroundColor: '#F6F6F6',
            }}
        >
            <Button
                onClick={() => NavActions.navBack()}
                css={ItemStyles.backButton}
            >
                <SVG src={Icons.ChevronLeft} id='backIcon' />
                <Text style={{ marginLeft: '5px' }}>BACK</Text>
            </Button>

            <div style={{ borderTop: '0.5px solid rgb(0,0,0,0.1)' }} />

            <div style={{ padding: '20px 0px', width: 'auto' }}>
                <Text css={ItemStyles.pageTitle}>
                    QR Code Scans
                </Text>

                <div style={QrDetailsStyles.QrDetailsCardContainer}>
                    <div>
                        <Text css={QRItemStyles.cardTitle}>
                            {qrName}
                        </Text>

                        <div style={{ display: 'flex', minWidth: '800px', justifyContent: 'space-between' }}>
                            <div style={QRContainerStyles.leftInfoContainer}>
                                <div style={QrDetailsStyles.QrDetailsSurveyInfo}>
                                    <SVG src={Icons.Clock} style={{ marginRight: '5px' }} />
                                    <Text>{dayjs(qrCreatedAt).format('MMM DD, YYYY')}</Text>
                                </div>

                                <div style={QrDetailsStyles.QrDetailsSurveyInfo}>
                                    <SVG src={Icons.Setting} style={{ marginRight: '5px' }} />
                                    <Text>
                                        Answered
                                        {qrType === IQrTypeEnum.AnswerOnce ? ' Once by Customers' : ' Multiple by Customers'}
                                        {/* lazy condition checking */}
                                    </Text>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    <SVG src={Icons.Link} style={{ marginRight: '5px' }} />
                                    <Text>{qrLink}</Text>
                                </div>

                                <div style={QrDetailsStyles.QrDetailsSurveyInfo}>
                                    <SVG src={Icons.Info} style={{ marginRight: '5px' }} />
                                    <Text style={qrStatus === 0 ? { color: '#021778' } : { color: '#EF950F' }}>
                                        {qrStatus === 0 ? 'Active' : 'Inactive'}
                                        {/* lazy condition checking */}
                                    </Text>
                                </div>
                            </div>

                            <div style={{ width: 'auto' }}>
                                <QRCode
                                    value={qrLink}
                                    id={qrId}
                                    size={140}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Button onClick={() => NavActions.navToEditQrScreen({ qrId })} css={QRItemStyles.iconButtons}>
                            <SVG src={Icons.Pencil} id='pencil' />
                        </Button>

                        <Button onClick={() => setDeleteQrModalOpen(true)} css={QRItemStyles.iconButtons}>
                            <SVG src={Icons.Trash} id='trash' />
                        </Button>

                        <Button onClick={downloadQrCode} css={QRItemStyles.iconButtons}>
                            <SVG src={Icons.Download} id='download' />
                        </Button>
                    </div>
                </div>

                {renderStatCards()}
                {renderScanTables()}
            </div>

            <DeleteQrModal
                deleteParams={{ name: qrName, id: qrId }}
                campaignId={campaignId}
            />
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    gettingQrStatistics: Selectors.qrGetQrStatisticsAttempting(state),
    getQrStatisticsError: Selectors.qrGetQrStatisticsError(state),
    qrStatistics: Selectors.qrGetQrStatistics(state),
    qrList: Selectors.qrGetAll(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setDeleteQrModalOpen: (isOpen: boolean) => dispatch(Actions.setDeleteQrModalOpen(isOpen)),
    getQrStatistics: (params: IGetQrStatisticsParams) => dispatch(Actions.qrGetQrStatisticsAttempt(params)),
    getAllQrs: (campaignId: string) => dispatch(Actions.getAllQrAttempt({ campaignId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(QrDetails);
