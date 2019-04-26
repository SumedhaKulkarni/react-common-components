import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
    string, bool, func, arrayOf, number
} from 'prop-types';
import Button from '../Button/Button';
import FilePreview from './FilePreview';
import './FileUpload.css';

const STATE_UPLOADING = 'uploading';
const STATE_UPLOADED = 'uploaded';
const STATE_FAILED = 'failed';

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
    allowUpload,
    numberLimit,
    maxSize,
    label,
    supportedFileTypes,
    uploadedFilesArray,
    onUploadSuccess,
    onUploadFailure,
    onUploadClick,
    onUploadAllClick,
    buttonClasses,
    chooseButtonText,
    uploadAllButtonText,
    uploadSingleButtonText,
    removeButtonText
}) {

    const [fileList, setFileList] = useState([]);
    const [fileNames, setFileNames] = useState('No file chosen');
    const [hoverState, setHoverState] = useState('');
    let textInput = null;

    useEffect(() => {
        handleFileNames();
    }, [fileList]);

    useEffect(() => {
        console.log(uploadedFilesArray)
        const list = fileList.map(file => {
            if (uploadedFilesArray.indexOf(file) > -1) {
                file.state = STATE_UPLOADED;
            }
            return file;
        })
        setFileList(list);
    }, [uploadedFilesArray]);

    const handleFileSelect = (e) => {
        handleDragOver(e);
        const files = e.target.files || e.dataTransfer.files;
        let fileList = Object.keys(files).map((file, index) => {
            const fileObj = files[file];
            const extension = getExtFromName(fileObj.name);
            if (index >= numberLimit || fileObj.size > maxSize || supportedFileTypes.indexOf(extension) === -1) {
                return undefined;
            }
            return fileObj;
        });
        fileList = fileList.filter(item => item !== undefined);
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
            setHoverState('');;
        }
    };

    const getExtFromName = (name) => {
        const parts = name.split('.');
        return parts[parts.length - 1];
    };

    const selectFile = (e) => {
        e.preventDefault();
        textInput.click(e);
    };

    const uploadAllFiles = () => {
        if (!allowUpload) {
            onUploadAllClick(fileList);
            return;
        }
        fileList.forEach(file => {
            uploadFile(file);
        });
    };

    const removeItem = (index) => {
        let list = fileList.filter((item, i) => {
            return i !== index
        });
        setFileList(list);
    };

    const changeFileStatus = (index, status) => {
        const list = fileList.map((item, i) => {
            if (i === index) {
                item.state = status
            }
            return item;
        })
        setFileList(list);
    };

    const uploadFile = (file) => {
        if (!allowUpload) {
            onUploadClick(file);
            return;
        }
        if (file.state === STATE_UPLOADING || file.state === STATE_UPLOADED) {
            return;
        }
        const index = fileList.indexOf(file);
        changeFileStatus(index, STATE_UPLOADING);

        const formData = new FormData();
        formData.append('file', file);
        const req = new XMLHttpRequest();

        req.upload.addEventListener("progress", event => {
            if (event.lengthComputable) {

            }
        });

        req.upload.addEventListener("load", event => {

        });

        req.upload.addEventListener("error", event => {

        });

        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200 && req.statusText === 'OK') {
                    changeFileStatus(index, STATE_UPLOADED);
                    onUploadSuccess(file, req.responseText);
                } else {
                    changeFileStatus(index, STATE_FAILED);
                    onUploadFailure(file, req.responseText);
                }
            }
        }
        req.open("POST", uploadUrl);
        req.send(formData);
    };

    return (
        <div>
            <input type='hidden' name={`maxSize`} value={maxSize} />
            <div className="input-wrapper-parent">
                <label>
                    <span>{label}</span>
                    <div className={clsx('drop_zone', hoverState)}
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
                                <Button classname={clsx(styles.button, buttonClasses)}
                                    handleClick={selectFile}>
                                    {chooseButtonText}
                                </Button>
                                <span className={styles.fileName}>{fileNames}</span>
                            </div>
                        </div>
                        <span className={styles.helpText}>or drop files here</span></div>
                </label>
                <Button classname={clsx(styles.button, buttonClasses)}
                    disabled={fileList.length === 0}
                    handleClick={uploadAllFiles}>
                    {uploadAllButtonText}
                </Button>

            </div>
            <div className={styles.previews}>
                {
                    fileList.map((file, index) => {
                        return (
                            <FilePreview key={index}
                                data={file}
                                uploadSingleButtonText={uploadSingleButtonText}
                                removeButtonText={removeButtonText}
                                onRemove={() => removeItem(index)}
                                onUpload={() => uploadFile(file)} />
                        );
                    })
                }
            </div>
        </div>
    );
}

FileUpload.prototype = {
    uploadUrl: string.isRequired,
    multiple: bool,
    numberLimit: number,
    maxSize: number,
    allowUpload: bool,
    label: string,
    supportedFileTypes: arrayOf(string),
    onUploadSuccess: func,
    onUploadFailure: func,
    onUploadClick: func,
    onUploadAllClick: func,
    buttonClasses: string,
    chooseButtonText: string,
    uploadAllButtonText: string,
    uploadSingleButtonText: string,
    removeButtonText: string
};

FileUpload.defaultProps = {
    uploadUrl: 'http://127.0.0.1:3010/upload',
    multiple: true,
    numberLimit: 5,
    allowUpload: true,
    maxSize: 5 * 1024 * 1024,
    supportedFileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'zip', 'xlsx'],
    onUploadSuccess: () => { },
    onUploadFailure: () => { },
    onUploadClick: () => { },
    onUploadAllClick: () => { },
    chooseButtonText: 'Choose Files',
    uploadAllButtonText: 'Upload All',
    uploadSingleButtonText: 'Upload',
    removeButtonText: 'Remove'
};

export default FileUpload;
