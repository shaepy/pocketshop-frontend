import axios from "axios";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/shops`;

const TestRunShops = async () =>{
   try {
     const response = await axios.get(`${BASEURL}`)
     console.log(response.data)

     if(response.error){
        throw new Error(response.data.error)
     }

     return response.data
   } catch (error) {
        throw new Error(error);
   }

}


export default TestRunShops;