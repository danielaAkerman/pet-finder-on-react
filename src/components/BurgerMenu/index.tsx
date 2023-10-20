import React from "react";
import css from "./index.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDataAtom, userFullnameSelector } from "../../atoms";
import { Link, useNavigate } from "react-router-dom";


const url = "https://lostpets.onrender.com";

function BurgerMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [userDataState, setUserDataState] = useRecoilState(userDataAtom);
  const userFullname = useRecoilValue(userFullnameSelector);

  const ubication: any = {};
  ubication.lat = sessionStorage.getItem("lat");
  ubication.lng = sessionStorage.getItem("lng");
  const hayUbicacion = ubication.lat != "";

  function cerrarSesion() {
    onClose()
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
    <div  >
      <div
        className={css.menu} style={{ display: isOpen ? "flex" : "none" }}
      >

        {userFullname ? (
          <div className={css.header_items} >
            <button className={css.header_close} onClick={onClose}>X</button>
            <span className={css.header_item}>Hola {userFullname}</span>
            <Link to={"/mis-datos"} className={css.header_item} onClick={onClose}>
              Mis datos
            </Link>
            <Link to={"/mis-mascotas"} className={css.header_item} onClick={onClose}>
              Mis mascotas
            </Link>
            <Link to={"/publicar-mascota"} className={css.header_item} onClick={onClose}>
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
          <div className={css.header_items} >



            <button className={css.header_close} onClick={onClose}>X</button>
            <Link to={"/sign-up"} className={css.header_item}  onClick={onClose}>
              Registrarse
            </Link>
            <Link to={"/log-in"} className={css.header_item}  onClick={onClose}>
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export { BurgerMenu };