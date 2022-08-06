import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import { Row, Spinner } from 'reactstrap';
import NavActions from 'lib/NavActions';

import Selectors from 'redux/Selectors';
import { AppDispatch, RootState } from 'redux/store';
import Actions from 'redux/Actions';

import Styles from './styles';

interface RequestOtpProps {
    requestingOtp: boolean;
    requestOtpError: string;
    requestOtp: (email: string) => void;
    resetRequestOtp: () => void;
}

const RequestOtp = (props: RequestOtpProps): JSX.Element => {
    const {
        requestingOtp,
        requestOtpError,
        requestOtp,
        resetRequestOtp,
    } = props;

    const [email, setEmail] = useState('');

    useEffect(() => {
        return () => {
            resetRequestOtp();
        };
    }, []);

    const handleRequestOtpClick = () => {
        requestOtp(email);
    };

    return (
        <div style={Styles.LoginBackground}>
            <div style={{ width: '500px', height: '250px', backgroundColor: 'white', padding: '10px 20px' }}>
                <Row>
                    <div style={{ ...Styles.loginCardRows, marginTop: '20px', color: '#262626' }}>
                        <h1>Forgot your password?</h1>
                    </div>
                </Row>
                <Input
                    disabled={requestingOtp}
                    label='Enter email address'
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    labelCss={['font-size: 16px']}
                    css={[
                        `
                            border: 1px solid rgb(0,0,0,0.1);
                            transition: box-shadow .15s ease-in-out;
                            &:focus {
                                box-shadow: 0px 0px 0px 4px rgb(194,219,254);
                            }
                    `,
                    ]}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button
                        onClick={() => NavActions.navResetToLogin()}
                        style={{
                            backgroundColor: '#A5AAB5',
                            color: 'white',
                            marginRight: '40px',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={requestingOtp}
                        onClick={handleRequestOtpClick}
                        style={{
                            backgroundColor: requestingOtp ? 'rgb(2, 23, 120, 0.5)' : 'rgb(2, 23, 120)',
                            color: 'white',
                            cursor: requestingOtp ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {requestingOtp ? <Spinner /> : 'Request OTP'}
                    </Button>
                </div>
                <div style={Styles.ErrorMessage}>{requestOtpError}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    requestingOtp: Selectors.authGetRequestOtpAttempting(state),
    requestOtpError: Selectors.authGetRequestOtpError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    requestOtp: (email: string) => dispatch(Actions.authRequestOtpAttempt({ email })),
    resetRequestOtp: () => dispatch(Actions.authResetRequestOtp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestOtp);
