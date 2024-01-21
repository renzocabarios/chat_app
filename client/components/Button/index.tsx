"use client";
import style from "./style.module.css";
export interface IButton {
  title?: string;
  name?: string;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
}

export default function Button({ title, type, onClick }: IButton) {
  return (
    <button
      className={style.container}
      type={type ?? "button"}
      onClick={onClick ?? (() => {})}
    >
      {title ?? "undefined"}
    </button>
  );
}
