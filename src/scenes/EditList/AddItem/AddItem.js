import React, { useState } from 'react';
import './AddItem.css';

function AddItem() {

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [users] = useState([{name: 'Brian'}, {name: 'Holly'}, {name: 'Steve'}]);

    function getUserButtonList() {
        const userList = users.map(user => <button key={user.name}>{user.name}</button>);
        return (
            <div className="button-group">
                {userList}
            </div>
        );
    }

    function addItem(e) {
        e.preventDefault();
        setHasError(false);

        const itemDesc = document.addItemForm.itemDesc.value;
        if (itemDesc) {
            // save item to Firestore collection
            const timestamp = new Date().getTime();
            console.log(`Adding item ${itemDesc}, timestamp = ${timestamp}`);

            document.addItemForm.reset();
        } else {
            setHasError(true);
            setErrorMessage('Item description required');
        }
    }

    return (
        <form name="addItemForm">
            <h3>I am...</h3>
            {getUserButtonList()}
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