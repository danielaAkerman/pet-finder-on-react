import React, { useState } from "react";
import css from "./MyLostPetItem.css";
import { Link, useNavigate } from "react-router-dom";
import { MainButton } from "../../ui/buttons";
import { ModalDeletePet } from "../ModalDeletePet";
import { useRecoilState } from "recoil";
import { petDataModal } from "../../atoms";

const url = "https://lostpets.onrender.com";

type MyLostPetItemProps = {
  name: string;
  ubication: string;
  picture: string;
  petId: number;
};

function MyLostPetItem(props: MyLostPetItemProps) {

  const { name, ubication, picture, petId } = props;
  const [mostrar, setMostrar] = useState(false);
  
  const [petDataModalState, setpetDataModalState] = useRecoilState(petDataModal);
  
  const navigate = useNavigate();

  function EditPet() {
    navigate("/editar-mascota", { replace: true, state: props });
  }

  // function DeletePet() {
  //   fetch(url + "/delete-pet/" + petId, {
  //     method: "post",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ status: "deleted" }),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log("Mascota Eliminada", name);
  //       // ACA LLAMAR A RENDERIZAR LA PAGE NUEVAMENTE PARA QUE YA NO APAREZCA PERRULLO
  //     });
  // }

  return (
    <div className={css.root}>
      <img src={picture} className={css.root__picture} />
      <div className={css.root__data}>
        <h2>{name}</h2>
        <h3>{ubication}</h3>
        <div onClick={EditPet}>
          <MainButton >Editar Mascota</MainButton>
        </div>
        
        <div   onClick={() => {
            setMostrar(true),
              setpetDataModalState({
                name: name,
                petId: petId,
              });
          }}>
          <MainButton >Borrar Publicación</MainButton>
        </div>
        {/* <div onClick={DeletePet}>
          <MainButton >Borrar Publicación</MainButton>
        </div> */}

        <ModalDeletePet  isOpen={mostrar} onClose={() => setMostrar(false)}></ModalDeletePet>


      </div>
    </div>
  );
}

export { MyLostPetItem };
