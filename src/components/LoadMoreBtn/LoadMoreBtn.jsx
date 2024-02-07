import React from "react";
import style from "./LoadMoreBtn.module.css";

export const LoadMoreBtn = ({ loadMoreImages }) => {
  return (
    <button className={style.btn} type="button" onClick={loadMoreImages}>
      Load more
    </button>
  );
};
