import React from "react";

import { LoginComp } from "../../components/Login"


const url = "https://lostpets.onrender.com";
// importar react hook form

function LoginPage() {

  return (
    <LoginComp />
  );
}

export { LoginPage };

// LOGIN DEBE SER UN COMPONENTE, NO UNA PAGE
// EL HOOK LE PROVEE AL COMP TODO LO QUE NECESITA
// la capa de hook maneja la info,
// los componentes solo la reinterpretan