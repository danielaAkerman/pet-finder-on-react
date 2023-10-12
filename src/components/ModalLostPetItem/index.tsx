import React from "react";
import css from "./index.css";
import { useRecoilState } from "recoil";
import { petDataModal } from "../../atoms";
import { LargeButton } from "../../ui/MyButton";
import { MyInput } from "../../ui/MyInput";

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
          <div className={css.modal_content_items}>

            {/* Acá puedo poner como children un componente que sea el form */}
            <h3>Ayudanos a encontrar a {petDataModalState.name}</h3>
            <form onSubmit={submittedForm} className={css.modal_content_form}>
              <MyInput label="Tu nombre:" name="tu-nombre" />
              <MyInput label="Tu teléfono:" name="tu-telefono" />
              <MyInput label="Dónde lo viste?:" name="tu-mensaje" textarea={true} />
              <hr className={css.line} />
              <div onClick={onClose} style={{ width: "100%" }}>
                <LargeButton>Enviar</LargeButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ModalLostPetItem };
