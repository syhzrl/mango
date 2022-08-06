import { css } from 'styled-components';
import { StylesDictionary } from 'lib/StylesDictionary';
import Fonts from 'assets/themes/Fonts';

export const ContainerStyles: StylesDictionary = {
    mainContainer: {
        display: 'flex',
        marginTop: '50px',
        borderTop: '0.5px solid rgb(0,0,0,0.1)',
        width: '80%',
        fontFamily: Fonts.primary,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
    },
    campaignCardsContainer: {
        padding: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
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
    newCampaignButton: css`
        background-color: #021778;
        color: white;

        border-radius: 0;

        width: 200px;
        height: 50px;

        font-size: 16px;
        font-weight: bold;
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
