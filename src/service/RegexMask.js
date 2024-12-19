export const RegexCep = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
};

export const RegexPrecao = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2,3})(\d{2})/, "$1/$2")
    .slice(0, 6);
};

export const RegexTelefone = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1)$2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 14);
};

export const RegexData = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 10);
  };

// export const RegexData = (value) => {
//   return value
//     .replace(/\D/g, '')
//     .replace(/^(\d{4})(\d{2})/, '$1-$2')
//     .replace(/^(\d{4}-\d{2})(\d{2})/, '$1-$2')
//     .slice(0, 10);
// };


  export const RegexCpf = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3}\.\d{3}\.\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };
  
  

  
