import axios from "axios";

const url = "http://35.223.203.22:8016";


  export const InserirPrescricao = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${url}/api/prescricoes`, data, {headers: {
        Authorization: `Bearer ${token}`,
      },});
      return {sucess: true, data: response.data};
    } catch (error) {
      return {sucess:false, data:error};
    }
  };

  