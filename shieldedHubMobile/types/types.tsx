export type InputBtnProps = {
  text: string;
}

export type CustomInputProps = InputBtnProps & {
  autoFocus: boolean;
}

export type CustomBtnProps = InputBtnProps & {
  onPress: () => void;
}