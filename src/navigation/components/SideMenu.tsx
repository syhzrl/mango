import React, { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import Actions from 'redux/Actions';
import { AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import icons from 'assets/icons';
import mangoJpg from 'assets/images/mango.jpg';
import images from 'assets/images';

import Button from 'components/Button';
import Text from 'components/Text';

import NavActions from 'lib/NavActions';

import { ContainerStyles, ItemStyles } from './SideMenuStyles';

interface SideMenuProps {
    logOut: () => void;
}

const SideMenu: FunctionComponent<SideMenuProps> = (props: SideMenuProps) => {
    const { logOut } = props;
    const { sideMenuItem, sideMenuItemSelected, LogOutButton } = ItemStyles;

    const location = useLocation();
    const { pathname } = location;

    return (
        <div
            style={ContainerStyles.mainContainer}
        >
            <img src={images.bikebear} alt='no logo!' style={{ width: '150px', height: '150px', marginTop: '50px', objectFit: 'contain' }} />

            <div style={{ marginTop: '100px' }}>
                <Button
                    onClick={() => NavActions.navToCampaignScreen()}
                    css={pathname === '/campaigns' ? sideMenuItemSelected : sideMenuItem}
                >
                    <SVG src={icons.Qr} id='icon' />
                    <Text>Campaigns</Text>
                </Button>

                <Button
                    onClick={() => NavActions.navToRewards()}
                    css={pathname === '/rewards' ? sideMenuItemSelected : sideMenuItem}
                >
                    <SVG src={icons.Reward} id='icon' />
                    <Text>Rewards</Text>
                </Button>

                <Button
                    onClick={() => NavActions.navToReports()}
                    css={pathname === '/reports' ? sideMenuItemSelected : sideMenuItem}
                >
                    <SVG src={icons.Graph} id='icon' />
                    <Text>Reports</Text>
                </Button>

                <Button
                    onClick={() => NavActions.navToSettings()}
                    css={pathname === '/settings' ? sideMenuItemSelected : sideMenuItem}
                >
                    <SVG src={icons.Setting} id='icon' />
                    <Text>Settings</Text>
                </Button>
            </div>

            <Button
                onClick={logOut}
                css={LogOutButton}
            >
                <SVG src={icons.LogOut} id='icon' />
                <Text>Log Out</Text>
            </Button>
        </div>
    );
};
const mapDispatchToProps = (dispatch: AppDispatch) => ({
    logOut: () => dispatch(Actions.authLogout()),
});

export default connect(null, mapDispatchToProps)(SideMenu);
