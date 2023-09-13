import React, { useState } from "react";
import css from "./LostPetItem.css";
// import { MyButton } from "../MyButton";
import { ModalLostPetItem } from "../ModalLostPetItem";
import { useRecoilState } from "recoil";
import { petDataModal } from "../../atoms";
// import { useNavigate } from "react-router-dom";

// const url = "https://lostpets.onrender.com";

type LostPetItemProps = {
  name: string;
  ubication: string;
  picture: string;
  petId: any;
};

// function setMostrarModal(){
//   const [mostrar, setMostrar] = useState(false);
//   return mostrar

// }

function LostPetItem(props: LostPetItemProps) {
  const { name, ubication, picture, petId } = props;

  const [mostrar, setMostrar] = useState(false);

  const [petDataModalState, setpetDataModalState] = useRecoilState(petDataModal);

  return (
    <div className={css.root}>
      <img src={picture} className={css.root__picture} />
      <div className={css.root__data}>
        <h2>{name}</h2>
        <h3>{ubication}</h3>
        {/* <button onClick={showModalForm}>LO VISTE?</button> */}

        <button
          onClick={() => {
            setMostrar(true),
              setpetDataModalState({
                name: name,
                petId: petId,
              });
          }}
        >
          LO VISTE?
        </button>
        <ModalLostPetItem isOpen={mostrar} onClose={() => setMostrar(false)}>
          children
        </ModalLostPetItem>

      </div>
    </div>
  );
}

export { LostPetItem };
