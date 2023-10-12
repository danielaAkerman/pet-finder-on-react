import React from "react";
import { useNavigate } from "react-router-dom";
// import { state } from "../../state";
import { userDataAtom } from "../../atoms";
import { useRecoilState } from "recoil";
import { MyInput } from "../../ui/MyInput"
import { MainButton } from "../../ui/MyButton";

const url = "https://lostpets.onrender.com";

function MisDatosPage() {
  const [userDataState, setUserDataState] = useRecoilState(userDataAtom);

  console.log("LOS DATOS ACTUALES SON", userDataState);
  const userFullnameState = userDataState.fullname;
  const userEmailState = userDataState.email;
  const userIdState = userDataState.userId;
  const usertokenState = userDataState.token;

  function formSubmitted(e) {
    e.preventDefault();
    const nombreInputValue = e.target.nombre.value;
    const emailInputValue = e.target.email.value;
    const passwordInputValue = e.target.password.value || "";
    const password2InputValue = e.target.password2.value || "";

    if (passwordInputValue == password2InputValue) {
      const dataValues: any = {};

      dataValues.fullname = nombreInputValue || userFullnameState;
      dataValues.email = emailInputValue || userEmailState;
      dataValues.token = usertokenState;
      dataValues.password = passwordInputValue;

      //   state.updateUser(dataValues);
      console.log(" antes de hacer el fetch, los valores son", dataValues);
      fetch(url + "/update-user/" + userIdState, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataValues),
      })
        .then((res) => {
          return res.json();
        })
        .then(() => {
          setUserDataState(dataValues);
          console.log("DATOS ACTUALIZADOS", dataValues);
        });
    } else {
      console.log("Las constraseñas no coinciden");
    }
  }

  return (
    <div>
      <h1>Mis Datos</h1>

      <div></div>

      <label>Completa sólo los campos que desees actualizar</label>

      <form onSubmit={formSubmitted}>

        <MyInput label="Nombre" name="nombre" defaultValue={userFullnameState}></MyInput>
        <MyInput label="Email" name="email" defaultValue={userEmailState} type="email"></MyInput>
        <MyInput label="Contraseña" name="password" type="password"></MyInput>
        <MyInput label="Repetir contraseña" name="password2" type="password"></MyInput>

        <MainButton>Actualizar mis datos</MainButton>

      </form>
    </div>
  );
}

export { MisDatosPage };
