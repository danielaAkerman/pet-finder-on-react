import React from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./router";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </RecoilRoot>,
  document.querySelector(".example")
);
