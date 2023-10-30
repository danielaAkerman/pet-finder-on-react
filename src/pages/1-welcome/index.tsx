import React, { useEffect } from "react";
import { lostPetsNearYouSelector } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { LostPetItem } from "../../components/LostPetItem";
import css from "./index.css";


// const MAPKEY = "pk.58d33aa8a8d98aab3cf1c2140e1014e3"
// const PLACE = "obelisco"
// const PLACE = "cordoba"
function PetsPage() {

  // fetch(

  //   `https://us1.locationiq.com/v1/search?key=${MAPKEY}&q=${PLACE}%2C%20argentina&format=json`
  // )
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => { console.log("LAT:",data[0].lat, "LON:", data[0].lon
  //   ) })


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
