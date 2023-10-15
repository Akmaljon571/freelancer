export enum Who {
  employee = 'Employee',
  employer = 'Employer',
}

export interface IReturnMsg {
  status: number;
  message: string;
}

export interface IReturnToken {
  access_token: string;
  refresh_token: string;
}
