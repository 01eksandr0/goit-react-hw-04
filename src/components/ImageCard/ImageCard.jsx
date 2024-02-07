import React from "react";
import style from "./ImageCard.module.css";

export const ImageCard = ({ urls: { raw, full } }) => {
  return (
    <div>
      <img src={raw} alt="" width={300} height={220} data-src={full} />
    </div>
  );
};
