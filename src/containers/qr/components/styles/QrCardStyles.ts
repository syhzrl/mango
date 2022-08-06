import { css } from 'styled-components';
import { StylesDictionary } from 'lib/StylesDictionary';
import Colors from 'assets/themes/Colors';

export const ContainerStyles = {
    QrCard: {
        backgroundColor: 'white',
        width: '100%',
        display: 'flex',
        marginBottom: '20px',
        padding: '15px 20px 15px 30px',
        justifyContent: 'space-between',
    },
    infoContainer: {
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    } as const,
    buttonsContainer: {
        width: '5%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    } as const,
    leftInfoContainer: {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        color: '#A5AAB5',
        fontSize: '15px',
    } as const,
    rightInfoContainer: {
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    numberOfScansContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderLeft: '1px solid rgb(0,0,0,0.1)',
        marginLeft: '20px',
        paddingLeft: '10px',
        height: '80%',
    } as const,
};

export const ItemStyles = {
    cardTitle: css`
        font-size: 30px;
        font-weight: bold;
    `,
    noOfScans: css`
        font-size: 25px;
        font-weight: bold;
    `,
    scansLabel: css`
        font-size: 15px;
        color: #A5AAB5;
    `,
    moreDetailsButton: css`
        width: 100%;
        background-color: transparent;
        padding: 0px;
        margin: 0px;

        color: ${Colors.active};
        font-weight: bold;

        &:hover {
            text-decoration: underline;
            color: ${Colors.inactive};
        }
    `,
    iconButtons: css`
        color: #A5AAB5;

        background-color: transparent;

        #pencil {
            height: 23px;
            width: 23px;

            transition: 0.3s;

            &:hover {
                color: ${Colors.inactive}
            }
        }

        #download {
            height: 23px;
            width: 23px;

            transition: 0.3s;

            &:hover {
                color: ${Colors.active}
            }
        }

        #trash {
            height: 23px;
            width: 23px;

            transition: 0.3s;

            &:hover {
                color: ${Colors.red.primary}
            }
        }
    `,
};
