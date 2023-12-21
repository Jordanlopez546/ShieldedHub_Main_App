import React from "react";

export type InputBtnProps = {
  text: string;
};

export type CustomInputProps = InputBtnProps & {
  autoFocus: boolean;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
};

export type CustomBtnProps = InputBtnProps & {
  onPress: () => void;
};

export type RootStackParams = {
  GetStarted: undefined;
  LogIn: undefined;
  SignUp: undefined;
};
