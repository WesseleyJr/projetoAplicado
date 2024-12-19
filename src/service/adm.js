import axios from "axios";

const url = "http://35.223.203.22:8016";

export const inserirFuncionario = async (data) => {
  try {
    const response = await axios.post(`${url}/api/colaborador`, data);
    return {sucess: true, data: response.data};
  } catch (error) {    
    return {sucess:false, data:error};
  }
};




