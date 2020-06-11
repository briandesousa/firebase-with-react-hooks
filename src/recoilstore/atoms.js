import { atom } from "recoil";

export const userIdAtom = atom({
  key: "userId",
  default: null,
});

export const groceryListAtom = atom({
  key: "groceryList",
  default: {
    users: [],
  },
});

export const userAtom = atom({
  key: "user",
  default: null,
});
