import axios from "axios";

export const consultaCep = async (value) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
    
    if (response.data.erro) {
      return '';
    }
    
    return response.data;
  } catch (error) {
    return '';
  }
};
