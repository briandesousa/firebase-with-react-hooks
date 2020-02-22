import React, { useState, useEffect } from 'react';

import * as FirestoreService from './services/firestore';

import CreateList from './scenes/CreateList/CreateList';
import JoinList from './scenes/JoinList/JoinList';
import EditList from './scenes/EditList/EditList';
import Error from './components/Error/Error';

import useQueryString from './hooks/useQueryString'


function App() {

  const [user, setUser] = useState()
  const [groceryList, setGroceryList] = useState();
  const [error, setError] = useState();

  // custom hook to track changes to query string
  const [currentListId, setCurrentListId] = useQueryString('listId');

  // reload grocery list from database when selected list changes
  useEffect(() => {
    if(currentListId) {
      FirestoreService.getListById(currentListId).then(
        groceryList => setGroceryList(groceryList),
        error => handleError(error, 'grocery-list-not-found')
      );
    }
  }, [currentListId]);

  function handleError(error, errorCode) {
    console.log(error);
    setError(errorCode);
  }

  // set current user
  function selectUser(userName) {
    if (!groceryList.users.find(user => user.name === userName)) {
      // user hasn't joined this list yet, add them
      FirestoreService.addUserToList(userName, groceryList).then(
        updatedList => {
          setGroceryList(updatedList);
          setUser(userName);
        },
        error => handleError(error, 'add-user-to-list-error')
      );
    } else {
      setUser(userName);
    }
  }

  // create grocery list
  function handleListCreate(userName) {
    FirestoreService.createList(userName).then(
      newList => {
        setCurrentListId(newList.listId);
        setUser(newList.users[0].name);
      },
      error => handleError(error, 'create-list-error')
    );
  }

  // add an item to the grocery list
  function handleAddListItem(listItem) {
    if (!groceryList.items.find(item => item.name === listItem)) {
      FirestoreService.addItemToList(listItem, groceryList).then(
        updatedGroceryList => setGroceryList(updatedGroceryList),
        error => handleError(error, 'add-list-item-error')
      );
    }
  }
  
  // display scene based on current state
  let scene;
  if (groceryList && user) {
    scene = <EditList list={groceryList} addListItem={handleAddListItem} currentUser={user}></EditList>;
  } else if(groceryList) {
    scene = <JoinList users={groceryList.users} selectUser={selectUser}></JoinList>;
  } else {
    scene = (
      <div>
        <Error errorCode={error}></Error>
        <CreateList createList={handleListCreate}></CreateList>
      </div>
    );
  }
  return scene;
}

export default App;
