import React from 'react';
import clsx from 'clsx';
import {
  string, object, func,
} from 'prop-types';
import Button from '../../atoms/Button/Button';
import Loader from './Loader';
import './FileUpload.css';

const STATE_UPLOADING = 'uploading';
const STATE_UPLOADED = 'uploaded';

const styles = {
  previews: 'previews',
  preview: 'preview',
  disabled: 'disabled',
  previewItem: 'preview-item',
  fileNameStretch: 'file-name spacer',
  button: 'button',
};

function FilePreview({
  data,
  onRemove,
  onUpload,
  uploadSingleButtonText,
  removeButtonText,
}) {
  const { state } = data;

  return (
    <div className={clsx(styles.previewItem, data.loading ? styles.disabled : '', state)}>
      <div className={styles.fileNameStretch}>{data.name}</div>
      {state === STATE_UPLOADING && <Loader />}
      {state !== STATE_UPLOADING && state !== STATE_UPLOADED && (
        <Button
          size="small"
          classname={styles.button}
          disabled={state === STATE_UPLOADING || state === STATE_UPLOADED}
          handleClick={onRemove}
        >
          {removeButtonText}
        </Button>
      )}
      {state !== STATE_UPLOADING && state !== STATE_UPLOADED && (
        <Button
          size="small"
          classname={styles.button}
          disabled={state === STATE_UPLOADING || state === STATE_UPLOADED}
          handleClick={onUpload}
        >
          {uploadSingleButtonText}
        </Button>
      )}
    </div>
  );
}

FilePreview.propTypes = {
  onRemove: func,
  onUpload: func,
  removeButtonText: string,
  uploadSingleButtonText: string,
  data: object, // eslint-disable-line react/forbid-prop-types
};

FilePreview.defaultProps = {
  onRemove: () => { },
  onUpload: () => { },
  removeButtonText: 'Remove',
  uploadSingleButtonText: 'Upload',
  data: {},
};

export default FilePreview;
