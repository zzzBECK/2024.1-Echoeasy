export class GetUsuarioDto {
  email: string;
  name: string;
  lastname: string;
  role: string;
  cellphone: string;
  firebaseId: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    email: string,
    name: string,
    lastname: string,
    role: string,
    cellphone: string,
    firebaseId: string,
    image: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this.email = email;
    this.name = name;
    this.lastname = lastname;
    this.role = role;
    this.cellphone = cellphone;
    this.firebaseId = firebaseId;
    this.image = image;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}
