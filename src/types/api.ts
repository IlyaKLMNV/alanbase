export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  job?: string;
}

export interface Meta {
  from: number;
  to: number;
  total: number;
}

export interface ApiResponse {
  data: User[];
  meta: Meta;
}

