import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { myReportedPetsSelector } from "../../atoms";
import { MyLostPetItem } from "../../components/MyLostPetItem";

function MisMascotasPage() {
  
  const misMascotasReportadas = useRecoilValue(myReportedPetsSelector);
  // useEffect(
  //   () => console.log("effect", misMascotasReportadas),
  //   [misMascotasReportadas]
  // );

  return (
    <div>
      <h1>Mis Mascotas</h1>

      <div className="results" id="results">
        {misMascotasReportadas.map((m) => (
          <MyLostPetItem
            key={m.id}
            petId={m.id}
            name={m.name}
            ubication={m.ubication}
            picture={m.picture_url}
          />
        ))}
      </div>
    </div>
  );
}
export { MisMascotasPage };
