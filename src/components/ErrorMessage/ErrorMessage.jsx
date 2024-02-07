import React from "react";
import style from "./ErrorMessage.module.css";

export const ErrorMessage = ({ error }) => {
  return <p className={style.error}>{error}</p>;
};
