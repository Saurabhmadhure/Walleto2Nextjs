export type UserInfo = {
  [key: string]: any;
};

export interface UserDetails {
  name: string;
  accNo: number;
  balance: number;
  token: string;
}

export interface HomeProps {
  userData: any;
}
