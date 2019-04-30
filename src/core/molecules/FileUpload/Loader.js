import React from 'react';
import './Loader.css'

function Loader({
    showLoader
}) {
    return (
        <div className="lds-spinner">
            <div /><div /><div /><div /><div /><div /><div />
            <div /><div /><div /><div /><div />
        </div>
    );
}

export default Loader;