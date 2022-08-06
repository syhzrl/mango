import { StylesDictionary } from 'lib/StylesDictionary';
import { css } from 'styled-components';
import Colors from 'assets/themes/Colors';

export const ContainerStyles: StylesDictionary = {
    body: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        marginTop: '20px',
    },
    labels: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
};

export const ItemStyles = {
    input3: css`
        width: 100px;

        background-color: transparent;

        border-bottom: 1px solid black;

        border-radius: 0px;

        text-align: center;

        margin-bottom: 10px;
    `,
    input10: css`
        width: 30px;

        background-color: transparent;

        border-bottom: 1px solid black;

        border-radius: 0px;

        text-align: center;
    `,
    deleteButton: css`
        width: fit-content;
        height: fit-content;

        background-color: transparent;

        position: absolute;
        top: 0;
        right: 0;

        margin-top: 10px;
        margin-right: 5px;

        z-index: 1000;

        color: #A5AAB5;

        &:hover {
            color: ${Colors.red.primary};
        }

        #trash {
            height: 30px;
            width: 30px;
        }
    `,
};
