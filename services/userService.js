import axios from "./axiosConfig";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/user/`;

const getUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}${userId}`);

    if (!response.data) {
      throw new Error("Error fetching a user", response.data.error);
    }

    return response.data;
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    return null;
  }
};

export { getUser };


