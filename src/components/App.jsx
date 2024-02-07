import { useRef, useState, forwardRef } from "react";
import { getImages } from "../js/request";
import "./App.css";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./searchBar/searchBar";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage";
import { Loader } from "./Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { ImageModal } from "./ImageModal/ImageModal";

const KEY = "tPyF-JOOf607yCQmy2T4mCANWSyx1bzc-VxDCaqrUmg";
const searchParams = {
  query: "",
  client_id: KEY,
  page: 1,
  per_page: 12,
};
let modalSrc = "";

export const App = () => {
  const [images, setImages] = useState([]);
  const [isShowButton, setIsShowButton] = useState(false);
  const [isError, setIsError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [modalIsShow, setModalShow] = useState(false);
  const modalRef = useRef();

  const searchImages = async (e) => {
    setShowLoader(true);
    e.preventDefault();
    if (e.target.search.value.trim() !== "") {
      searchParams.query = e.target.search.value;
      searchParams.page = 1;
      const arrayImages = await getImages(searchParams);
      if (arrayImages.status === 200) {
        setImages([...arrayImages.data.results]);
        setIsShowButton(true);
        setIsError("");
      } else {
        setIsError(arrayImages.data.errors[0]);
      }
    } else {
      toast.error("Fill in the input field");
    }

    setShowLoader(false);
  };

  const loadMoreImages = async () => {
    setShowLoader(true);
    searchParams.page += 1;
    const arrayImages = await getImages(searchParams);
    setImages([...images, ...arrayImages.data.results]);

    if (
      searchParams.page >= parseInt(arrayImages.total / searchParams.per_page)
    ) {
      setIsShowButton(false);
    }
    setShowLoader(false);
  };
  const closeModal = (e) => {
    if (e.target === e.currentTarget) setModalShow(false);
  };
  const closeModalEsc = (e) => {
    if (e.key === "Escape") {
      setModalShow(false);
      removeEventListener("keydown", closeModalEsc);
    }
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
      <SearchBar searchImages={searchImages} />
      {isError ? (
        <ErrorMessage error={isError} />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showLoader && <Loader />}
      {isShowButton && <LoadMoreBtn loadMoreImages={loadMoreImages} />}
      <Toaster position="top-center" reverseOrder={false} />
      {modalIsShow && <ImageModal value={modalSrc} closeModal={closeModal} />}
    </>
  );
};
