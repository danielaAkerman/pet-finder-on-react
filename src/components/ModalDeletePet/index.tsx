import React, { useEffect, useState } from "react";
import css from "./index.css";
import { useRecoilState } from "recoil";
import { petDataModal } from "../../atoms";
import { MainButton } from "../../ui/MyButton";

const url = "https://lostpets.onrender.com";

function ModalDeletePet({ isOpen, onClose }) {
  const [petDataModalState, setpetDataModalState] =
    useRecoilState(petDataModal);

  function DeletePet() {
    onClose()
    fetch(url + "/delete-pet/" + petDataModalState.petId, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "deleted" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Mascota Eliminada", petDataModalState.name);
        // ACA LLAMAR A RENDERIZAR LA PAGE NUEVAMENTE PARA QUE YA NO APAREZCA PERRULLO
      });
  }

  return (
    <div>
      <div
        className={css.modal_container}
        style={{ display: isOpen ? "grid" : "none" }}
      >
        <div className={css.modal_content}>
          <button className={css.modal_close} onClick={onClose}>
            X
          </button>
          {/* Acá puedo poner como children un componente que sea el form */}
          <h3>¿Deseas eliminar la publicación de {petDataModalState.name}?</h3>
          <div className={css["buttons_content"]}>

          <div onClick={DeletePet}>
            <MainButton>Eliminar</MainButton>
          </div>
          <div onClick={onClose}>
            <MainButton>Cancelar</MainButton>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ModalDeletePet };
