import React from "react";
import css from "./index.css";

type MyTextProps = {
  styleName: string;
  children: string

};

function MyText(props: MyTextProps) {
  const { styleName, children } = props;

  return (
    <span className={css[styleName]}>{children}</span>
  );
}

export { MyText };
