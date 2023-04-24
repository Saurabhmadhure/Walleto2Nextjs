export type UserDetails = {
  name: string;
  accNo: number;
  balance: number;
  token: string;
};

export interface Props {
  userDetails: UserDetails | null;
}
