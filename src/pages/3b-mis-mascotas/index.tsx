import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { myReportedPetsSelector } from "../../atoms";
import { LostPetItem } from "../../components/LostPetItem";
import css from "./index.css";

function MisMascotasPage() {
  
  const misMascotasReportadas = useRecoilValue(myReportedPetsSelector);
  useEffect(
    () => console.log("effect", misMascotasReportadas),
    [misMascotasReportadas]
  );

  return (
    <div>
      <h1>Mis Mascotas</h1>

      <div className={css.results} id="results">
        {misMascotasReportadas.map((m) => (
          <LostPetItem
            key={m.id}
            petId={m.id}
            name={m.name}
            ubication={m.ubication}
            picture={m.picture_url}
            owner="me"
          />
        ))}
      </div>
    </div>
  );
}
export { MisMascotasPage };