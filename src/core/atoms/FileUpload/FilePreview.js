import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
    node, string, bool, func, arrayOf, number
} from 'prop-types';
import './FileUpload.css';

const STATE_UPLOADING = 'uploading';
const STATE_UPLOADED = 'uploaded';

const styles = {
    inputWrapper: 'input-wrapper',
    inputCover: 'input-cover',
    helpText: 'help-text',
    fileName: 'file-name',
    fileNameStretch: 'file-name spacer',
    fileExt: 'file-ext',
    fileDrag: 'file-drag',
    input: 'input',
    loader: 'loader',
    disabled: 'disabled',
    loading: 'loading',
    loaderItem: 'loader-item',
    spacer: 'spacer',
    button: 'button',
    hover: 'hover',
    imagePreview: 'image-preview',
    preview: 'preview',
    previewItem: 'preview-item',
    previews: 'previews'
};

function FilePreview({
    data,
    onRemove,
    onUpload
}) {

    const classes = [
        styles.previewItem,
        data.loading ? styles.disabled : ''
    ].join(' ').trim();
    const { state } = data;
    return (
        <div className={classes}>
            <div className={styles.fileNameStretch}>{data.name}</div>
            {state === STATE_UPLOADING && <Loader />}
            {state !== STATE_UPLOADING && <button className={styles.button}
                disabled={state === STATE_UPLOADING || state === STATE_UPLOADED}
                onClick={onRemove}>
                remove
            </button>}
            {state !== STATE_UPLOADING && <button className={styles.button}
                disabled={state === STATE_UPLOADING || state === STATE_UPLOADED}
                onClick={onUpload}>
                upload
            </button>}
        </div>
    );
}

const Loader = () => {
    return <div class="lds-spinner">
        <div></div><div></div><div></div><div>
        </div><div></div><div></div><div></div>
        <div></div><div></div><div></div><div>
        </div><div></div>
    </div>
}

export default FilePreview;