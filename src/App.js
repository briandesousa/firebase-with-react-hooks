import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import * as FirestoreService from "./services/firestore";

import CreateList from "./scenes/CreateList/CreateList";
import JoinList from "./scenes/JoinList/JoinList";
import EditList from "./scenes/EditList/EditList";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import useQueryString from "./hooks/useQueryString";

import { userIdAtom, groceryListAtom, userAtom } from "./recoilstore/atoms";

function App() {
  const [error, setError] = useState();

  const [, setUserId] = useRecoilState(userIdAtom);
  const [groceryList, setGroceryList] = useRecoilState(groceryListAtom);
  const [user, setUser] = useRecoilState(userAtom);

  // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
  const [groceryListId, setGroceryListId] = useQueryString("listId");

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
        if (groceryListId) {
          FirestoreService.getGroceryList(groceryListId)
            .then((groceryList) => {
              if (groceryList.exists) {
                setError(null);
                setGroceryList(groceryList.data());
              } else {
                setError("grocery-list-not-found");
                setGroceryListId();
              }
            })
            .catch(() => setError("grocery-list-get-fail"));
        }
      })
      .catch(() => setError("anonymous-auth-failed"));
  }, [setGroceryList, groceryListId, setGroceryListId, setUserId]);

  function onSelectUser(userName) {
    setUser(userName);
    FirestoreService.getGroceryList(groceryListId)
      .then((updatedGroceryList) => setGroceryList(updatedGroceryList.data()))
      .catch(() => setError("grocery-list-get-fail"));
  }

  // render a scene based on the current state
  if (groceryList && user) {
    return <EditList />;
  } else if (groceryList) {
    return (
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <JoinList {...{ onSelectUser }}></JoinList>
      </div>
    );
  }
  return (
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <CreateList />
    </div>
  );
}

export default App;
