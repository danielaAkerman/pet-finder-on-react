import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  selector,
  useSetRecoilState,
  RecoilState,
} from "recoil";

const userState = atom({
  key: "userstate",
  default: {
    fullname: "",
    email: "",
  },
});


function useUserUbication(ubication) {
  const setUserUbication = useSetRecoilState(userState);

  useEffect(() => {
    setUserUbication(ubication);
  });
}


export { useUserUbication };
