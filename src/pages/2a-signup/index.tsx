import React, { useEffect } from "react";
import { userDataAtom } from "../../atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { MyInput } from "../../ui/MyInput";
import { MainButton } from "../../ui/MyButton";
import css from "./index.css"


// const url = "http://127.0.0.1:3000";
const url = "https://lostpets.onrender.com";

function SignUpPage() {
  const navigate = useNavigate();
  const [userDataState, setUserDataState] = useRecoilState(userDataAtom);

  const ubication: any = {}
  ubication.lat = sessionStorage.getItem("lat");
  ubication.lng = sessionStorage.getItem("lng");
  const hayUbicacion = ubication.lat != "";

  // PARA VER:
  const userState = useEffect(() => {
    console.log("DESDE SIGNUP EFFECT", userDataState);
  }, [userDataState]);

  function navigateToLogIn() {
    navigate("/log-in", { replace: true });
  }
  function submittedSignUpForm(e) {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    // Verificar que las contraseñas sean idénticas
    if (password === password2) {
      const signUpValues: any = {};
      signUpValues.fullname = nombre;
      signUpValues.email = email;
      signUpValues.password = password;

      console.log(signUpValues);
      //   state.getAuth(signUpValues, confirmacion);

      console.log("A autenticar user!");

      fetch(url + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signUpValues),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("Se autenticó user, HAY TOKEN????", data);

          // GENERAR TOKEN,
          // LO VOY A MOCKEAR
          const userData: any = {};
          userData.email = email;
          userData.fullname = nombre;
          userData.token = data._userToken;
          userData.userId = data.user_id;
          // console.log()
          setUserDataState(userData);

          localStorage.setItem("token", userData.token.toString());
          console.log("se guarda token", userData.token);

          if (hayUbicacion) {
            console.log("ya hay ubicacion, se redirecciona a pets");
            navigate("/pets", { replace: true });
          } else {
            console.log("NO hay ubicacion, se redirecciona a /");
            navigate("/", { replace: true });
          }
        });
    } else if (password != password2) {
      console.log(`Las constraseñas no coinciden`);
    }
  }
  return (
    <div className={css.root}>
      <h1>Crear cuenta</h1>

      <form
        className={css.form}
        onSubmit={submittedSignUpForm}
        style={{ display: "flex", flexDirection: "column" }}
      >


        <MyInput name="nombre" label="Nombre" type="text" />
        <MyInput name="email" label="Email" type="email" />
        <MyInput name="password" label="Contraseña" type="password" />
        <MyInput name="password2" label="Repetir Contraseña" type="password" />
        <MainButton>Ingresar</MainButton>


      </form>

      <hr className={css["line-divisor"]} />
      
      <div className={css.redirect}>
        <label>¿Ya tenes cuenta?</label>
        <div onClick={navigateToLogIn}>
          <MainButton>Ir a log in</MainButton></div>
      </div>
    </div>
  );
}

export { SignUpPage };
