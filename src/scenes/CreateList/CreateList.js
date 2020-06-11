import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  userIdAtom,
  userAtom,
  groceryListIdAtom,
} from "../../recoilstore/atoms";

import "./CreateList.css";
import * as FirestoreService from "../../services/firestore";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function CreateList() {
  const [error, setError] = useState();

  const userId = useRecoilValue(userIdAtom);
  const setUser = useSetRecoilState(userAtom);
  const setGroceryListId = useSetRecoilState(groceryListIdAtom);

  function createGroceryList(e) {
    e.preventDefault();
    setError(null);

    const userName = document.createListForm.userName.value;
    if (!userName) {
      setError("user-name-required");
      return;
    }

    FirestoreService.createGroceryList(userName, userId)
      .then((docRef) => {
        // onCreate(docRef.id, userName);
        setGroceryListId(docRef.id);
        setUser(userName);

        // update the query string  without causing a browser reload
        const { protocol, host, pathname } = window.location;
        const newUrl = `${protocol}//${host}${pathname}?${docRef.id}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
      })
      .catch((reason) => setError("create-list-error"));
  }

  return (
    <div>
      <header>
        <h1>Welcome to the Grocery List app!</h1>
      </header>
      <div className="create-container">
        <div>
          <form name="createListForm">
            <p>
              <label>What is your name?</label>
            </p>
            <p>
              <input type="text" name="userName" />
            </p>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <p>
              <button onClick={createGroceryList}>
                Create a new grocery list
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateList;
