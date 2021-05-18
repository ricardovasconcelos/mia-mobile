import React from "react";
import styled from "styled-components/native";
import theme from "../../constants/theme";

const InputArea = styled.KeyboardAvoidingView`
  width: 100%;
  height: 60px;
  background-color: rgba(7, 211, 201, 0.2);
  flex-direction: row;
  border-radius: 6px;
  padding-left: 15px;
  align-items: center;
  margin-bottom: 15px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${theme.colors.brainDark};
  margin-left: 10px;
  height: 100%;
  font-family: 'Lato-Regular';
`;

interface IProps {
  IconSvg: any;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  password?: boolean;
}

export default ({
  IconSvg,
  placeholder,
  value,
  onChangeText,
  password,
}: IProps) => {
  return (
    <InputArea behavior="padding">
      <IconSvg width={24} height={24} fill={theme.colors.brain} />
      <Input
        placeholder={placeholder}
        placeholderTextColor={theme.colors.brainDark}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </InputArea>
  );
};
