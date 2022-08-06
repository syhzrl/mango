import React from 'react';
import { css } from 'styled-components';
import { StylesDictionary } from 'lib/StylesDictionary';
import Fonts from 'assets/themes/Fonts';

export const ContainerStyles: StylesDictionary = {
    mainContainer: {
        background: 'linear-gradient(#1998dd, #031b7b)',
        height: '100vh',
        width: '250px',
        color: 'white',
        alignSelf: 'flex-start',
        position: 'sticky',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: Fonts.primary,
    },
};

export const ItemStyles = {
    sideMenuItem: css`
        background-color: transparent;
        color: white;
        border-radius: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 250px;
        height: 50px;

        font-size: 20px;

        justify-content: flex-start;

        padding-left: 40px;

        &:hover {
            background-color: #e0e0e0;
            color: #1998dd;
        }

        &:focus {
            background-color: white;
            color: #1998dd;
        }

        #icon {
            width: 20px;
            height: 20px;

            margin-right: 10px;
        }
    `,

    sideMenuItemSelected: css`
        background-color: white;
        color: #1998dd;
        border-radius: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 250px;
        height: 50px;

        font-size: 20px;

        justify-content: flex-start;

        padding-left: 40px;

        #icon {
            width: 20px;
            height: 20px;

            margin-right: 10px;
        }
    `,

    LogOutButton: css`
        background-color: transparent;
        color: white;
        border-radius: 0;
        margin-bottom: 20px;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 250px;
        height: 50px;

        font-size: 20px;

        position: absolute;
        bottom: 0;

        #icon {
            width: 20px;
            height: 20px;

            margin-right: 10px;
        }

        &:hover {
            background-color: #e0e0e0;
            color: #031b7b;
        }
    `,
};
