import React, { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import SideMenu from 'navigation/components/SideMenu';

import { StylesDictionary } from 'lib/StylesDictionary';

const HomeScreen: FunctionComponent = () => {
    return (
        <div style={styles.background}>
            <SideMenu />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Outlet />
            </div>
        </div>
    );
};

const styles: StylesDictionary = {
    background: {
        backgroundColor: '#F6F6F6',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '200%',
    },
};

export default HomeScreen;
