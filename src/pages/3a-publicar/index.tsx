import { userIdSelector } from "../../atoms";
import { useRecoilValue } from "recoil";
import React, { useEffect, useState } from "react";

// import Map from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
import { MyInput } from "../../ui/MyInput";
import { MainButton } from "../../ui/MyButton";


const url = "https://lostpets.onrender.com";
function PublicarPage() {
  const userId = useRecoilValue(userIdSelector);
  const lat = parseInt(sessionStorage.getItem("lat"));
  const lng = parseInt(sessionStorage.getItem("lng"));
  const datosNewPet: any = {};

  const convertiraBase64 = (archivos) => {
    Array.from(archivos).forEach((archivo: any) => {
      var reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = function () {
        var base64 = reader.result;
        // console.log(base64);
        datosNewPet.imagen_data = base64;
      };
    });
  };
  function submittedPet(e) {
    e.preventDefault();
    console.log("submitedddddddddddd")

    datosNewPet.userId = userId;
    datosNewPet.name = e.target.name.value;
    datosNewPet.ubication = e.target.ubication.value;
    datosNewPet.status = "lost";
    // MOCK:
    datosNewPet.last_location_lat = -31.4331816;
    datosNewPet.last_location_lng = -64.2249415;

    // console.log({ datosNewPet });

    fetch(url + "/new-pet", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(datosNewPet),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
      });
  }

  return (
    <div>
      <h1>Publicar Mascota</h1>

      <form onSubmit={submittedPet}>

        <MyInput name="name" label="Nombre de tu mascota" />

        <div>
          <input
            type="file"
            multiple
            onChange={(e) => convertiraBase64(e.target.files)}
          />
        </div>

        <MyInput name="ubication" label="Ciudad o barrio" />

        <div><iframe src="https://www.google.com/maps/d/u/0/embed?mid=1MITVPExrphDfLkJqao9bzZtL7BO7Fv4&ehbc=2E312F" width="640" height="480"></iframe></div>

        <MainButton type="submit">Publicar</MainButton>
      </form>
    </div>
  );
}

export { PublicarPage };
