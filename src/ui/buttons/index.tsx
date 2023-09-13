import React from "react";
import css from "./index.css";



function MainButton(props) {
  return <button type={props.type} className={css.root}>{props.children}</button>;
}

export { MainButton };
