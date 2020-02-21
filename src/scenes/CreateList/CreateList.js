import React from 'react';
import './CreateList.css';

function CreateList() {
    
    // create new grocery list on Firebase, reload browser with new permanent URL
    function createNewList() {
        const listId = 3;
        window.location.href=`/?list=${listId}`;
    }

    return (
        <div>
            <header>
                <h1>Create a new grocery list</h1>
            </header>
            <div className="container">
                <button onClick={createNewList}>Create Grocery List</button>
            </div>
        </div>
    );
}

export default CreateList;