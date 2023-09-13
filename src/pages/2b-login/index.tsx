import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { userDataAtom } from "../../atoms";
import { useRecoilState } from "recoil";
import { LoginComp } from "../../components/Login"
// import { ubicationState } from "../../atoms";

const url = "https://lostpets.onrender.com";
// importar react hook form

function LoginPage() {
  // const navigate = useNavigate();
  // const [userDataState, setUserDataState] = useRecoilState(userDataAtom);

  // const [ubication, setUbication] = useRecoilState(ubicationState);
  // const hayUbicacion = ubication.lat != "";

  // const ubication: any = {}
  // ubication.lat = sessionStorage.getItem("lat");
  // ubication.lng = sessionStorage.getItem("lng");
  // const hayUbicacion = ubication.lat != "";

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // PARA VER:
  // const userState = useEffect(() => {
  //   console.log("DESDE LOGIN EFFECT", userDataState);
  // }, [userDataState]);

  // function navigateToCrearCuenta() {
  //   navigate("/sign-up", { replace: true }); // AGREGAR RUTA
  // }
  // function loggedForm(e) {
  //   e.preventDefault();

    // const check = e.target.check.value

    // const loginValues: any = {};

    // loginValues.email = e.target.email.value;
    // loginValues.password = e.target.password.value;

    // console.log(loginValues);

    // fetch(url + "/login", {
    //   method: "post",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(loginValues),
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     if (data.message) {
    //       console.log("ERROR", data);

    //     } else if (data) {
    //       console.log("Se hizo log-in:", data);


    //       const userData: any = {};
    //       userData.userId = data.user.id;
    //       userData.fullname = data.user.fullname;
    //       userData.token = data.token;
    //       userData.email = loginValues.email;

    //       setUserDataState(userData);

    //       localStorage.setItem("token", data.token.toString());
    //       console.log("se guarda token", data.token);

    // if (hayUbicacion) {
    //   console.log("ya hay ubicacion, se redirecciona a pets");
    //   navigate("/pets", { replace: true });
    // } else {
    //   console.log("NO hay ubicacion, se redirecciona a /");
    //   navigate("/", { replace: true });
    // }
    //   }
    // });


  // }
  return (
    <LoginComp />
    // <div>
    //   <h1>Log in</h1>

    //   <form onSubmit={loggedForm}>
    //     <div>
    //       <label>Email</label>
    //       <input type="email" name="email" />
    //     </div>

    //     <div>
    //       <label>Contraseña</label>
    //       <input type="password" name="password" />
    //     </div>

    //     <button>Ingresar</button>
    //   </form>

    //   <div>
    //     <label>¿Aún no tenés cuenta?</label>
    //     <button onClick={navigateToCrearCuenta}>Crear cuenta</button>
    //   </div>
    // </div>
  );
}

export { LoginPage };

// LOGIN DEBE SER UN COMPONENTE, NO UNA PAGE
// EL HOOK LE PROVEE AL COMP TODO LO QUE NECESITA
// la capa de hook maneja la info,
// los componentes solo la reinterpretan