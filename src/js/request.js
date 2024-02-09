import axios from "axios";

export const getImages = async (params) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photo`, {
      params,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
