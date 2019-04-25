import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
    node, string, bool, func, arrayOf, number
} from 'prop-types';
import FilePreview from './FilePreview';
import './FileUpload.css';

const id = `check${Math.floor(100000 + Math.random() * 900000)}`;

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
    const [fileExt, setFileExt] = useState('');
    const [fileNames, setFileNames] = useState('No file chosen');
    const [hoverState, setHoverState] = useState(null);
    let textInput = null;
    const dragClasses = [
        styles.fileDrag,
        hoverState
    ].join(' ').trim();

    useEffect(() => {
        handleFileNames();
        console.log('use effect called', fileList)
    }, [fileList]);

    const handleFileSelect = (e) => {
        handleDragOver(e);
        const files = e.target.files || e.dataTransfer.files;
        const fileList = Object.keys(files).map(file => files[file]);
        setFileList(fileList);
    };

    const handleFileNames = () => {
        console.log(fileList.length)
        if (fileList.length === 0) {
            return;
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
        //console.log(fileList)
    };

    const removeItem = (index) => {
        // console.log(index)
        // let list = fileList;
        // list.splice(index, 1);
        setFileList(fileList.splice(index, 1));
    };

    const removeFile = (file) => {
        const fileList = fileList;
        const index = fileList.indexOf(file);
        removeItem(index);
    };

    const uploadFile = (file) => {
        console.log(fileList)
        // uploadFile(file).then(() => {
        //     removeFile(file);
        // });
    }

    const previews = () => {
        return fileList.map((file, index) => {
            const removeFileFromPreview = () => {
                removeItem(index);
            };
            return (
                <FilePreview key={index}
                    data={file}
                    onRemove={removeFileFromPreview}
                    onUpload={uploadFile} />
            );
        });
    };

    return (
        <div>
            <input type='hidden' name={`maxSize`} value={maxSize} />
            <div>
                <label>
                    <span>{label}</span>
                    <div className={dragClasses}
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
                            { console.log('inside render', index) }
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
