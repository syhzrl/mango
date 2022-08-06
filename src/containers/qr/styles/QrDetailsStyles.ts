const QrDetailsCardContainer = {
    maxWidth: '1200px',
    backgroundColor: 'white',
    display: 'flex',
    marginBottom: '20px',
    padding: '15px 20px 15px 30px',
};

const QrDetailsStatCardContainer = {
    maxWidth: '1200px',
    minWidth: '1200px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '40px',
    flexWrap: 'wrap',
} as const;

const QrDetailsSurveyInfo = {
    display: 'flex',
    alignItems: 'center',
};

const QrDetailsScanTableContainer = {
    background: 'white',
    padding: '10px 20px 0px',
    marginTop: '15px',
};

const QrDetailsTableHeaderCells = {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 20px',
    fontWeight: 'bold',
};

const QrDetailsTableDataCells = {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 20px',
};

export default {
    QrDetailsCardContainer,
    QrDetailsStatCardContainer,
    QrDetailsSurveyInfo,
    QrDetailsScanTableContainer,
    QrDetailsTableHeaderCells,
    QrDetailsTableDataCells,
};
