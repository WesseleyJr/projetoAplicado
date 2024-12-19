import axios from "axios";

const url = "http://35.223.203.22:8016";




export const GetPaciente = async () => {
  const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${url}/api/pacientes`, {headers: {
        Authorization: `Bearer ${token}`,
      },});
      
      return {sucess:true, data:paciente}
    } catch (error) {
      return {sucess:false, data:error}
    }
  };

  export const InserirConsulta = async (data, token) => {
    try {
      const response = await axios.post(`${url}/api/consulta`, data, {headers: {
        Authorization: `Bearer ${token}`,
      },});
      return {sucess: true, data: response.data};
    } catch (error) {
      return {sucess:false, data:error};
    }
  };


  export const AtualizarConsulta = async (data, id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(`${url}/api/consulta/${id}`, data, {headers: {
        Authorization: `Bearer ${token}`,
      },});
      return {sucess: true, data: response.data};
    } catch (error) {
      return {sucess:false, data:error};
    }
  };

  export const GetTriagem = async (id) =>{
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${url}/api/triagem/fila/${id}`, {headers: {
        Authorization: `Bearer ${token}`,
      },});
      
      return {sucess:true, data:response.data}
    } catch (error) {
      return {sucess:false, data:error}
    }
  } 
  

  export const GetProntuario = async (id) =>{
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${url}/api/consulta/paciente/${id}`, {headers: {
        Authorization: `Bearer ${token}`,
      },});
      
      console.log(response.data);
      
      return {sucess:true, data:response.data}
    } catch (error) {
      return {sucess:false, data:error}
    }
  } 
