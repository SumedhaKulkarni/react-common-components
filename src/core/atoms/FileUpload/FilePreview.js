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

    const [type, setType] = useState('');
    const [src, setSrc] = useState('');
    const [uploading, setUploading] = useState(null);
    const [preview, setPreview] = useState(null);

    const classes = [
        styles.previewItem,
        data.loading ? styles.disabled : ''
    ].join(' ').trim()

    const loadData = () => {
        if (!data) {
            return;
        }
        const reader = new FileReader();

        let fileType;
        if (data.type.match('text')) {
            fileType = 'text';
        } else if (data.type.match('image')) {
            fileType = 'image';
        } else {
            fileType = data.type;
        }

        reader.onload = (e) => {
            const fileSrc = e.target.result;
            setSrc(fileSrc);
            setType(fileType);
        }

        if (fileType === 'text') {
            reader.readAsText(data);

        } else if (fileType === 'image') {
            reader.readAsDataURL(data);
        } else {
            setSrc(false);
            setType(fileType);
        }
    }

    if (data.loading) {
        setUploading(<Loader />);
    } else {
        return;
    }

    if (type === 'text') {
        setPreview(<pre className={styles.preview}>{src}</pre>);
    } else if (type === 'image') {
        setPreview(<img alt='preview' src={src} className={styles.imagePreview} />);
    } else {
        setPreview(<pre className={styles.preview}>no preview</pre>);
    }

    loadData(data);

    return (
        <div className={classes}>
            {uploading}
            {preview}
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

const Loader = () => {
    return <div className={styles.loader}>
        <span className={styles.loaderItem} />
        <span className={styles.loaderItem} />
        <span className={styles.loaderItem} />
    </div>
}

export default FilePreview;