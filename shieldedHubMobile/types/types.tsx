import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Dispatch, SetStateAction } from "react";

export type InputBtnProps = {
  text: string;
};

export type CustomInputProps = InputBtnProps & {
  autoFocus?: boolean;
  value: string;
  onChangeText?: (text: string) => void;
};

export type CustomBtnProps = InputBtnProps & {
  onPress: () => void;
};

export type RootStackParams = {
  GetStarted: undefined;
  LogIn: undefined;
  SignUp: undefined;
  TheTabBarNavigators: undefined;
  CredentialItemScreen: CredentialItemScreenParams;
};

export type SearchInputProps = CustomInputProps & {
  iconName: "search" | "at" | "document-outline" | "lock-closed-outline";
  onSearch?: () => void;
  clearSearch?: () => void;
  clearSearchIcon?: boolean;
  multiline?: boolean;
  showDetail?: boolean;
  editable?: boolean;
};

export interface CredentialItemProps {
  id: number;
  title: string;
  email: string;
  password: string;
  notes?: string;
}

export interface RecycleItemProps {
  id: number;
  title: string;
}

export interface CredentialChildProps {
  item: CredentialItemProps;
  colour?: string;
  expireText?: string;
  recoverBtn?: () => void;
  deleteBtn?: () => void;
  staticData: CredentialItemProps[];
  setStaticData: Dispatch<SetStateAction<CredentialItemProps[]>>;
}

export interface RecycleChildProps {
  item: RecycleItemProps;
  colour?: string;
  expireText?: string;
  recoverBtn?: () => void;
  deleteBtn?: () => void;
}

export interface CredentialItemScreenParams {
  credentialId: number;
  credentialTitle: string;
  credentialEmail: string;
  credentialPassword: string;
  credentialNotes?: string;
  setStaticData: Dispatch<SetStateAction<CredentialItemProps[]>>;
  staticData: CredentialItemProps[];
}

export type CredentialItemScreenRouteProp = RouteProp<
  RootStackParams,
  "CredentialItemScreen"
>;

export interface CredentialItemScreenProps {
  route: CredentialItemScreenRouteProp;
  navigation: StackNavigationProp<RootStackParams, "CredentialItemScreen">;
}

export interface CredentialItemScreenNavigationOptions {
  setStaticData: React.Dispatch<React.SetStateAction<CredentialItemProps[]>>;
  staticData: CredentialItemProps[];
}