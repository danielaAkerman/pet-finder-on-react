import React, { useEffect } from "react";
import { userDataAtom } from "../../atoms";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";


// const url = "http://127.0.0.1:3000";
const url = "https://lostpets.onrender.com";

function SignUpPage() {
  const navigate = useNavigate();
  const [userDataState, setUserDataState] = useRecoilState(userDataAtom);

  const ubication:any={}
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
    <div>
      <h1>Crear cuenta</h1>

      <form
        className="form-signup"
        onSubmit={submittedSignUpForm}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          <span>Nombre</span>
          <input name="nombre" />
        </label>

        <label>
          <span>Email</span>
          <input name="email" type="email" />
        </label>

        <label>
          <span>Contraseña</span>
          <input name="password" type="password" />
        </label>

        <label>
          <span>Repetir Contraseña</span>
          <input name="password2" type="password" />
        </label>

        <div className="alerta-password"></div>

        <button>Ingresar</button>
      </form>

      <div>
        <label>¿Ya tenes cuenta?</label>
        <button onClick={navigateToLogIn}>Ir a log in</button>
      </div>
    </div>
  );
}

export { SignUpPage };
