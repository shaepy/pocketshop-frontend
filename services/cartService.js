import axios from "./axiosConfig";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/carts/`;


//POST add cart item 
export const addProductToCart = async (formData) => {
    try {
        const response = await axios.post(`${BASEURL}new/`, formData);

        if(!response.data){
            throw new Error("Cound't add product to cart", response.data.error);
        }

        return response.data;
    } catch (error) {
        console.log("Error", error);
        throw new Error(error);
  
    }

}

