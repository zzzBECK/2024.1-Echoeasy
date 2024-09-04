export const roleDict: { [key: string]: string } = {
  admin: "Administrador",
  user: "Usuário",
  default: "Usuário",
};

export const getRole = (role: string) => roleDict[role] || roleDict.default;
