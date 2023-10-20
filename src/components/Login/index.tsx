import React, { useState } from "react";
// import { useLogin } from "../../hooks/login"
import { useNavigate } from "react-router-dom";
import { MyInput } from "../../ui/MyInput"
import { MainButton } from "../../ui/MyButton"
import { useRecoilState } from "recoil";
import { userDataAtom } from "../../atoms";
import css from "./index.css";
// import { userFullnameSelector } from "../../atoms";
// import { useRecoilValue, useResetRecoilState } from "recoil";
// import { Link, useNavigate } from "react-router-dom";
// import { userDataAtom } from "../../atoms";
// import { useRecoilState } from "recoil";


const url = "https://lostpets.onrender.com";

function LoginComp() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userDataState, setUserDataState] = useRecoilState(userDataAtom);

  const navigate = useNavigate();
  const ubication: any = {}
  ubication.lat = sessionStorage.getItem("lat");
  ubication.lng = sessionStorage.getItem("lng");
  const hayUbicacion = ubication.lat != "";


  function loggedForm(e) {
    e.preventDefault();

    const loginValues: any = {};

    loginValues.email = e.target.email.value;
    loginValues.password = e.target.password.value;

    console.log({ loginValues });




    fetch(url + "/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginValues),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          console.log("ERROR", data);


        } else if (data) {
          console.log("Se hizo log-in:", data);


          const userData: any = {};
          userData.userId = data.user.id;
          userData.fullname = data.user.fullname;
          userData.token = data.token;
          userData.email = loginValues.email;

          localStorage.setItem("token", data.token.toString());
          console.log("se guarda token", data.token);

          setUserDataState(userData);
          setLoggedIn(true)

          if (hayUbicacion) {
            console.log("ya hay ubicacion, se redirecciona a pets");
            navigate("/pets", { replace: true });
          } else {
            console.log("NO hay ubicacion, se redirecciona a /");
            navigate("/", { replace: true });
          }
        }
      });








  }
  function navigateToCrearCuenta() {
    navigate("/sign-up", { replace: true }); // AGREGAR RUTA
  }
  return (

    <div className={css["root"]}>
      <h1>Log in</h1>

      <form onSubmit={loggedForm}>

        <MyInput name="email" label="Email" type="email" />
        <MyInput name="password" label="Contraseña" type="password" />
        <MainButton>Ingresar</MainButton>

      </form>
      <hr className={css["line-divisor"]} />
      <div>
        <label>¿Aún no tenés cuenta?</label>
        <div onClick={navigateToCrearCuenta}>
          <MainButton>Crear cuenta</MainButton></div>
      </div>
    </div>)


}

export { LoginComp };
