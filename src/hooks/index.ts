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
import { lostPetsNearYouSelector } from "../atoms";

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

function useGetLostPetsNearMe(){

  const mascotasCercanas = useRecoilValue(lostPetsNearYouSelector); // Aca tengo el array de mascotas cercanas para mostrar

  return mascotasCercanas
}

export { useUserUbication, useGetLostPetsNearMe };
