import React from 'react';
import './CreateList.css';

function CreateList(props) {

    const { createList } = props;

    // create new grocery list on Firebase, reload browser with new permanent URL
    function createNewList(e) {
        e.preventDefault();
        createList(document.createListForm.userName.value);
    }

    return (
        <div>
            <header>
                <h1>Welcome to the Grocery List app!</h1>
            </header>
            <div className="create-container">
                <div>
                    <form name="createListForm">
                        <p><label>What is your name?</label></p>
                        <p><input type="text" name="userName" /></p>
                        <p><button onClick={createNewList}>Create a new grocery list</button></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateList;