import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';
import Button from 'components/Button';
import { Row, Spinner } from 'reactstrap';
import NavActions from 'lib/NavActions';

import Selectors from 'redux/Selectors';
import { AppDispatch, RootState } from 'redux/store';
import Actions from 'redux/Actions';

import Styles from './styles';

interface VerifyOtpProps {
    verifyingOtp: boolean;
    verifyOtpError: string;
    requestingOtp: boolean;
    requestOtpError: string;
    verifyOtp: (email: string, otp: string) => void;
    resetVerifyOtp: () => void;
    requestOtp: (email: string) => void;
    resetRequestOtp: () => void;
}

type LocationState = {
    email: string;
}

const VerifyOtp = (props: VerifyOtpProps): JSX.Element => {
    const {
        verifyingOtp,
        verifyOtpError,
        requestingOtp,
        requestOtpError,
        verifyOtp,
        resetVerifyOtp,
        requestOtp,
        resetRequestOtp,
    } = props;

    const [otp, setOtp] = useState<string[]>([]);
    const [resendDisabled, setResendDisabled] = useState(true);
    const location = useLocation();
    const { email } = (location?.state || { email: '' }) as LocationState;

    useEffect(() => {
        if (!email) {
            NavActions.navResetToLogin();
            toast.error('Something went wrong. Please try again later');
        }

        if (!otp.length) {
            const currentInput = document.getElementById('input0');
            if (currentInput) currentInput.focus();
        }

        return () => {
            resetVerifyOtp();
            resetRequestOtp();
        };
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (resendDisabled === true) {
            timeoutId = setTimeout(() => { setResendDisabled(false); }, 30000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [resendDisabled]);

    const handleVerifyOtpClick = () => {
        if (otp.length === 6) {
            verifyOtp(email || '', otp.join(''));
        }
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, position: number) => {
        const copyOtp = otp.slice();
        if (e.currentTarget.value !== ' ') {
            copyOtp[position] = e.currentTarget.value.toUpperCase();
            setOtp(copyOtp);
        }
    };

    const handleOtpKeyup = (e: React.KeyboardEvent<HTMLInputElement>, previous: string, current: string, next: string) => {
        const currentElement = document.getElementById(current) as HTMLInputElement;

        if (currentElement) {
            if ((e.key === 'Backspace' || e.key === 'Delete') && previous !== '') {
                const previousInput = document.getElementById(previous) as HTMLInputElement;
                previousInput.focus();
                previousInput.select();
            } else if (currentElement.value.length === currentElement.maxLength && e.code !== 'Space' && next !== '') {
                const nextInput = document.getElementById(next) as HTMLInputElement;
                nextInput.focus();
                nextInput.select();
            }
        }
    };

    const handleResendOtpClick = () => {
        requestOtp(email || '');
        setResendDisabled(true);
    };

    return (
        <div style={Styles.LoginBackground}>
            <div style={{ width: '500px', height: '300px', backgroundColor: 'white', padding: '10px 20px' }}>
                <Row>
                    <div style={{ ...Styles.loginCardRows, marginTop: '20px', color: '#262626' }}>
                        <h1>Enter OTP</h1>
                    </div>
                </Row>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <input
                        disabled={verifyingOtp}
                        id='input0'
                        value={otp[0] || ''}
                        onKeyUp={(e) => handleOtpKeyup(e, '', 'input0', 'input1')}
                        onChange={(e) => handleOtpChange(e, 0)}
                        onClick={() => {
                            const current = document.getElementById('input0') as HTMLInputElement;
                            current.select();
                        }}
                        maxLength={1}
                        style={Styles.OtpInput}
                    />
                    <input
                        disabled={verifyingOtp}
                        id='input1'
                        value={otp[1] || ''}
                        onKeyUp={(e) => handleOtpKeyup(e, 'input0', 'input1', 'input2')}
                        onChange={(e) => handleOtpChange(e, 1)}
                        onClick={() => {
                            const current = document.getElementById('input1') as HTMLInputElement;
                            current.select();
                        }}
                        maxLength={1}
                        style={Styles.OtpInput}
                    />
                    <input
                        disabled={verifyingOtp}
                        id='input2'
                        value={otp[2] || ''}
                        onKeyUp={(e) => handleOtpKeyup(e, 'input1', 'input2', 'input3')}
                        onChange={(e) => handleOtpChange(e, 2)}
                        onClick={() => {
                            const current = document.getElementById('input2') as HTMLInputElement;
                            current.select();
                        }}
                        maxLength={1}
                        style={Styles.OtpInput}
                    />
                    <input
                        disabled={verifyingOtp}
                        id='input3'
                        value={otp[3] || ''}
                        onKeyUp={(e) => handleOtpKeyup(e, 'input2', 'input3', 'input4')}
                        onChange={(e) => handleOtpChange(e, 3)}
                        onClick={() => {
                            const current = document.getElementById('input3') as HTMLInputElement;
                            current.select();
                        }}
                        maxLength={1}
                        style={Styles.OtpInput}
                    />
                    <input
                        disabled={verifyingOtp}
                        id='input4'
                        value={otp[4] || ''}
                        onKeyUp={(e) => handleOtpKeyup(e, 'input3', 'input4', 'input5')}
                        onChange={(e) => handleOtpChange(e, 4)}
                        onClick={() => {
                            const current = document.getElementById('input4') as HTMLInputElement;
                            current.select();
                        }}
                        maxLength={1}
                        style={Styles.OtpInput}
                    />
                    <input
                        disabled={verifyingOtp}
                        id='input5'
                        value={otp[5] || ''}
                        onKeyUp={(e) => handleOtpKeyup(e, 'input4', 'input5', '')}
                        onChange={(e) => handleOtpChange(e, 5)}
                        onClick={() => {
                            const current = document.getElementById('input5') as HTMLInputElement;
                            current.select();
                        }}
                        maxLength={1}
                        style={Styles.OtpInput}
                    />
                </div>
                <div>
                    <Button
                        disabled={resendDisabled || requestingOtp}
                        style={{
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                            color: resendDisabled || requestingOtp ? '' : '#0074C0',
                            width: 'auto',
                            marginTop: '10px',
                            textDecorationLine: requestingOtp ? 'none' : 'underline',
                        }}
                        onClick={handleResendOtpClick}
                    >
                        {requestingOtp
                            ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    Resending OTP
                                    <div style={{ width: '5px' }} />
                                    <Spinner size='sm' />
                                </div>
                            )
                            : `Resend OTP ${resendDisabled ? 'in 30 seconds' : ''}`}
                    </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
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
                        disabled={requestingOtp || verifyingOtp || otp.length !== 6}
                        onClick={handleVerifyOtpClick}
                        style={{
                            backgroundColor: (requestingOtp || verifyingOtp || otp.length !== 6) ? 'rgb(2, 23, 120, 0.5)' : 'rgb(2, 23, 120)',
                            color: 'white',
                            cursor: (requestingOtp || verifyingOtp || otp.length !== 6) ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {verifyingOtp ? <Spinner /> : 'Verify OTP'}
                    </Button>
                </div>
                <div style={Styles.ErrorMessage}>{requestOtpError || verifyOtpError}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    verifyingOtp: Selectors.authGetVerifyOtpAttempting(state),
    verifyOtpError: Selectors.authGetVerifyOtpError(state),
    requestingOtp: Selectors.authGetRequestOtpAttempting(state),
    requestOtpError: Selectors.authGetRequestOtpError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    verifyOtp: (email: string, otp: string) => dispatch(Actions.authVerifyOtpAttempt({ email, otp })),
    resetVerifyOtp: () => dispatch(Actions.authResetVerifyOtp()),
    requestOtp: (email: string) => dispatch(Actions.authRequestOtpAttempt({ email })),
    resetRequestOtp: () => dispatch(Actions.authResetRequestOtp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
