export interface serverResponse {
  data: {
    status: string;
    message: string;
    data?: any;
  };
}

export interface loginResponse {
  status: string;
  message: string;
  data?: any;
}
