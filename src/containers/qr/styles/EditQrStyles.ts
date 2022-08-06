import { css } from 'styled-components';
import Fonts from 'assets/themes/Fonts';
import Colors from 'assets/themes/Colors';

export const ContainerStyles = {
    mainContainer: {
        width: '90%',
        flexDirection: 'column',
        fontFamily: Fonts.primary,
    } as const,
    innerMainContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        fontFamily: Fonts.primary,
        padding: '50px',
        backgroundColor: 'transparent',
    } as const,
    qrNameContainer: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '30px',
    },
    generalSettingCard: {
        marginTop: '50px',
        backgroundColor: 'white',
    },
    generalSetting: {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '40px',
        paddingRight: '40px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '32px',
        fontWeight: 'bold',
        borderBottom: '1px solid rgb(0,0,0,0.1)',
    },
    answeredContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '40px',
        marginBottom: '40px',
    },
    uploadFieldContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '55%',
    },
    spinnerContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    } as const,
};

export const ItemStyles = {
    pageTitle: css`
        font-size: 38px;
        font-weight: bold;

        margin-bottom: 30px;
    `,
    backButton: css`
        background-color: transparent;
        margin-top: 10px;
        padding: 0px;
        width: auto;

        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-weight: bold;
        font-size: 14px;

        #backIcon {
            height: 25px;
            width: 25px;

            transition: 1s;
        }

        &:hover {
            #backIcon {
                transition: 0.3s;
                color: ${Colors.inactive}
            }
        }
    `,
    qrNameInput: css`
        border-bottom: 1px solid rgb(0,0,0,0.1);
        background-color: transparent;
        border-radius: 0px;
        margin-left: 20px;
        width: 500px;

        ::placeholder {
            font-weight: bold;
            color: #262626;
            opacity: 30%;
        }
    `,
    answeredText: css`
        font-size: 20px;
        font-weight: bold;
    `,
    answeredDescription: css`
        font-size: 18px;
        color: #888888;
        margin-top: 10px;
    `,
    templateFile: css`
        color: #888888;
    `,
    downloadCSV: css`
        text-decoration: underline;
    `,
    saveButton: css`
        background-color: #021778;
        color: white;

        border-radius: 0;

        width: 200px;
        height: 50px;

        font-size: 16px;
        font-weight: bold;
    `,
    downloadCsvButton: css`
        background-color: transparent;
        color: ${Colors.active};

        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 16px;

        width: 205px;

        &:hover {
            color: ${Colors.blue.primary}
        }
    `,
    uniqueCodesAttachedButton: css`
        background-color: transparent;
        color: ${Colors.active};

        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 16px;

        width: 260px;

        &:hover {
            color: ${Colors.blue.primary}
        }
    `,
    retryButton: css`
        background-color: #1998dd;
        color: white;

        border-radius: 10px;

        width: 200px;
        height: 50px;

        font-size: 16px;
        font-weight: bold;
    `,
    createSurveyButton: css`
        background-color: #021778;
        color: white;

        border-radius: 0;

        width: 250px;
        height: 50px;

        font-size: 16px;
        font-weight: bold;

        margin-top: 40px;
    `,
    surveyCategoryButtonIdle: css`
        background-color: transparent;
        color: #a5aab5;

        border-radius: 0;

        width: 400px;
        height: 50px;

        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0.8px;

        border-bottom: 1px solid #a5aab5;

        transition: 0s;
        transition: color 0.5s;

        &:hover {
            color: ${Colors.blue.secondary};
        }
    `,
    surveyCategoryButtonSelected: css`
        background-color: transparent;
        color: ${Colors.active};

        border-radius: 0;

        width: 400px;
        height: 50px;

        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0.8px;

        border-bottom: 5px solid ${Colors.active};

        transition: 0s;
        transition: color 0.5s;
    `,
    qrDetailsError: css`
        color: red;
        margin-bottom: 20px;
    `,
    surveyListError: css`
        color: ${Colors.red.primary}; 
        font-size: 20px;
    `,
};
