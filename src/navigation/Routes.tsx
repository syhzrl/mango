import React, { FunctionComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { history } from 'redux/store';

import LoginScreen from 'containers/auth/Login';
import RequestOtpScreen from 'containers/auth/RequestOtp';
import VerifyOtpScreen from 'containers/auth/Otp';
import NewPasswordScreen from 'containers/auth/NewPassword';

import RewardsScreen from 'containers/rewards';

import HomeScreen from 'containers/home';
import CampaignsScreen from 'containers/campaigns';
import QrScreen from 'containers/qr';
import QrDetailsScreen from 'containers/qr/QrDetails';
import EditQrScreen from 'containers/qr/EditQr';
import ReportsScreen from 'containers/reports';
import SurveyReportsScreen from 'containers/reports/SurveyReports';
import SurveyResponsesScreen from 'containers/reports/SurveyResponses';
import SettingsScreen from 'containers/settings';

import PrivateRoute from './PrivateRoutes';

const PrivateBucket: FunctionComponent = () => {
    return (
        <Route path='/' element={<PrivateRoute />}>
            <Route element={<HomeScreen />}>
                <Route path='/campaigns' element={<CampaignsScreen />} />
                <Route path='/campaigns/:campaignId/:campaignName' element={<QrScreen />} />
                <Route path='/editQr/:qrId' element={<EditQrScreen />} />
                <Route path='/rewards' element={<RewardsScreen />} />
                <Route path='/reports' element={<ReportsScreen />} />
                <Route path='/qr/details/:qrId/:qrName/:campaignId' element={<QrDetailsScreen />} />
                <Route path='/reports/survey/:surveyId/:surveyName' element={<SurveyReportsScreen />} />
                <Route path='/reports/survey/responses/:surveyId/:surveyName' element={<SurveyResponsesScreen />} />
                <Route path='/settings' element={<SettingsScreen />} />
            </Route>
        </Route>
    );
};

const NavRoutes: FunctionComponent = (props) => {
    return (
        <Router history={history}>
            <Routes>
                <Route path='/' element={<Navigate replace to='/campaigns' />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/forgotPassword' element={<RequestOtpScreen />} />
                <Route path='/otp' element={<VerifyOtpScreen />} />
                <Route path='/newPassword' element={<NewPasswordScreen />} />

                <Route path='*' element={<Navigate replace to='/' />} />
                {PrivateBucket(props)}
            </Routes>
        </Router>
    );
};

export default NavRoutes;
