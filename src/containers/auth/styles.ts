import Images from '../../assets/images';

const LoginBackground = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    background: `url(${Images.whitePmBackground})100% 100% no-repeat padding-box, linear-gradient(180deg, #199BDF 0%, #021778 100%) 0% 0% no-repeat padding-box`,
    alignItems: 'center',
};

const loginCardRows = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
};

const ErrorMessage = {
    marginTop: '5px',
    color: 'red',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'center',
};

const OtpInput = {
    fontSize: '32px',
    textAlign: 'center',
    width: '40px',
    border: '1px solid rgb(0,0,0,0.3)',
    borderRadius: '5px',
} as const;

export default {
    LoginBackground,
    loginCardRows,
    ErrorMessage,
    OtpInput,
};
