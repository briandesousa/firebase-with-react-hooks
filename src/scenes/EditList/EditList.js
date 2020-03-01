import React from 'react';
import './EditList.css';
import AddItem from './AddItem/AddItem';
import ItemList from './ItemList/ItemList';

function EditList(props) {

    const { groceryListId, user, onCloseGroceryList } = props;

    function onCreateListClick(e) {
        e.preventDefault();
        onCloseGroceryList();
    }

    return (
        <div>
            <header className="app-header">
                <h1>Live Grocery List</h1>
                <p><strong>Hi {user}!</strong></p>
                <p>Add items to the list. When someone else adds an item it will instantly appear on the list.</p>
            </header>
            <div className="edit-container">
                <div className="add-item-column">
                    <AddItem {...{groceryListId}}></AddItem>
                </div>
                <div className="list-column">
                    <ItemList {...{groceryListId}}></ItemList>
                </div>
            </div>
            <footer className="app-footer">
                <p>Share your list with others using <a href={`/?listId=${groceryListId}`} target="_blank" rel="noopener noreferrer">this link</a> or <a href="/" onClick={onCreateListClick}>create a new grocery list</a>.</p>
            </footer>    
        </div>
    );
}

export default EditList;