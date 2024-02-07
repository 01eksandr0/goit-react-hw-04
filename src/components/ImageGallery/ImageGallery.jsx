import React from "react";
import style from "./ImageGallery.module.css";
import { ImageCard } from "../ImageCard/ImageCard";

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={style.list} onClick={openModal}>
      {images.map(({ id, urls }) => {
        return (
          <li key={id}>
            <ImageCard urls={urls} />
          </li>
        );
      })}
    </ul>
  );
};
