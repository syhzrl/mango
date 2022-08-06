import React, { FunctionComponent, SyntheticEvent, RefObject } from 'react';
import { css } from 'styled-components';

import { StylesDictionary } from 'lib/StylesDictionary';
import Fonts from 'assets/themes/Fonts';

import Button from './Button';
import Text from './Text';

interface UploadFieldProps {
    onClick: () => void;
    onChange: (event: SyntheticEvent) => void;
    reference: RefObject<HTMLInputElement>;
    fileName: string;
    accept?: string;
    multiple?: boolean;
}

const UploadField: FunctionComponent<UploadFieldProps> = (props: UploadFieldProps) => {
    const { onClick, onChange, reference, fileName, accept = '', multiple = false } = props;
    return (
        <div style={ContainerStyles.mainContainer}>

            <input
                accept={accept}
                type='file'
                style={{ display: 'none' }}
                ref={reference}
                onChange={e => onChange(e)}
                multiple={multiple}
            />

            <Button onClick={onClick} css={styles.uploadButton}>
                <Text>CHOOSE FILE</Text>
            </Button>

            <div style={ContainerStyles.fileNameContainer}>
                <Text css={styles.fileName}>{fileName}</Text>
            </div>
        </div>
    );
};

UploadField.defaultProps = {
    accept: '',
    multiple: false,
};

const ContainerStyles: StylesDictionary = {
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        fontFamily: Fonts.primary,
        width: '500px',
    },
};

const styles = {
    uploadButton: css`
        background-color: #d8dce5;
        font-weight: bold;
        border-radius: 0;
        width: 180px;
    `,
    fileName: css`
        margin-left: 20px;
        color: #888888;
    `,
};

UploadField.defaultProps = {
    accept: '',
};

export default UploadField;
