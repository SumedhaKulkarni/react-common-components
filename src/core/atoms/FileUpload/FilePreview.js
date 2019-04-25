import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
    node, string, bool, func, arrayOf, number
} from 'prop-types';
import './FileUpload.css';

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

    return (
        <div className={classes}>
            <div className={styles.fileNameStretch}>{data.name}</div>
            <button className={styles.button}
                onClick={onRemove}>
                remove
        </button>
            <button className={styles.button}
                onClick={onUpload}>
                upload
        </button>
        </div>
    );
}

export default FilePreview;