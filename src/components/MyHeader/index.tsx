import React, { useEffect } from "react";
import css from "./index.css";
import { userFullnameSelector } from "../../atoms";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { userDataAtom } from "../../atoms";
import { useRecoilState } from "recoil";

// import { ubicationState } from "../../atoms";

//   hayMuchas = this.cosas.length > 2 ? "Muchas" : "Pocas";

function MyHeader() {
  const navigate = useNavigate();
  const [userDataState, setUserDataState] = useRecoilState(userDataAtom);

  const ubication: any = {};
  ubication.lat = sessionStorage.getItem("lat");
  ubication.lng = sessionStorage.getItem("lng");
  const hayUbicacion = ubication.lat != "";

  const userFullname = useRecoilValue(userFullnameSelector); // Aca tengo el array de mascotas cercanas para mostrar
  // useEffect(
  //   () => console.log("user State desde header:", userDataState),
  //   [userDataState]
  // );

  function brandLogo() {
    if (hayUbicacion) {
      console.log("ya hay ubicacion, se redirecciona a pets");
      navigate("/pets", { replace: true });
    } else {
      console.log("NO hay ubicacion, se redirecciona a /");
      navigate("/", { replace: true });
    }
  }
  function cerrarSesion() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    // useResetRecoilState(userDataAtom)
    setUserDataState({ email: "", fullname: "", token: "", userId: "" });
    // location.reload();
    if (hayUbicacion) {
      console.log("ya hay ubicacion, se redirecciona a pets");
      navigate("/pets", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }
  return (
    <div className={css.root}>
      <span onClick={brandLogo}>LOGO</span>
      {userFullname ? (
        <div className={css.header_items}>
          <span className={css.header_item}>Hola {userFullname}</span>
          <Link to={"/mis-datos"} className={css.header_item}>
            Mis datos
          </Link>
          <Link to={"/mis-mascotas"} className={css.header_item}>
            Mis mascotas
          </Link>
          <Link to={"/publicar-mascota"} className={css.header_item}>
            Publicar mascota
          </Link>
          <span
            onClick={cerrarSesion}
            className={css.header_item}
            style={{ cursor: "pointer" }}
          >
            Cerrar Sesión
          </span>
        </div>
      ) : (
        <div className={css.header_items}>
          <Link to={"/sign-up"} className={css.header_item}>
            Registrarse
          </Link>
          <Link to={"/log-in"} className={css.header_item}>
            Iniciar sesión
          </Link>
        </div>
      )}
    </div>
  );
}

export { MyHeader };
