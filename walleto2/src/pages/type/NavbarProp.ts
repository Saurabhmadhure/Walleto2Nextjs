export interface LoginModalProps {
  handleUserInfo: (data: any) => void;
  show: boolean;
  onHide: () => void;
}

export type SignUpModelProps = {
  handleUserInfo: (userInfo: any) => void;
  show: boolean;
  onHide: () => void;
};
export type NavBarProps = {
  handleUserInfo: (user: any) => void;
  userDetails: {
    name?: string;
    accNo?: number;
  } | null;
};
export interface UserDetails {
  name?: string;
  accNo?: number;
  balance?: number;
  token?: string;
}
