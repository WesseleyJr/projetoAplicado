import axios from "axios";

const url = "http://35.223.203.22:8016";


  export const InserirEncaminhamento = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${url}/api/encaminhamento`, data, {headers: {
        Authorization: `Bearer ${token}`,
      },});
      return {sucess: true, data: response.data};
    } catch (error) {
      console.log(error);
      
      return {sucess:false, data:error};
    }
  };


  export const GetEncaminhamento = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${url}/api/encaminhamento`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const item = response.data.find(
        (encaminhamento) =>
          encaminhamento?.consulta?.fila?.id === id
      );
  
      if (!item) {
        console.log("Nenhum encaminhamento encontrado");
      }
  
      console.log(item);
      return { success: true, data: item };
    } catch (error) {
      console.log(error);
      return { success: false, data: error };
    }
  };
  

  export const EnviarArquivo = async (file, idEncaminhamento) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('file', file);
    formData.append("idEncaminhamento", idEncaminhamento);

    console.log(file, idEncaminhamento);
    console.log(formData);
    
    

    try {
      const response = await axios.post(`${url}/api/exame`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Erro no envio do arquivo:", error.response || error);
      return { success: false, data: error.response || error };
    }
  };
  