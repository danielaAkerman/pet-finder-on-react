import React from "react";
import css from "./index.css";

type MyInputProps = {
  defaultValue?: string;
  label: string
  name: string;
  type?: string
  textarea?: boolean
};

function MyInput(props: MyInputProps) {
  const { name, defaultValue, label, type, textarea } = props;

  return (
    <div className={css.root}>
      <label>{label}</label>
      {
        textarea ?
          <textarea name={name} defaultValue={defaultValue} className={css.input} />
          :
          <input type={type} name={name} defaultValue={defaultValue} className={css.input} />
      }
    </div>

  );
}

export { MyInput };
