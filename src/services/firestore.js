// create a list on Firestore and return listId
export const createList = (userName) => {
    return new Promise( resolve => {
        // TODO create on firestore
        resolve({
            listId: 1,
            users: [{ name: userName }],
            items: []
        });
    });
};

// update a list with a new user
export const addUserToList = (userName, list) => {
    return new Promise( resolve => {
        // TODO update on firestore
        let updatedList = { ...list };
        updatedList.users.push({ name: userName});
        resolve(updatedList);
    });
    
};

// update a list with a new item
export const addItemToList = (item, list) => {
    console.log(item);
    return new Promise( resolve => {
        // TODO update on firestore
        let updatedList = { ...list };
        updatedList.items.push({ name: item });
        console.log(updatedList);
        resolve(updatedList);
    }); 
}

// retrieve list by id
export const getListById = listId => {
    return new Promise((resolve, reject) => {
        // TODO query firestore
        if (parseInt(listId) === 1) {
            resolve({
                listId: '1',
                users: [
                    { name: 'Brian' },
                    { name: 'Holly' },
                    { name: 'Steve' }
                ],
                items: []
            });
        } else {
            reject('invalid list id');
        }
    });
}