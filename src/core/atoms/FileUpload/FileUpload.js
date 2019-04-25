import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
    node, string, bool, func, arrayOf, number
} from 'prop-types';
import FilePreview from './FilePreview';
import './FileUpload.css';

const id = `check${Math.floor(100000 + Math.random() * 900000)}`;
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

function FileUpload({
    uploadUrl,
    multiple,
    limit,
    maxSize,
    label,
    supportedFileTypes,
    onUploadSuccess,
    onUploadFailure
}) {

    const [fileList, setFileList] = useState([]);
    const [fileNames, setFileNames] = useState('No file chosen');
    const [hoverState, setHoverState] = useState(null);
    let textInput = null;

    useEffect(() => {
        handleFileNames();
    }, [fileList]);

    const handleFileSelect = (e) => {
        handleDragOver(e);
        const files = e.target.files || e.dataTransfer.files;
        const fileList = Object.keys(files).map(file => files[file]);
        setFileList(fileList);
    };

    const handleFileNames = () => {
        if (fileList.length === 0) {
            setFileNames('No file chosen');
        } else if (fileList.length === 1) {
            setFileNames(fileList[0].name);
        } else {
            setFileNames(`${fileList.length} files`)
        }
    }

    const handleDragOver = (e) => {
        if ('preventDefault' in e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (e.type === 'dragover') {
            setHoverState(styles.hover);
        } else {
            return;
        }
    };

    const selectFile = (e) => {
        e.preventDefault();
        textInput.click(e);
    };

    const uploadFiles = () => {
        fileList.forEach(file => {
            uploadFile(file).then(() => {
                removeFile(file);
            });
        });
    };

    const removeItem = (index) => {
        let list = fileList.filter((item, i) => {
            return i !== index
        });
        setFileList(list);
    };

    const removeFile = (file) => {
        const fileList = fileList;
        const index = fileList.indexOf(file);
        removeItem(index);
    };

    const uploadFile = (file) => {
        const index = fileList.indexOf(file);
        const list = fileList.map((item, i) => {
            if (i === index) {
                item.state = STATE_UPLOADING
            }
            return item;
        })
        setFileList(list);

        const url = 'http://127.0.0.1:3010/upload';
        const formData = new FormData();
        formData.append('file', file);

        // fetch(url, {
        //     method: "post",
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     },
        //     body: formData
        // })
        //     .then((response) => {
        //         //do something awesome that makes the world a better place
        //     });
        const req = new XMLHttpRequest();
        req.open("POST", url);
        req.send(formData);
    };

    return (
        <div>
            <input type='hidden' name={`maxSize`} value={maxSize} />
            <div>
                <label>
                    <span>{label}</span>
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragOver}
                        onDrop={handleFileSelect}>
                        <div className={styles.inputWrapper}>
                            <input type='file'
                                tabIndex='-1'
                                ref={(input) => { textInput = input; }}
                                className={styles.input}
                                multiple={multiple}
                                onChange={handleFileSelect} />
                            <div className={styles.inputCover}>
                                <button className={styles.button}
                                    type='button'
                                    onClick={selectFile}>
                                    Choose Files
                                </button>
                                <span className={styles.fileName}>{fileNames}</span>
                            </div>
                        </div>
                        <span className={styles.helpText}>or drop files here</span></div>
                </label>
                <button className={styles.button}
                    type='button'
                    onClick={uploadFiles}>
                    Upload All
            </button>
                <div className={styles.previews}>
                    {
                        fileList.map((file, index) => {
                            return (
                                <FilePreview key={index}
                                    data={file}
                                    onRemove={() => removeItem(index)}
                                    onUpload={() => uploadFile(file)} />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

FileUpload.prototype = {
    uploadUrl: string.isRequired,
    multiple: bool,
    limit: number,
    maxSize: number,
    label: string,
    supportedFileTypes: arrayOf(string),
    onUploadSuccess: func,
    onUploadFailure: func,
};

FileUpload.defaultProps = {
    uploadUrl: '',
    multiple: true,
    limit: 1,
    onUploadSuccess: () => { },
    onUploadFailure: () => { },
};

export default FileUpload;
