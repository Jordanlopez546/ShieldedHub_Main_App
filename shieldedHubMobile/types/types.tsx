import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";
import {
  DrawerNavigationState,
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { Dispatch, SetStateAction } from "react";

// Input Btn Common type of string
export type InputBtnProps = {
  text: string;
};

// Custom Input props for Signup and login screens
export type CustomInputProps = InputBtnProps & {
  autoFocus?: boolean;
  value: string;
  onChangeText?: (text: string) => void;
};

// Custom Btn buttons props types
export type CustomBtnProps = InputBtnProps & {
  onPress: () => void;
};

// Stack Navigator screen props types
export type RootStackParams = {
  GetStarted: undefined;
  LogIn: undefined;
  SignUp: undefined;
  TheTabBarNavigators: undefined;
  CredentialItemScreen: CredentialItemScreenParams;
  DrawerStackNavigator: undefined;
};

// Tab Bar Navigator screen props types
export type TabParamList = {
  Credentials: undefined;
  NewDetail: undefined;
  RecycleBin: undefined;
};

// Tab Bar Navigator screen navigation props type
export type TabNavigatorProps = CredentialItemScreenNavigationOptions & {
  navigation: NavigationProp<TabParamList>;
  isDarkMode?: boolean;
  setIsDarkMode?: React.Dispatch<SetStateAction<boolean>>;
};

// Search input props types
export type SearchInputProps = CustomInputProps & {
  iconName: "search" | "at" | "document-outline" | "lock-closed-outline";
  onSearch?: () => void;
  clearSearch?: () => void;
  clearSearchIcon?: boolean;
  multiline?: boolean;
  showDetail?: boolean;
  editable?: boolean;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode?: boolean;
};

// Credential detail item props types
export interface CredentialItemProps {
  id: number;
  title: string;
  email: string;
  password: string;
  notes?: string;
}

// Recycle bin item props types
export interface RecycleItemProps {
  id: number;
  title: string;
}

// Credential Child props types
export interface CredentialChildProps {
  item: CredentialItemProps;
  colour?: string;
  createdText?: string;
  recoverBtn?: () => void;
  deleteBtn?: () => void;
  staticData: CredentialItemProps[];
  setStaticData: Dispatch<SetStateAction<CredentialItemProps[]>>;
  isDarkMode?: boolean;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Recycle bin child props types
export interface RecycleChildProps {
  item: RecycleItemProps;
  colour?: string;
  expireText?: string;
  recoverBtn?: () => void;
  deleteBtn?: () => void;
  isDarkMode?: boolean;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Credential item screen params prop types
export interface CredentialItemScreenParams {
  credentialId: number;
  credentialTitle: string;
  credentialEmail: string;
  credentialPassword: string;
  credentialNotes?: string;
  setStaticData: Dispatch<SetStateAction<CredentialItemProps[]>>;
  staticData: CredentialItemProps[];
}

// Credential item screen route prop type
export type CredentialItemScreenRouteProp = RouteProp<
  RootStackParams,
  "CredentialItemScreen"
>;

// Credential item screen props types
export interface CredentialItemScreenProps {
  route: CredentialItemScreenRouteProp;
  navigation: StackNavigationProp<RootStackParams, "CredentialItemScreen">;
}

// Recycle Screen Global Props
export interface RecycleScreenGlobalProps {
  theme?: string;
  setTheme?: React.Dispatch<React.SetStateAction<string>>;
  isModalVisible?: boolean;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  currentScreen?: string;
  handleScreenChange?: (screen: string) => void;
  isDarkMode?: boolean;
  setIsDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
}
// Credential Item screen navigation data(Static data for the app) prop types
export interface CredentialItemScreenNavigationOptions
  extends RecycleScreenGlobalProps {
  setStaticData: React.Dispatch<React.SetStateAction<CredentialItemProps[]>>;
  staticData: CredentialItemProps[];
}

// Stack credential items props types
export interface StackCredentialItemProps {
  route: CredentialItemScreenRouteProp;
  navigation: StackNavigationProp<RootStackParams, "CredentialItemScreen">;
  setStaticData: React.Dispatch<React.SetStateAction<CredentialItemProps[]>>;
  staticData: CredentialItemProps[];
  isDarkMode?: boolean;
  setIsDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
  theme?: string;
  setTheme?: React.Dispatch<React.SetStateAction<string>>;
}

// Home Stack Navigator Props types
export type HomeStackNavigatorProps = {
  navigation: StackNavigationProp<RootStackParams>;
  route: any;
  setStaticData: React.Dispatch<React.SetStateAction<CredentialItemProps[]>>;
  staticData: CredentialItemProps[];
};

// The drawer content component props
export type DrawerContentComponentProps =
  CredentialItemScreenNavigationOptions & {
    handleLogout: () => void;
    changeTheme: () => void;
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
  };
