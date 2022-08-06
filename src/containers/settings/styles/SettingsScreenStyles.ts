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
    label: css`
        margin-bottom: 10px;
    `,

    submitButton: css`
        background-color: ${Colors.blue.primary};
        color: white;
        font-size: 18px;
        width: 120px;
        border-radius: 5px;
    `,

    title: css`
        font-size: 32px;
        font-weight: bold;
        margin-top: 20px;
    `,
};
