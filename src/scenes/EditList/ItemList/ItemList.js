import React from 'react';

function ItemList() {
    return (
        <div>
            <ul>
                <li key={1}>carrots</li>
                <li key={2}>pickels</li>
                <li key={3}>bread</li>
            </ul>
        </div>
    );
}

export default ItemList;