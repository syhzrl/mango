import React, { FunctionComponent, useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';

import { ISettings } from 'entities/settings';

import { ContainerStyles, ItemStyles } from './styles/SettingsScreenStyles';

interface SettingsProps {
    getAllSettingsLoading: boolean;
    getAllSettingsError: string;
    settingsData: ISettings;
    setSettingsLoading: boolean;
    setSettingsError: string;
    getAllSettings: () => void;
    setSettings: (data: ISettings) => void;
}

const Settings: FunctionComponent<SettingsProps> = (props: SettingsProps) => {
    const {
        getAllSettingsLoading,
        getAllSettingsError,
        settingsData,
        setSettingsLoading,
        setSettingsError,
        getAllSettings,
        setSettings,
    } = props;

    const [landingPageURl, setLandingPageURl] = useState('');

    useEffect(() => {
        getAllSettings();
    }, []);

    useEffect(() => {
        if (settingsData) {
            const { iqosUrl } = settingsData;

            setLandingPageURl(iqosUrl);
        }
    }, [settingsData]);

    const submitClickHandler = () => {
        const dataToSubmit: ISettings = {
            iqosUrl: landingPageURl,
        };

        setSettings(dataToSubmit);
    };

    if (getAllSettingsLoading || setSettingsLoading) {
        return (
            <div style={ContainerStyles.mainContainer}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <Oval
                        width={300}
                        height={300}
                        color='#1998dd'
                        secondaryColor='#A5AAB5'
                    />
                </div>
            </div>
        );
    }

    if (getAllSettingsError || setSettingsError) {
        return (
            <div style={ContainerStyles.mainContainer}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <Text>
                        {getAllSettingsError}
                    </Text>
                </div>
            </div>
        );
    }

    return (
        <div style={ContainerStyles.mainContainer}>
            <Text
                css={ItemStyles.title}
            >
                Settings
            </Text>
            <div
                style={{
                    marginTop: '60px',
                }}
            >
                <Text
                    css={ItemStyles.label}
                >
                    IQOS Landing Page Url
                </Text>
                <Input
                    value={landingPageURl}
                    onChange={(e) => setLandingPageURl(e.target.value)}
                />
            </div>

            <div
                style={{
                    marginTop: '20px',
                    marginBottom: '20px',
                }}
            >
                <Button
                    onClick={submitClickHandler}
                    css={ItemStyles.submitButton}
                >
                    <Text>Submit</Text>
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    getAllSettingsLoading: Selectors.settingsGetAllSettingsAttempting(state),
    getAllSettingsError: Selectors.settingsGetAllSettingsError(state),
    settingsData: Selectors.settingsGetAllSettings(state),

    setSettingsLoading: Selectors.settingsSetSettingsAttempting(state),
    setSettingsError: Selectors.settingsSetSettingsError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getAllSettings: () => dispatch(Actions.getAllSettingsAttempt()),
    setSettings: (data: ISettings) => dispatch(Actions.setSettingsAttempt(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
