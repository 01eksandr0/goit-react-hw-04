import { useRef, useState, forwardRef, useEffect } from "react";
import { getImages } from "../js/request";
import "./App.css";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./SearchBar/SearchBar";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage";
import { Loader } from "./Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { ImageModal } from "./ImageModal/ImageModal";

const KEY = "tPyF-JOOf607yCQmy2T4mCANWSyx1bzc-VxDCaqrUmg";
let modalSrc = "";

export const App = () => {
  const [images, setImages] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [isError, setIsError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [modalIsShow, setModalShow] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;
    const addNewImages = async () => {
      const searchParams = {
        query,
        client_id: KEY,
        page,
        per_page: 12,
      };
      const arrayImages = await getImages(searchParams);
      if (arrayImages.status === 200) {
        setShowBtn(
          arrayImages.data.total_pages && arrayImages.data.total_pages !== page
        );
        if (searchParams.page === 1) {
          setImages([...arrayImages.data.results]);
        } else {
          setImages([...images, ...arrayImages.data.results]);
        }
        setIsError("");
      } else {
        setIsError(arrayImages.data.errors[0]);
      }
    };
    addNewImages();
    setShowLoader(false);
  }, [page, query]);

  const getSearchWord = (e) => {
    setShowLoader(true);
    e.preventDefault();
    if (e.target.search.value.trim() !== "") {
      setQuery(e.target.search.value);
      setPage(1);
    } else {
      toast.error("Fill in the input field");
    }
  };

  const loadMoreImages = () => {
    setPage(page + 1);
    setShowLoader(true);
  };

  const openModal = (e) => {
    if (e.target.nodeName === "IMG") {
      modalSrc = e.target.dataset.src;
      setModalShow(true);
      addEventListener("keydown", closeModalEsc);
    }
  };
  return (
    <>
      <SearchBar getSearchWord={getSearchWord} />
      {isError ? (
        <ErrorMessage error={isError} />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showLoader && <Loader />}
      {showBtn && <LoadMoreBtn loadMoreImages={loadMoreImages} />}
      <Toaster position="top-center" reverseOrder={false} />
      {modalIsShow && <ImageModal value={modalSrc} closeModal={closeModal} />}
    </>
  );
};
