import { StylesDictionary } from 'lib/StylesDictionary';
import { css } from 'styled-components';

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
    input: css`
        width: 100px;

        background-color: transparent;

        border-bottom: 1px solid black;

        border-radius: 0px;

        text-align: center;
    `,
};
