import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Input from 'components/Input';
import Button from 'components/Button';
import { Row, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

import NavActions from 'lib/NavActions';
import { useLocation } from 'react-router-dom';

import Selectors from 'redux/Selectors';
import { RootState } from 'redux/store';
import Actions from 'redux/Actions';

import Styles from './styles';

interface NewPasswordProps {
    resettingPassword: boolean;
    resetPasswordError: string;
    resetPassword: (email: string, otp: string, newPassword: string) => void;
    resetResetPassword: () => void;
}

type LocationState = {
    email: string;
    otp: string;
}

const NewPassword = (props: NewPasswordProps): JSX.Element => {
    const {
        resettingPassword,
        resetPasswordError,
        resetPassword,
        resetResetPassword,
    } = props;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const { email, otp } = (location?.state || { email: '', otp: '' }) as LocationState;

    useEffect(() => {
        if (!email || !otp) {
            NavActions.navResetToLogin();
            toast.error('Something went wrong. Please try again later');
        }

        return () => {
            resetResetPassword();
        };
    }, []);

    const handleResetPasswordClick = () => {
        if (password === confirmPassword) {
            resetPassword(email, otp, password);
        }
    };

    return (
        <div style={Styles.LoginBackground}>
            <div style={{ width: '500px', height: '310px', backgroundColor: 'white', padding: '10px 20px' }}>
                <Row>
                    <div style={{ ...Styles.loginCardRows, marginTop: '20px', color: '#262626' }}>
                        <h1>Enter new password</h1>
                    </div>
                </Row>
                <Input
                    type='password'
                    disabled={resettingPassword}
                    label='New Password'
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
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
                <Input
                    type='password'
                    disabled={resettingPassword}
                    label='Confirm New Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
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
                        disabled={resettingPassword || (password !== confirmPassword)}
                        onClick={handleResetPasswordClick}
                        style={{
                            backgroundColor: (resettingPassword || (password !== confirmPassword) ? 'rgb(2, 23, 120, 0.5)' : 'rgb(2, 23, 120)'),
                            color: 'white',
                            cursor: (resettingPassword || (password !== confirmPassword) ? 'not-allowed' : 'pointer'),
                        }}
                    >
                        {resettingPassword ? <Spinner /> : 'Submit'}
                    </Button>
                </div>
                <div style={Styles.ErrorMessage}>{resetPasswordError}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    resettingPassword: Selectors.getAuthResetPasswordAttempting(state),
    resetPasswordError: Selectors.getAuthResetPasswordError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    resetPassword: (email: string, otp: string, newPassword: string) => dispatch(Actions.authResetPasswordAttempt({ email, otp, newPassword })),
    resetResetPassword: () => dispatch(Actions.authResetResetPassword()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
