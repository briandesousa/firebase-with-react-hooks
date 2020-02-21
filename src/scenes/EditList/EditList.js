import React from 'react';
import './EditList.css';
import AddItem from './AddItem/AddItem';
import ItemList from './ItemList/ItemList';

function EditList() {
    return (
        <div>
            <header className="app-header">
                <h1>Live Grocery List</h1>
                <p>Add yourself to the list then start adding items. When someone else adds items, they will instantly appear in the list.</p>
            </header>
            <div className="container">
                <div className="add-item-column">
                    <AddItem></AddItem>
                </div>
                <div className="list-column">
                    <ItemList></ItemList>
                </div>
            </div>
            <footer className="app-footer">
                <p>Share your list with others using <a href="/?list=2">this link</a> or <a href="/">create a new list</a></p>
            </footer>    
        </div>
    );
}

export default EditList;