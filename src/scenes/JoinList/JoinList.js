
import React from 'react';
import './JoinList.css';


function JoinList(props) {

    const { selectUser, users } = props;
    
    function getUserButtonList() {
        const buttonList = users.map((user) => {
            return (
                <button key={user.name} onClick={addExistingUser}>{user.name}</button>
            );
        });

        return <div className="button-group">{buttonList}</div>;
    }

    function addExistingUser(e) {
        e.preventDefault();
        selectUser(e.target.innerText);
    }

    function addNewUser(e) {
        e.preventDefault();

        const userName = document.addUserToListForm.name.value;
        if (userName) {
            selectUser(userName);
            document.addUserToListForm.reset();
        } else {
            alert('user name is required');
        }
    }

    return (
        <div>
            <header>
                <h1>Welcome to the Grocery List app!</h1>
            </header>
            <div className="join-container">
                <div>
                    <form name="addUserToListForm">
                        <p>Select your name if you previously joined the list...</p>
                        {getUserButtonList()}
                        <p>... or enter your name to join the list for the first time.</p>
                        <input type="text" name="name" />
                        <button onClick={addNewUser}>Join</button>
                        <br />
                        <p><a href="/">Click here</a> if you want to create a new grocery list.</p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default JoinList;