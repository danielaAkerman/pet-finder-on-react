import React from "react";
import css from "./index.css";

type MyButtonProps = {
  petId: number;
  name: string;
};

function MyButton(props: MyButtonProps) {
  const { name, petId } = props;

  function mostrarFormMascota(){
    console.log(name, petId)
  }
  return (
    <button className={css.root} onClick={mostrarFormMascota}>
      ¿Lo viste?
    </button>
  );
}

export { MyButton };
