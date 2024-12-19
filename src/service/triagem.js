import axios from "axios";

const url = "http://35.223.203.22:8016";


export const FichaTriagem = async (data) => {
  const token = localStorage.getItem("token");
        try {
          const response = await axios.post(`${url}/api/triagem`, data,{headers: {
            Authorization: `Bearer ${token}`,
          },});
          
          return {sucess:true, data:response}
        } catch (error) {
          console.log('inserir triagem', error);
          
          return {sucess:false, data:error}
        }
};


export const PutFila = async (data, id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${url}/api/fila/${id}`, data, {headers: {
      Authorization: `Bearer ${token}`,
    },});
    
    return {sucess:true, data:response}
  } catch (error) {
    console.log('atualizar fila', error);
    return {sucess:false, data:error}
  }
};
