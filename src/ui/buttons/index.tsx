import React from "react";
import css from "./index.css";

type MainButtonProps = {
  children: any
  type?:any
};

function MainButton(props: MainButtonProps) {
  return <button type={props.type} className={css.root}>{props.children}</button>;
}

export { MainButton };
