import React from 'react';
import './Error.css';

function Error(props) {

    const { errorCode } = props;

    function getErrorMessage() {
        switch(errorCode) {
            case 'grocery-list-not-found':
                return 'Oops, we couldn\'t find your grocery list. Try creating a new one.';
            case 'add-list-item-error':
                return 'Failed to add grocery item to list. Try again.';
            case 'create-list-error':
                return 'Failed to create the grocery list. Try again.';
            case 'add-user-to-list-error':
                return 'Failed to add user to the grocery list. Try again.';
            default:
                return;
        }
    }

    if (errorCode) {
        return (
            <p className="error">
                {getErrorMessage()}
            </p>
        );
    } 
    
    return null;
};

export default Error;