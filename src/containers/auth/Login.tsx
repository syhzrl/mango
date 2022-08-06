import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Button, Input, Label, Col, Spinner } from 'reactstrap';

import NavActions from 'lib/NavActions';
import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { AppDispatch, RootState } from 'redux/store';

import Images from '../../assets/images';
import Icons from '../../assets/icons';
import Styles from './styles';

interface LoginProps {
    loading: boolean;
    error: string;
    login(username: string, password: string): void;
    resetLogin(): void;
}

const Login: FunctionComponent<LoginProps> = (props: LoginProps) => {
    const {
        loading,
        error,
        login,
        resetLogin,
    } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            resetLogin();
        };
    }, []);

    const handleForgotPasswordClick = () => {
        NavActions.navToForgotPassword();
    };

    const handleLoginClick = () => {
        login(email, password);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        const passwordField = document.getElementById('passwordField') as HTMLInputElement;

        if (passwordField.type === 'text') {
            passwordField.type = 'password';
        } else if (passwordField.type === 'password') {
            passwordField.type = 'text';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            login(email, password);
        }
    };

    return (
        <div style={Styles.LoginBackground}>
            <div>
                <Row style={Styles.loginCardRows}>
                    <img src={Images.whitePmLogo} alt='logo' style={{ width: '304px', height: '114px' }} />
                </Row>

                <Row style={{ ...Styles.loginCardRows, marginBottom: '20px', textAlign: 'center', color: '#F6F6F6' }}>
                    <h2>Delivering a Smoke-Free Future</h2>
                </Row>

                <div style={{ width: '600px', height: '420px', backgroundColor: 'white' }}>
                    <Row>
                        <div style={{ ...Styles.loginCardRows, marginTop: '20px', color: '#262626' }}>
                            <h1>Login</h1>
                        </div>
                    </Row>
                    <Col style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
                        <div>
                            <div style={{ color: '#262626' }}>
                                <b>Email</b>
                            </div>
                            <Input
                                disabled={loading}
                                placeholder='Email'
                                type='email'
                                style={{
                                    padding: '5px',
                                    width: '500px',
                                    height: '40px',
                                    border: '1px solid rgb(0,0,0,0.1)',
                                    borderRadius: '7px',
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={e => handleKeyDown(e)}
                            />
                        </div>
                    </Col>
                    <Col style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', padding: '5px' }}>
                        <div>
                            <div style={{ color: '#262626' }}>
                                <b>Password</b>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Input
                                    id='passwordField'
                                    disabled={loading}
                                    placeholder='Password'
                                    type='password'
                                    style={{
                                        position: 'relative',
                                        padding: '5px',
                                        width: '500px',
                                        height: '40px',
                                        border: '1px solid rgb(0,0,0,0.1)',
                                        borderRadius: '7px',
                                        outlineColor: 'rgb(16, 156, 201)',
                                    }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={e => handleKeyDown(e)}
                                />
                                <Button
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        marginLeft: '-48px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent',
                                        color: 'rgb(73, 199, 250)',
                                    }}
                                    onClick={toggleShowPassword}
                                >
                                    <img alt='toggleShowPassword' src={showPassword ? Icons.openEye : Icons.closedEye} />
                                </Button>
                            </div>
                        </div>
                    </Col>

                    <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <div style={{ width: '500px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', padding: 0 }}>
                            <div>
                                <Label style={{ margin: 0, fontSize: '15px' }}>
                                    <Input type='checkbox' />
                                    {' '}
                                    Stay Logged In
                                    {/* handle stay logged in */}
                                </Label>
                            </div>

                            <Button
                                style={{
                                    border: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: 'transparent',
                                    color: '#0074C0',
                                    width: 'auto',
                                }}
                                onClick={handleForgotPasswordClick}
                            >
                                Forgot password?
                            </Button>
                        </div>
                    </Row>

                    <Row style={{ marginTop: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                disabled={loading}
                                style={{
                                    border: 0,
                                    borderRadius: '3px',
                                    backgroundColor: loading ? 'rgb(128,128,128)' : '#021778',
                                    width: '500px',
                                    height: '65px',
                                    boxShadow: '4px 8px 12px rgba(55, 81, 255, 0.24)',
                                    color: 'white',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                }}
                                onClick={handleLoginClick}
                            >
                                {loading ? <Spinner /> : 'LOGIN'}
                            </Button>
                        </div>
                        <div style={Styles.ErrorMessage}>{error}</div>
                    </Row>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    loading: Selectors.authGetLoginAttempting(state),
    error: Selectors.authGetLoginError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    login: (username: string, password: string) => dispatch(Actions.authLoginAttempt({ username, password })),
    resetLogin: () => dispatch(Actions.authResetLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
