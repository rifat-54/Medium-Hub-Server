export interface IRegisterUserPayload {
  email: string;
  password: string;
  name: string;
}

export interface ILoginUserPayload {
  email: string;
  password: string;
}
