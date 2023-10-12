import React from "react";
// import { ubicationState } from "../../atoms";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userDataAtom } from "../../atoms";
import { MainButton } from "../../ui/MyButton";
// import { init } from "../../api";

// const search = require("../../assets/img/search.jpeg");

const url = "https://lostpets.onrender.com";

function UbicationPage() {
  const [userDataState, setUserDataState] = useRecoilState(userDataAtom);
  const navigate = useNavigate();
  // const [ubication, setUbication] = useRecoilState(ubicationState);
  // useEffect(() => console.log(ubication), [ubication]);

  // const hayUbicacion = ubication.lat != "";
  // if (hayUbicacion) {
  //   console.log("ya hay ubicacion, se redirecciona a pets");
  //   navigate("/pets", { replace: true });
  // }

  const userToken = localStorage.getItem("token");
  // const mantenerIniciada = localStorage.getItem("mantener-iniciada");

  // if (userDataState.fullname == "" && userToken && mantenerIniciada) {
  if (userDataState.fullname == "" && userToken) {
    console.log("no tengo username pero tengo token");
    console.log("El localstorage es", localStorage);

    // init()
    fetch(url + "/init/" + userToken, {})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { id, email, fullname } = data;

        const userData: any = {};

        userData.userId = id;
        userData.email = email;
        userData.fullname = fullname;
        userData.token = userToken;
        setUserDataState(userData);
      });
  }

  function getUserUbication() {
    navigator.geolocation.getCurrentPosition((e) => {
      const currentUbication = {
        lat: e.coords.latitude as any,
        lng: e.coords.longitude as any,
      };

      sessionStorage.setItem("lat", currentUbication.lat.toString());
      sessionStorage.setItem("lng", currentUbication.lng.toString());

      // setUbication(currentUbication);
    });
    navigate("/pets", { replace: true });
  }

  return (
    <div>
      <div className="img-container">
        {/* <img src={search} className="img-fluid" /> */}
      </div>
      <p className="">Para continuar, necesitamos conocer tu ubicación</p>
      <div onClick={getUserUbication}>
        <MainButton>Aceptar</MainButton>
      </div>

    </div>
  );
}

export { UbicationPage };
