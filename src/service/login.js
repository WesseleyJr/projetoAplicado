import axios from "axios";

const url = "http://35.223.203.22:8016";

export const LoginApi = async (data) => {
    try {
      const response = await axios.post(`${url}/login`, data);
      return {sucess: true, data: response.headers["authorization"]};
    } catch (error) {
      return {sucess: false, data: response.data};
    }
};


export const GetCpf = async (cpf) => {
  try {
    const response = await axios.get(`${url}/api/colaborador/${cpf}`);
    return {sucess: true, data: response.data};
  } catch (error) {
    return {sucess: false, data: response.data};
  }
};