import { css } from 'styled-components';
import { StylesDictionary } from 'lib/StylesDictionary';
import Colors from 'assets/themes/Colors';

export const ContainerStyles: StylesDictionary = {
    surveyCard: {
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
    },
    mainContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '30px',
        paddingBottom: '30px',
        paddingRight: '20px',
    },
    toggleAndLangDropdownContainer: {
        height: '100%',
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    toggleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '10px',
    },
    nameAndDescContainer: {
        height: '100%',
        width: '65%',
        borderRadius: '0px',

        textAlign: 'left',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    spinnerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    collapsibleChevronContainer: {
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        borderRight: '1px solid rgb(0,0,0,0.2)',
        marginRight: '10px',
    },
    questionCardContainer: {
        backgroundColor: 'white',
        width: '100%',
        padding: '60px',
    },
    createQuestionErrorContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.red.primary,
    },
};

export const ItemStyles = {
    editSurveyButton: css`
        width: fit-content;
        height: fit-content;

        display: flex;
        justify-content: center;
        align-items: center;

        color: #A5AAB5;

        transition: color ease 0.5s;

        &:hover {
            color: ${Colors.blue.primary};
        }

        #pencil {
            height: 20px;
            width: 20px;
        }


    `,
    deleteSurveyButton: css`
        width: fit-content;
        height: fit-content;

        display: flex;
        justify-content: center;
        align-items: center;

        color: #A5AAB5;

        transition: color ease 0.5s;

        &:hover {
            color: ${Colors.red.primary};
        }

        #trash {
            height: 20px;
            width: 20px;
        }


    `,
    surveyCollapsibleButton: css`
        height: 100%;
        width: 70%;

        border-radius: 0px;

        text-align: left;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    `,
    statusText: css`
        margin-right: 15px;
        color: #888888; 
        font-size: 15px;
    `,
    titleInput: css`
        border: 1px solid rgb(0,0,0,0.1);
        border-radius: 5px;
        font-size: 32px; 
        font-weight: bold;
        width: 100%;
    `,
    titleInputError: css`
        border: 1px solid ${Colors.red.primary};
        border-radius: 5px;
        font-size: 32px; 
        font-weight: bold;
        width: 100%;
    `,
    descInput: css`
        border: 1px solid rgb(0,0,0,0.1);
        font-size: 15px; 
        color: #888888;
        width: 100%;
    `,
    descInputError: css`
        border: 1px solid ${Colors.red.primary};
        font-size: 15px; 
        color: #888888;
        width: 100%;
    `,
    saveButton: css`
        background-color: #021778;
        color: white;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 0;

        width: 150px;
        height: 50px;

        font-size: 16px;
        font-weight: bold;
    `,

    cancelButton: css`
        background-color: #A5AAB5;
        color: white;

        border-radius: 0;

        width: 150px;
        height: 50px;

        font-size: 16px;
        font-weight: bold;
    `,

    chevronButton: css`
        width: fit-content;
        height: 100%;

        background-color: transparent;

        #chevron {
            transition: 0.3s;
        }
    `,
    chevronButtonDown: css`
        width: fit-content;
        height: 100%;

        background-color: transparent;

        #chevron {
            transform: rotate(90deg);

            transition: 0.3s;
        }
    `,
    modalConfirmButton: css`
        background-color: ${Colors.blue.primary};
        color: white;

        border-radius: 5px;

        font-size: 16px;

        transition: background-color ease 0.3s;

        &:hover {
            background-color: ${Colors.blue.secondary};  
        }
    `,
    modalCancelButton: css`
        background-color: ${Colors.red.primary};
        color: white;

        border-radius: 5px;

        font-size: 16px;

        transition: background-color ease 0.3s;

        &:hover {
            background-color: ${Colors.red.secondary};  
        }
    `,

    editSurveyError: css`
        color: ${Colors.red.primary};
        font-size: 16px;
        margin-bottom: 10px;
    `,

    enableSurveyError: css`
        color: ${Colors.red.primary};
        font-size: 16px;
    `,

    createNewQuestionButton: css`
        height: 80px;
        width: 250px;

        font-size: 16px;

        font-weight: bold;

        background-color: ${Colors.active};
        color: white;
    `,
};
