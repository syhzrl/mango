import { css } from 'styled-components';
import { StylesDictionary } from 'lib/StylesDictionary';
import Fonts from 'assets/themes/Fonts';
import Colors from 'assets/themes/Colors';

export const ContainerStyles: StylesDictionary = {
    mainContainer: {
        display: 'flex',
        marginTop: '50px',
        borderTop: '0.5px solid rgb(0,0,0,0.1)',
        width: '80%',
        flexDirection: 'column',
        fontFamily: Fonts.primary,
    },
    topContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '40px',
        width: '100%',
    },
    qrCardsContainer: {
        marginTop: '20px',
        width: '100%',
        padding: '20px',
    },
    spinnerContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export const ItemStyles = {
    newQrButton: css`
        background-color: #021778;
        color: white;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 0;

        width: 200px;
        height: 50px;

        font-size: 16px;
        font-weight: bold;

        &:hover {
            background-color: ${Colors.blue.primary}
        }
    `,
    pageTitle: css`
        font-size: 38px;
        font-weight: bold;

        max-width: 400px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `,
    qrArrayLength: css`
        margin-left: 20px; 
        color: #A5AAB5;
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
};
