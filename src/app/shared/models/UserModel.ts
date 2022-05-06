export class UserModel {
  id: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: RoleModel;
}
export class loginModel {
  email: string;
  password: string;
}
export class RoleModel {
  idRole: number;
  type: string;
  role: RoleType;
}
export enum RoleType {
  SIMPLEUSER,
  TRAINER,
  LAWYER,
  ADMIN,
  PSYCHIATRIST,
  ABONNE,
}
