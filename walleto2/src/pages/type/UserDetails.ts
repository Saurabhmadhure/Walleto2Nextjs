export type UserDetails = {
  name: string;
  accNo: number;
  balance: number;
  token: string;
};

export interface Props {
  userDetails: UserDetails | null;
}
export type NavBarProps = {
  handleUserInfo: (userInfo: any) => void;
  userDetails: UserDetails | null;
};
export type SendMoneyFormProps = {
  // onSubmit: (receiverId: string, amount: number) => Promise<void>;
  children: React.ReactNode;
  userDetails: { accNo: number; token: string };
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  handleDepositSuccess: (data: number | null) => void;
};
