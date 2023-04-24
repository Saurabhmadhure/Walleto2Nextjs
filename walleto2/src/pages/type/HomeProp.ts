export type UserInfo = {
  [key: string]: any;
};

export type UserDetails = {
  name: string;
  accNo: number;
  balance: number;
  token: string;
};

export type HomeProps = {
  userData: any;
};
export type Props = {
  userDetails: {
    accNo: number;
    token: string;
  };
};
export type DepositFormProps = {
  userDetails: any;
  handleDepositSuccess: (balance: number) => void;
};
export type LoginParam = {
  email: string;
  password: string;
};
