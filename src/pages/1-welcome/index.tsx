import React, { useEffect } from "react";
import {  lostPetsNearYouSelector } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { LostPetItem } from "../../components/LostPetItem";
import css from "./index.css";

function PetsPage() {
  const mascotasCercanas = useRecoilValue(lostPetsNearYouSelector); // Aca tengo el array de mascotas cercanas para mostrar
  // useEffect(
  //   () => console.log("effect", mascotasCercanas), //Buscar las mascotas cerca tuyo
  //   [mascotasCercanas]
  // );

  // const userToken= localStorage.getItem("token")

  
  return (
    <div className={css.root}>
      <h1>Mascotas perdidas cerca tuyo</h1>
      <div className={css.results} id="results">
        {mascotasCercanas.map((m) => (
          <LostPetItem
            key={m.objectID}
            petId={m.objectID}
            name={m.name}
            ubication={m.ubication}
            picture={m.picture_url}
          />
        ))}
      </div>
    </div>
  );
}

export { PetsPage };
