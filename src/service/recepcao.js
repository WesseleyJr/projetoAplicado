import axios from "axios";

const url = "http://35.223.203.22:8016";

export const InserirPaciente = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${url}/api/pacientes`, data, {headers: {
      Authorization: `Bearer ${token}`,
    },});
    return {success: true, data: response.data};
  } catch (error) {
    return {success:false, data:error};
  }
};

export const GetPacienteCpf = async (cpf) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${url}/api/pacientes/${cpf}`, {headers: {
      Authorization: `Bearer ${token}`,
    },});

    const paciente = {
      nomeCompleto: response.data.nomeCompleto,
      cpf: response.data.cpf,
      telefone: response.data.telefone,
      dataDeNascimento: response.data.dataDeNascimento,
      genero: response.data.genero,
      cep: response.data.cep,
      rua: response.data.rua,
      numero: response.data.numero,
      complemento: response.data.complemento,
      bairro: response.data.bairro,
      cidade: response.data.cidade,
      estado: response.data.estado,
      id: response.data.id,
    };
    
    return {sucess:true, data:response.data}
  } catch (error) {
    return {sucess:false, data:error}
  }
};

export const PutPaciente = async (data, id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${url}/api/pacientes/${id}`, data, {headers: {
      Authorization: `Bearer ${token}`,
    },});
    return response.data;
  } catch (error) {
    return "";
  }
};

export const PostEncaminhar = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${url}/api/fila`, data, {headers: {
      Authorization: `Bearer ${token}`,
    },});
    
    return {sucess:true, data:response}
  } catch (error) {
    return {sucess:false, data:error}
  }
};

