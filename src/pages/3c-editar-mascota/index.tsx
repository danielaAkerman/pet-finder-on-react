import React, { useState } from "react";
import { MyInput } from "../../ui/MyInput";
import { MainButton } from "../../ui/MyButton";
import { useRecoilValue } from "recoil";
import { userIdSelector } from "../../atoms";
import css from "./index.css"

const url = "https://lostpets.onrender.com";

function EditarMascotaPage() {
  const petData = history.state.usr
  const { name, ubication, picture, petId } = petData;
  const userId = useRecoilValue(userIdSelector);
  const [showPetImg, setShowPetImg] = useState(true)
  const datosNewPet: any = {};

  const convertiraBase64 = (archivos) => {
    Array.from(archivos).forEach((archivo: any) => {
      var reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = function () {
        var base64 = reader.result;
        // console.log(base64);
        datosNewPet.imagen_data = base64;
      };
    });
  };

  function deletePetImage() {
    datosNewPet.imagen_data = ""
    setShowPetImg(false)
  }

  function submittedPet(e) {
    e.preventDefault();

    datosNewPet.userId = userId;
    datosNewPet.name = e.target["pet-name"].value;
    datosNewPet.ubication = e.target["pet-ubication"].value;
    datosNewPet.status = "lost";
    // MOCK:
    datosNewPet.last_location_lat = -31.4331816;
    datosNewPet.last_location_lng = -64.2249415;


    fetch(url + "/edit-pet/" + petId, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(datosNewPet),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Se editó", data);
      });
  }


  return (
    <div className={css.root}>

      <h1>Editar Mascota</h1>

      <form onSubmit={submittedPet} className={css.form}>

        <MyInput label="Nombre de tu mascota" name="pet-name" defaultValue={name}></MyInput>

        <img src={picture} style={{ display: showPetImg ? "grid" : "none" }} className={css.pet_image} />

        <div className={css["dropzone"]}> Arrastra tu imagen aquí
          <div>
            <input
              type="file"
              multiple
              onChange={(e) => convertiraBase64(e.target.files)}
              className={css.input_img}
            />
          </div>
        </div>

        <div onClick={() => deletePetImage()}>
          <MainButton type="button">Eliminar esta imagen</MainButton>
        </div>

        <MyInput label="Ciudad o barrio" name="pet-ubication" defaultValue={ubication}></MyInput>

        <div className={css.map}>
          <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1MITVPExrphDfLkJqao9bzZtL7BO7Fv4&ehbc=2E312F" width="100%" height="344"></iframe>
        </div>

        <MainButton type="submit">Publicar</MainButton>

      </form>
    </div>
  );
}
export { EditarMascotaPage };
