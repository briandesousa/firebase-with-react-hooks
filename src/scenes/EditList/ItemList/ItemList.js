import React from 'react';

function ItemList(props) {

    const { items } = props;
    const itemListItems = items.map((item, index) => {
        return (
            <div key={index}>
                {item.name}
            </div>
        )
    });

    return (
        <div>
            {itemListItems}
        </div>
    );
}

export default ItemList;