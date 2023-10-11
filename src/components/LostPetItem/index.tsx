import React, { useState } from "react";
import css from "./LostPetItem.css";
// import { MyButton } from "../MyButton";
import { ModalLostPetItem } from "../ModalLostPetItem";
import { useRecoilState } from "recoil";
import { petDataModal } from "../../atoms";
import { MainButton } from "../../ui/buttons";
import { MyText } from "../../ui/MyText";
import { ModalDeletePet } from "../ModalDeletePet";
import { useNavigate } from "react-router-dom";

// const url = "https://lostpets.onrender.com";

type LostPetItemProps = {
  name: string;
  ubication: string;
  picture: string;
  petId: any;
  owner?: string
};

// function setMostrarModal(){
//   const [mostrar, setMostrar] = useState(false);
//   return mostrar

// }

function LostPetItem(props: LostPetItemProps) {
  const { name, ubication, picture, petId } = props;

  const navigate = useNavigate()

  const [mostrar, setMostrar] = useState(false);

  const [petDataModalState, setpetDataModalState] = useRecoilState(petDataModal);

  const [mostrarMyPet, setMostrarMyPet] = useState(false);

  const [myPetDataModalState, setMyPetDataModalState] = useRecoilState(petDataModal);

  function EditPet() {
    navigate("/editar-mascota", { replace: true, state: props });
  }

  return (
    <div className={css.root}>
      <img src={picture} className={css.root__picture} />
      <div className={css.root__data}>
        <MyText styleName="petName">{name}</MyText >
        <hr className={css.line} />
        <MyText styleName="petUbication">{ubication}</MyText>
      </div>
      {/* <div className={css.root__button}> */}

      {props.owner ?
        <div className={css.root__button}>
          <div onClick={EditPet}>
            <MainButton >Editar Mascota</MainButton>
          </div>

          <div onClick={() => {
            setMostrarMyPet(true),
              setMyPetDataModalState({
                name: name,
                petId: petId,
              });
          }}>
            <MainButton>Borrar Publicación</MainButton>
          </div>

          <ModalDeletePet isOpen={mostrarMyPet} onClose={() => setMostrarMyPet(false)}></ModalDeletePet>

        </div>
        :


        <div className={css.root__button} 
        onClick={() => {
          setMostrar(true),
            setpetDataModalState({
              name: name,
              petId: petId,
            });
        }}>
          <MainButton>LO VISTE?</MainButton>
        </div>

      }



      {/* </div> */}
      <ModalLostPetItem isOpen={mostrar} onClose={() => setMostrar(false)}>
        children
      </ModalLostPetItem>

    </div>
  );
}

export { LostPetItem };
