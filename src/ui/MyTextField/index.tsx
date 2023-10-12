import React from "react";
import css from "./index.css";

function MainTextField(props) {
  return <input {...props} className={css.root} />;
}

export { MainTextField };
