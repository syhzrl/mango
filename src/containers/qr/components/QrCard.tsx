import React, { FunctionComponent, useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import QRCode from 'react-qr-code';
import FileSaver from 'file-saver';

import Actions from 'redux/Actions';
import { AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import config from 'config';

import NavActions from 'lib/NavActions';

import Text from 'components/Text';
import Button from 'components/Button';

import icons from 'assets/icons';

import { ItemStyles, ContainerStyles } from './styles/QrCardStyles';

interface QrCardProps {
    id: string;
    name: string;
    type: number;
    status: number;
    createdAt: string;
    numOfScans: string;
    campaignId: string;
    setDeleteQrModalOpen: (state: boolean) => void;
    passQrNameToDeleteModal: (deleteParams: { name: string, id: string }) => void;
}

const QrCard: FunctionComponent<QrCardProps> = (props: QrCardProps) => {
    const { id, name, type, status, createdAt, numOfScans, campaignId, setDeleteQrModalOpen, passQrNameToDeleteModal } = props;

    const [qrLink, setQrLink] = useState('');
    const [typeText, setTypeText] = useState('');
    const [statusText, setStatusText] = useState('');

    useEffect(() => {
        setQrLink(`${config.hostUrl}/q/${id}`);

        switch (type) {
            case 0: setTypeText('Answered Once'); break;
            case 1: setTypeText('Answered Multiple Times'); break;
            default:
        }

        switch (status) {
            case 0: setStatusText('Active'); break;
            case 1: setStatusText('Inactive'); break;
            default:
        }
    }, []);

    const downloadQrCode = () => {
        const svg = document.getElementById(id) as Node; // put "as Node" here for typescript
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');

            FileSaver.saveAs(pngFile, `QR_${name}.png`); // qr name here!
        };

        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    const deleteClickHandler = () => {
        setDeleteQrModalOpen(true);
        passQrNameToDeleteModal({ name, id });
    };

    return (
        <div style={ContainerStyles.QrCard}>
            <Button
                style={ContainerStyles.infoContainer}
                onClick={() => NavActions.navToEditQrScreen({ qrId: id })}
            >

                <Text css={ItemStyles.cardTitle}>
                    {name}
                </Text>

                <div style={{ display: 'flex', height: '100%', width: '100%', minWidth: '750px' }}>
                    <div style={ContainerStyles.leftInfoContainer}>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <SVG src={icons.Clock} style={{ marginRight: '5px' }} />
                            <Text>{createdAt}</Text>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <SVG src={icons.Setting} style={{ marginRight: '5px' }} />
                            <Text>{typeText}</Text>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <SVG src={icons.Link} style={{ marginRight: '5px' }} />
                            <Text>{qrLink}</Text>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <SVG src={icons.Info} style={{ marginRight: '5px' }} />
                            <Text style={status === 0 ? { color: '#021778' } : { color: '#EF950F' }}>{statusText}</Text>
                        </div>
                    </div>

                    <div style={ContainerStyles.rightInfoContainer}>
                        <div style={ContainerStyles.numberOfScansContainer}>

                            <div style={{ marginTop: '10px' }}>
                                <Text css={ItemStyles.noOfScans}>{numOfScans}</Text>
                                <Text css={ItemStyles.scansLabel}>Scans</Text>
                            </div>

                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    NavActions.navToQrDetails({ qrId: id, qrName: name, campaignId });
                                }}
                                css={ItemStyles.moreDetailsButton}
                            >
                                <Text>MORE DETAILS</Text>
                            </Button>

                        </div>

                        <div>
                            <QRCode
                                value={qrLink}
                                id={id}
                                size={140}
                            />
                        </div>
                    </div>
                </div>
            </Button>
            <div style={ContainerStyles.buttonsContainer}>
                <Button onClick={downloadQrCode} css={ItemStyles.iconButtons}>
                    <SVG src={icons.Download} id='download' />
                </Button>
                <Button onClick={deleteClickHandler} css={ItemStyles.iconButtons}>
                    <SVG src={icons.Trash} id='trash' />
                </Button>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setDeleteQrModalOpen: (state: boolean) => dispatch(Actions.setDeleteQrModalOpen(state)),
});

export default connect(null, mapDispatchToProps)(QrCard);
