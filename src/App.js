import React, { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";

import * as FirestoreService from "./services/firestore";

import CreateList from "./scenes/CreateList/CreateList";
import JoinList from "./scenes/JoinList/JoinList";
import EditList from "./scenes/EditList/EditList";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import {
  userIdAtom,
  groceryListAtom,
  userAtom,
  groceryListIdAtom,
} from "./recoilstore/atoms";

function App() {
  const [error, setError] = useState();

  const setUserId = useSetRecoilState(userIdAtom);
  const [groceryList, setGroceryList] = useRecoilState(groceryListAtom);
  const user = useRecoilValue(userAtom);
  const [groceryListId, setGroceryListId] = useRecoilState(groceryListIdAtom);

  // get listId from query and write it to atom state
  useEffect(() => {
    console.log("first load get QS param");
    const listId = new URLSearchParams(window.location.search).get("listId");
    setGroceryListId(listId);
  }, [setGroceryListId]);

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    console.log("groceryListID has changed so running effect");

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

  // render a scene based on the current state
  if (groceryList && user) {
    return <EditList />;
  } else if (groceryList) {
    return (
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <JoinList />
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
