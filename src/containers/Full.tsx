import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import { Oval } from 'react-loader-spinner';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import Routes from 'navigation/Routes';

import packageInfo from '../../package.json';

const Full: FunctionComponent = () => {
    const dispatch = useDispatch();
    const loading = useSelector(Selectors.authGetStartupAttempting);

    useEffect(() => {
        dispatch(Actions.authStartupAttempt());
        console.log(`Admin - Research Anytime: v.${packageInfo.version}`);
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Oval
                    height={200}
                    width={200}
                    color='#1998dd'
                    secondaryColor='#A5AAB5'
                />
            </div>
        );
    }

    return (
        <Routes />
    );
};

export default Full;
