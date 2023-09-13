import React, { useEffect, useState } from "react";
import css from "./index.css";
// import { MyButton } from "../MyButton";
import { useRecoilState } from "recoil";
import { petDataModal } from "../../atoms";

const url = "https://lostpets.onrender.com";

function ModalLostPetItem({ isOpen, onClose, children }) {
  const [petDataModalState, setpetDataModalState] =
    useRecoilState(petDataModal);

  function submittedForm(e) {
    e.preventDefault();
    const reporte = {
      reporter: e.target["tu-nombre"].value,
      phone_number: e.target["tu-telefono"].value,
      message: e.target["tu-mensaje"].value,
      pet_id: petDataModalState.petId,
      pet_name: petDataModalState.name,
    };
    console.log(reporte);

    fetch(url + "/new-report", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reporte),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setpetDataModalState({
          name: "",
          petId: null,
        });
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
          <h3>Ayudanos a encontrar a {petDataModalState.name}</h3>
          <form onSubmit={submittedForm}>
            <span>Tu nombre:</span>
            <input type="text" name="tu-nombre" className={css.modal_input} />
            <br />
            <span>Tu teléfono:</span>
            <input type="text" name="tu-telefono" className={css.modal_input} />
            <br />
            <span>Dónde lo viste?:</span>
            <textarea name="tu-mensaje" className={css.modal_input} />
            <button onClick={onClose}>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export { ModalLostPetItem };
