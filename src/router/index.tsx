import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import { UbicationPage } from "../pages/0-ubication";
import { PetsPage } from "../pages/1-welcome";
import { SignUpPage } from "../pages/2a-signup";
import { LoginPage } from "../pages/2b-login";
import { MisDatosPage } from "../pages/2c-mis-datos";
import { PublicarPage } from "../pages/3a-publicar";
import { MisMascotasPage } from "../pages/3b-mis-mascotas";
import { EditarMascotaPage } from "../pages/3c-editar-mascota";
import { NotFoundPage } from "../pages/not-found";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UbicationPage />} />
        <Route path="ubication" element={<UbicationPage />} />
        <Route path="pets" element={<PetsPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="log-in" element={<LoginPage />} />
        <Route path="mis-datos" element={<MisDatosPage />} />
        <Route path="publicar-mascota" element={<PublicarPage />} />
        <Route path="mis-mascotas" element={<MisMascotasPage />} />
        <Route path="editar-mascota" element={<EditarMascotaPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export { AppRoutes };
