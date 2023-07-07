export const esAnonimo = (user) => user.username === "";
export const esPaseador = (user) => user.role === "PASEADOR";
export const esCliente = (user) => user.role === "CLIENTE";
