import React from 'react';
import './EditList.css';
import AddItem from './AddItem/AddItem';
import ItemList from './ItemList/ItemList';

function EditList(props) {

    const { list, addListItem, currentUser } = props;

    return (
        <div>
            <header className="app-header">
                <h1>Live Grocery List</h1>
                <p><strong>Hi {currentUser}!</strong></p>
                <p>Add items to the list. When someone else adds an item it will instantly appear in the list.</p>
            </header>
            <div className="edit-container">
                <div className="add-item-column">
                    <AddItem addListItem={addListItem}></AddItem>
                </div>
                <div className="list-column">
                    <ItemList items={list.items}></ItemList>
                </div>
            </div>
            <footer className="app-footer">
                <p>Share your list with others using <a href={"/?listId=" + list.listId}>this link</a> or <a href="/">create a new list</a></p>
            </footer>    
        </div>
    );
}

export default EditList;