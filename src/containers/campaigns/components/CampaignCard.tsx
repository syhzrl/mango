import React, { FunctionComponent } from 'react';
import SVG from 'react-inlinesvg';

import { connect } from 'react-redux';
import Actions from 'redux/Actions';
import { AppDispatch } from 'redux/store';

import { ICampaign } from 'entities/campaign';

import NavActions from 'lib/NavActions';

import Text from 'components/Text';
import Button from 'components/Button';

import icons from 'assets/icons';
import Colors from 'assets/themes/Colors';

import { ContainerStyles, ItemStyles } from './styles/CampaignCardStyles';

interface CampaignCardProps {
    campaignId: string;
    title: string;
    createdAt: string;
    numberOfScans: number;
    status: number;
    onSelectedName?: (name: string) => void;
    onSelectedId?: (id: string) => void;
    setEditModalOpen?: (state: boolean) => void;
    setDeleteModalOpen?: (state: boolean) => void;
    onDeleteClicked?: (data: ICampaign) => void;
    disabled?: boolean;
}

const CampaignCard: FunctionComponent<CampaignCardProps> = (props: CampaignCardProps) => {
    const {
        campaignId,
        title,
        createdAt,
        numberOfScans,
        status,
        onSelectedName,
        onSelectedId,
        setEditModalOpen,
        setDeleteModalOpen,
        onDeleteClicked,
        disabled,
    } = props;

    const editClickHandler = () => {
        if (setEditModalOpen && onSelectedName && onSelectedId) {
            setEditModalOpen(true);
            onSelectedName(title);
            onSelectedId(campaignId);
        }
    };

    const deleteClickHandler = () => {
        if (onDeleteClicked && setDeleteModalOpen) {
            setDeleteModalOpen(true);
            onDeleteClicked({
                id: campaignId,
                name: title,
                status,
                numberOfScans,
                createdAt,
            });
        }
    };

    const setStatusText = () => {
        switch (status) {
            case 0: return 'Active';
            case 1: return 'Inactive';
            default: return '';
        }
    };

    return (
        <div
            style={disabled ? ContainerStyles.cardDisabled : ContainerStyles.card}
        >

            <Button
                onClick={() => NavActions.navToQrScreen({ campaignName: encodeURIComponent(title), campaignId })}
                css={ItemStyles.mainButton}
                disabled={disabled}
            >
                <div style={ContainerStyles.cardTitle}>
                    <Text css={ItemStyles.cardTitle}>{title}</Text>
                </div>

                <div style={{ display: 'flex', marginTop: '15px' }}>
                    <div>
                        <div
                            style={ContainerStyles.createdAtContainer}
                        >
                            <SVG src={icons.Clock} style={ContainerStyles.clockIcon} />
                            <Text>{createdAt}</Text>
                        </div>

                        <div
                            style={ContainerStyles.createdAtContainer}
                        >
                            <SVG src={icons.Info} style={ContainerStyles.clockIcon} />
                            <Text
                                style={status === 0 ? { color: Colors.active } : { color: Colors.inactive }}
                            >
                                {setStatusText()}
                            </Text>
                        </div>

                    </div>

                    <div style={ContainerStyles.verticalLine} />

                    <div>
                        <Text css={ItemStyles.noOfScans}>{numberOfScans}</Text>
                        <Text css={ItemStyles.scansLabel}>Scans</Text>
                    </div>
                </div>
            </Button>

            <div>
                {!disabled && (
                    <div style={{ display: 'flex' }}>
                        <Button
                            onClick={editClickHandler}
                            css={ItemStyles.editButton}
                        >
                            <SVG src={icons.Pencil} id='icon' />
                        </Button>
                        <Button
                            onClick={deleteClickHandler}
                            css={ItemStyles.deleteButton}
                        >
                            <SVG src={icons.Trash} id='icon' />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

CampaignCard.defaultProps = {
    onSelectedId: () => { return false; },
    onSelectedName: () => { return false; },
    onDeleteClicked: () => () => { return false; },
    setEditModalOpen: () => () => { return false; },
    setDeleteModalOpen: () => () => { return false; },
    disabled: false,
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setEditModalOpen: (state: boolean) => dispatch(Actions.setEditModalOpen(state)),
    setDeleteModalOpen: (state: boolean) => dispatch(Actions.setDeleteModalOpen(state)),
});

export default connect(null, mapDispatchToProps)(CampaignCard);
