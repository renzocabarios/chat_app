"use client";

import { HTMLInputTypeAttribute } from "react";
import style from "./style.module.css";
export interface IInputField {
  title?: string;
  name?: string;
  value?: string;
  onChange?: (event: any) => void;
  type?: HTMLInputTypeAttribute;
}
export default function InputField({
  title,
  name,
  type,
  value,
  onChange,
}: IInputField) {
  return (
    <div className={style.container}>
      {title ? <p>{title}</p> : <></>}
      <input
        className={style.input}
        value={value}
        name={name}
        type={type ?? "text"}
        onChange={onChange ?? (() => {})}
      />
    </div>
  );
}
