import React, { useState } from "react";
import { MyInput } from "../../ui/MyInput";
import { MainButton } from "../../ui/MyButton";
import { useRecoilValue } from "recoil";
import { userIdSelector } from "../../atoms";
import css from "./index.css";
import { useNavigate } from "react-router-dom";

const url = "https://lostpets.onrender.com";

function EditarMascotaPage() {

  const navigate = useNavigate();
  const userUbication: any = {};
  userUbication.lat = sessionStorage.getItem("lat");
  userUbication.lng = sessionStorage.getItem("lng");
  const hayUbicacion = userUbication.lat != "";


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
    console.log("updatedddddddddddd")

    datosNewPet.userId = userId;
    datosNewPet.name = (e.target["pet-name"].value).toUpperCase();
    datosNewPet.ubication = (e.target.petubication.value).toUpperCase();
    datosNewPet.status = "lost";

    const MAPKEY = "pk.58d33aa8a8d98aab3cf1c2140e1014e3"
    const PLACE =
      ((datosNewPet.ubication)
        .replace(',', '%2C'))
        .replace(' ', '%20')
        .replace('Á', '%C3%81')
        .replace('É', '%C3%89')
        .replace('Í', '%C3%8D')
        .replace('Ó', '%C3%93')
        .replace('Ú', '%C3%9A')

    fetch(

      `https://us1.locationiq.com/v1/search?key=${MAPKEY}&q=${PLACE}%2C%20argentina&format=json`
      // %2C = ,
      // %20 = spc
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const lat = +(data[0].lat)
        const lon = +(data[0].lon)
        console.log("LAT:", lat, typeof lat, "LON:", lon
        )

        datosNewPet.last_location_lat =lat;
        datosNewPet.last_location_lng =lon;

        console.log("datosNewPet", datosNewPet);





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
          
          
          if (hayUbicacion) {
            console.log("ya hay ubicacion, se redirecciona a pets");
            navigate("/pets", { replace: true });
          } else {
            console.log("NO hay ubicacion, se redirecciona a /");
            navigate("/", { replace: true });
          }
        })



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

        <MyInput label="Ciudad o barrio" name="petubication" defaultValue={ubication}></MyInput>

        <div className={css.map}>
          <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1MITVPExrphDfLkJqao9bzZtL7BO7Fv4&ehbc=2E312F" width="100%" height="344"></iframe>
        </div>

        <MainButton type="submit">Publicar</MainButton>

      </form>
    </div>
  );
}
export { EditarMascotaPage };
