import React, { forwardRef } from "react";
import style from "./ImageModal.module.css";

export const ImageModal = ({ value, closeModal }) => {
  return (
    <div className={style.background} onClick={closeModal}>
      <img src={value} alt="" />
    </div>
  );
};
