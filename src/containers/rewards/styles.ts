const divider = {
    height: 1,
    width: '100%',
    marginTop: 20,
    backgroundColor: '#A5AAB5',
};

const verticalDivider = {
    height: '100%',
    width: 1,
    margin: '0 20px',
    backgroundColor: '#A5AAB5',
};

const UploadCSVButton = {
    border: 0,
    padding: '10px 30px',
    borderRadius: '0px',
    backgroundColor: '#021778',
    whiteSpace: 'nowrap',
    width: 'auto',
    height: '40px',
    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
};

const DownloadCSVButton = {
    display: 'flex',
    width: 'auto',
    height: '40px',
    alignItems: 'center',
    fontSize: '14px',
    justifyContent: 'center',
};

const ErrorMessage = {
    marginTop: '5px',
    color: 'red',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'center',
};

const PageContainer = {
    width: '100%',
    backgroundColor: '#F6F6F6',
    padding: '0px 40px 40px',
};

const PageHeader = {
    fontSize: '38px',
    fontWeight: 'bold',
};

export default {
    divider,
    verticalDivider,
    UploadCSVButton,
    DownloadCSVButton,
    ErrorMessage,
    PageContainer,
    PageHeader,
};
