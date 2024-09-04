export type SignUpPayload = {
  name: string;
  lastname: string;
  email: string;
  cellphone: string;
  password: string;
};

export type User = {
    name: string;
    lastname: string;
    email: string;
    password: string;
    cellphone: string;
    role: string;
    firebaseId: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
    };

export type SignInPayload = {
  email: string;
  password: string;
};