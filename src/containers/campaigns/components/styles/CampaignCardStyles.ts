import { css } from 'styled-components';
import { StylesDictionary } from 'lib/StylesDictionary';
import Fonts from 'assets/themes/Fonts';

export const ContainerStyles: StylesDictionary = {
    card: {
        backgroundColor: 'white',
        width: '95%',
        height: '100%',
        marginBottom: '20px',
        display: 'flex',
        padding: '5px',
        paddingTop: '10px',
        paddingBottom: '10px',
        fontFamily: Fonts.primary,
    },
    cardDisabled: {
        backgroundColor: 'white',
        width: '100%',
        padding: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        fontFamily: Fonts.primary,
    },
    cardTitle: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5px',
        width: '600px',

        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    createdAtContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        color: '#A5AAB5',
        fontSize: '15px',
    },
    verticalLine: {
        borderLeft: '0.5px solid rgb(0,0,0,0.1)',
        height: '60px',
        marginLeft: '60%',
        marginRight: '20px',
    },
    clockIcon: {
        width: '15px',
        height: '15px',
        marginRight: '10px',
    },
};

export const ItemStyles = {
    mainButton: css`
        background-color: white;
        width: 100%;
        height: 100%;
        border-radius: 0px;
        padding-left: 20px;
        color: black;
    `,
    pageTitle: css`
        font-size: 42px;
        font-weight: bold;
    `,
    cardTitle: css`
        font-size: 25px;
        font-weight: bold;
        width: 100;
    `,
    noOfScans: css`
        font-size: 25px;
        font-weight: bold;
    `,
    scansLabel: css`
        font-size: 15px;
        color: #A5AAB5;
    `,
    editButton: css`
        width: 100%;

        color: #A5AAB5;

        background-color: transparent;

        &:hover {
            color: #1998dd;
        }

        #icon {
            height: 20px;
            width: 20px;
        }
    `,
    deleteButton: css`
        width: 100%;

        color: #A5AAB5;

        background-color: transparent;

        &:hover {
            color: #D82148;
        }

        #icon {
            height: 20px;
            width: 20px;
        }
    `,
    activeChip: css`
        width: 100px;
        height: 50px;

        border-radius: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        color: white;

        background-color: green;
    `,

    inactiveChip: css`
        width: 100px;
        height: 50px;

        border-radius: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        color: white;

        background-color: red;
    `,
};
