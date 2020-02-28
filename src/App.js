import React, { useState, useEffect } from 'react';

import * as FirestoreService from './services/firestore';

import CreateList from './scenes/CreateList/CreateList';
import JoinList from './scenes/JoinList/JoinList';
import EditList from './scenes/EditList/EditList';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

import useQueryString from './hooks/useQueryString'


function App() {

  const [user, setUser] = useState()
  const [groceryList, setGroceryList] = useState();
  const [error, setError] = useState();

  // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
  const [groceryListId, setGroceryListId] = useQueryString('listId');

  // Use an effect to load the grocery list from the database
  useEffect(() => {
    if (groceryListId) {
      FirestoreService.getGroceryList(groceryListId)
        .then(groceryList => {
          if (groceryList.exists) {
            setError(null);
            setGroceryList(groceryList.data());
          } else {
            setError('grocery-list-not-found');
            setGroceryListId();
          }
        })
        .catch(() => setError('grocery-list-get-fail'));
    }
  }, [groceryListId, setGroceryListId]);

  function onGroceryListCreate(groceryListId, userName) {
    setGroceryListId(groceryListId);
    setUser(userName);
  }

  function onSelectUser(userName) {
    setUser(userName);
    FirestoreService.getGroceryList(groceryListId)
      .then(updatedGroceryList => setGroceryList(updatedGroceryList.data()))
      .catch(() => setError('grocery-list-get-fail'));
  }
  
  // render a scene based on the current state
  if (groceryList && user) {
    return <EditList {...{groceryListId, user}}></EditList>;
  } else if(groceryList) {
    return (
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <JoinList users={groceryList.users} {...{groceryListId, onSelectUser}}></JoinList>
      </div>
    );
  }
  return (
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <CreateList onCreate={onGroceryListCreate}></CreateList>
    </div>
  );
}

export default App;
