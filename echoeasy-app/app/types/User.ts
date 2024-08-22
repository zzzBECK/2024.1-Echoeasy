export type SignUpPayload = {
  name: string;
  lastname: string;
  email: string;
  cellphone: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};