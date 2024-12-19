import axios from "axios";

const url = "http://35.223.203.22:8016";



export const GetfilaTriagem = async (page) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${url}/api/fila/setor/Triagem?page=${page}`, {headers: {
      Authorization: `Bearer ${token}`,
    },});
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pacientes na fila:', error);
    return [];
  }
};

export const GetfilaMedico = async (page) => {
  const token = localStorage.getItem("token");
  const setor = 'Médico'
  try {
    const response = await axios.get(`${url}/api/fila/setor/Médico?page=${page}`, {headers: {
      Authorization: `Bearer ${token}`,
    },});
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pacientes na fila:', error);
    return [];
  }
};

export const GetfilaExame = async (page) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${url}/api/fila/setor/Exame?page=${page}`, {headers: {
      Authorization: `Bearer ${token}`,
    },});
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pacientes na fila:', error);
    return [];
  }
};


export const PostEncaminhar = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${url}/api/fila`, data, {headers: {
      Authorization: `Bearer ${token}`,
    },});
    return {sucess: true, data: response.data};
  } catch (error) {
    return {sucess: false, data: error};
  }
};

export const PutFila = async (data, id) =>{
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${url}/api/fila/${id}`, data, {headers: {
      Authorization: `Bearer ${token}`,
    },});
    return {sucess: true, data: response.data};
  } catch (error) {
    return {sucess: false, data: error};
  }

}