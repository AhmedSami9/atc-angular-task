export interface RegisterData{
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
  };
}