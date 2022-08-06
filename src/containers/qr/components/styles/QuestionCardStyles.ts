import { css } from 'styled-components';
import Colors from 'assets/themes/Colors';
import { StylesDictionary } from 'lib/StylesDictionary';

export const ContainerStyles: StylesDictionary = {
    card: {
        backgroundColor: '#f6f6f6',
        width: '100%',
        display: 'flex',
        marginBottom: '20px',
        minHeight: '100px',
    },
    upDownChevronContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '5%',
        borderRight: '1px solid #A5AAB5',
    },
    titleAndBodyContainer: {
        width: '100%',
        padding: '10px',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titleContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
    },
    typeSelectorAndImg: {
        display: 'flex',
        alignItems: 'center',
    },
    questionBodyContainer: {
        backgroundColor: 'transparent',
        height: '100%',
    },
    sideButtonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '20px',
        marginTop: '20px',
        marginBottom: '20px',
    },
};

export const ItemStyles = {
    uploadImageButton: css`
        width: fit-content;
        height: fit-content;

        margin-left: 20px;

        color: #A5AAB5;

        background-color: transparent;

        &:hover {
            color: ${Colors.inactive};
        }

        #image {
            height: 25px;
            width: 25px;
        }
    `,
    uploadImageButtonDisabled: css`
        width: fit-content;
        height: fit-content;

        margin-left: 20px;

        color: transparent;

        background-color: transparent;

        cursor: default;

        #image {
            height: 25px;
            width: 25px;
        }
    `,
    questionTitle: css`
        font-size: 18px;
        font-weight: bold;

        width: 100%;
    `,
    questionInput: css`
        border-bottom: 1px solid #262626;
        border-radius: 0px;

        width: 100%;
        
        font-size: 18px;
        font-weight: bold;

        background-color: transparent;
    `,
    questionInputError: css`
        border-bottom: 1px solid ${Colors.red.primary};
        border-radius: 0px;

        width: 100%;

        font-size: 18px;
        font-weight: bold;

        background-color: transparent;
    `,
    chevronButton: css`
        width: 100%;
        height: 50%;

        color: #A5AAB5;

        background-color: transparent;
    `,
    chevronButtonDisabled: css`
        width: 100%;
        height: 50%;

        color: transparent;

        cursor: default;

        background-color: transparent;
    `,
    plusButton: css`
        width: fit-content;
        height: fit-content;

        background-color: transparent;

        margin-bottom: 30px;

        color: #A5AAB5;

        transition: color ease 0.3s;

        &:hover {
            color: ${Colors.blue.primary};
        }

        #plus {
            width: 20px;
            height: 20px;
        }
    `,

    editButton: css`
        width: fit-content;
        height: fit-content;

        background-color: transparent;

        margin-bottom: 30px;

        color: #A5AAB5;

        transition: color ease 0.3s;

        &:hover {
            color: ${Colors.inactive};
        }

        #pencil {
            width: 20px;
            height: 20px;
        }
    `,

    deleteButton: css`
        width: fit-content;
        height: fit-content;

        background-color: transparent;

        color: #A5AAB5;

        transition: color ease 0.3s;

        &:hover {
            color: ${Colors.red.primary};
        }

        #trash {
            width: 20px;
            height: 20px;
        }

        margin-bottom: 30px;
    `,
    updatedAt: css`
        margin-top: 20px;
        color: #A5AAB5;
    `,
    updateError: css`
        color: ${Colors.red.primary};
    `,

    controlButtonsDisabled: css`
        width: fit-content;
        height: fit-content;

        background-color: transparent;

        margin-bottom: 30px;

        color: transparent;

        cursor: default;
    `,
};
