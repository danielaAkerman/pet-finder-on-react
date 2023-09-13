import React from "react";
import { Link } from "react-router-dom";
// import { ubicationState } from "../../atoms";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { useNavigate } from "react-router-dom";
// import { userDataAtom } from "../../atoms";

// const search = require("../../assets/img/search.jpeg");

// const url = "https://lostpets.onrender.com";

function NotFoundPage() {
  return (
    <div>
      NOT FOUND
      <Link to={"/"}>Volver al inicio</Link>
    </div>
  );
}

export { NotFoundPage };
