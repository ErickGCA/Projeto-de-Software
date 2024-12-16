const errorMessages = {
  validation: {
    requiredField: (field) => `O campo ${field} é obrigatório.`,
    invalidCPF: "O CPF informado é inválido. Verifique e tente novamente.",
    invalidDate: "A data informada é inválida.",
    noBeneficiarySelected: "Por favor, selecione um beneficiário válido.",
  },
  server: {
    default: "Ocorreu um erro no servidor. Tente novamente mais tarde.",
    conflict: "Já existe um registro com este CPF.",
  },
};

export default errorMessages;
