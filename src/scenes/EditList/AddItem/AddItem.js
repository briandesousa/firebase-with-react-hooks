import React, { useState } from 'react';
import './AddItem.css';

function AddItem(props) {

    const { addListItem } = props;

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function addItem(e) {
        e.preventDefault();
        setHasError(false);

        const itemDesc = document.addItemForm.itemDesc.value;
        if (itemDesc) {
            addListItem(itemDesc);
            document.addItemForm.reset();
        } else {
            setHasError(true);
            setErrorMessage('Item description required');
        }
    }

    return (
        <form name="addItemForm">
            <h3>I want...</h3>
            <input type="text" name="itemDesc" />
            <button type="submit" onClick={addItem}>Add</button>
            <p style={{display: hasError ? 'block' : 'none'}} className="formError">
                {errorMessage}
            </p>
        </form>
    );
}

export default AddItem;