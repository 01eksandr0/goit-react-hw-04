import React from "react";
import style from "./SearchBar.module.css";
import { IoMdSearch } from "react-icons/io";

export const SearchBar = ({ getSearchWord }) => {
  return (
    <header className={style.header}>
      <form className={style.form} onSubmit={getSearchWord}>
        <input
          className={style.search}
          autoComplete="off"
          name="search"
          autoFocus
          type="text"
          placeholder="Search images..."
        />
        <button className={style.btn} type="submit">
          <IoMdSearch className={style.icon} />
        </button>
      </form>
    </header>
  );
};
