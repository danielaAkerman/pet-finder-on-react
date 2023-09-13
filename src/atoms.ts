import { useEffect } from "react";
import { atom, selector, useRecoilValue } from "recoil";
const url = "https://lostpets.onrender.com";

export const petDataModal = atom({
  key: "petDataModal",
  default: {
    name: "",
    petId: null,
  },
});

export const userDataAtom = atom({
  key: "userDataAtom",
  default: { email: "", fullname: "", token: "", userId: "" },
});

export const userFullnameSelector = selector({
  key: "userFullnameSelector",
  get: ({ get }) => {
    const username = get(userDataAtom).fullname;
    return username;
  },
});

export const userIdSelector = selector({
  key: "userIdSelector",
  get: ({ get }) => {
    const userId = get(userDataAtom).userId;
    return userId;
  },
});

export const myReportedPetsSelector = selector({
  key: "myReportedPetsSelector",
  get: async ({ get }) => {
    const userId = get(userDataAtom).userId;

    const res = await fetch(url + "/my-pets/" + userId);
    const results = await res.json();

    return results;
  },
});

export const lostPetsNearYouSelector = selector({
  key: "lostPetsNearYouSelector",
  get: async () => {

    const lat = sessionStorage.getItem("lat");
    const lng = sessionStorage.getItem("lng");

    const res = await fetch(
      url + "/pets-near-me" + "?lat=" + lat + "&lng=" + lng
    );
    const results = await res.json();

    return results;
  },
});
