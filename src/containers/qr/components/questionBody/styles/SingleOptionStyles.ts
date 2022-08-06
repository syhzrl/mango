import { StylesDictionary } from 'lib/StylesDictionary';
import { css } from 'styled-components';
import Colors from 'assets/themes/Colors';

export const ContainerStyles: StylesDictionary = {
    radioContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    radioContainerLast: {
        display: 'flex',
        alignItems: 'center',
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        padding: '20px',
        marginTop: '20px',
    },
};

export const ItemStyles = {
    addOptionButton: css`
        background-color: transparent;

        width: fit-content;

        color: #A5AAB5;

        transition: 0.3s;

        &:hover {
            color: ${Colors.active};

            text-decoration: underline;
        }
    `,
    orText: css`
        margin-right: 5px;
        margin-left: 5px;
    `,
    input: css`
        background-color: rgb(0,0,0,0.2);

        border-radius: 0px;

        width: 300px;
    `,
    inputError: css`
        background-color: rgb(0,0,0,0.2);

        border: 1px solid ${Colors.red.primary};

        border-radius: 0px;

        width: 300px;
    `,
    rewardCopy: css`
        background-color: rgb(0,0,0,0.2);

        border-radius: 0px;

        width: 600px;
    `,
    rewardCopyError: css`
        background-color: rgb(0,0,0,0.2);

        border: 1px solid ${Colors.red.primary};

        border-radius: 0px;

        width: 600px;
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
    yesNoCopy: css`
        color: #A5AAB5;
    `,
};
