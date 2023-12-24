import React from "react";

export type InputBtnProps = {
  text: string;
};

export type CustomInputProps = InputBtnProps & {
  autoFocus?: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

export type CustomBtnProps = InputBtnProps & {
  onPress: () => void;
};

export type RootStackParams = {
  GetStarted: undefined;
  LogIn: undefined;
  SignUp: undefined;
  TheTabBarNavigators: undefined;
};

export type SearchInputProps = CustomInputProps & {
  iconName: "search" | "at" | "document-outline" | "lock-closed-outline";
  onSearch?: () => void;
  clearSearch?: () => void;
  clearSearchIcon?: boolean;
  multiline?: boolean;
  showDetail?: boolean;
};

export interface CredentialItemProps {
  id: number;
  name: string;
}

export interface CredentialChildProps {
  item: CredentialItemProps;
  colour?: string;
  expireText?: string;
  recoverBtn?: () => void;
  deleteBtn?: () => void;
}
