import React from "react";
import css from "./index.css";

type MyInputProps = {
  defaultValue?: string;
  label: string
  name: string;
  type?: string
};

function MyInput(props: MyInputProps) {
  const { name, defaultValue, label, type } = props;

  return (
    <div className={css.root}>
      <label>{label}</label>
      <input type={type} name={name} defaultValue={defaultValue} className={css.input}/>
    </div>

  );
}

export { MyInput };
