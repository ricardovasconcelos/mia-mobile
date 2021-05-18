import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from "./style";

import MiaLogo from "../../assets/images/mia.svg";
import EmailIcon from "../../assets/images/email.svg";
import LockIcon from "../../assets/images/lock.svg";
import PersonIcon from "../../assets/images/person.svg";
import SignInput from "../../components/SignInput";
import api from "../../services/api";

import {Platform} from 'react-native'

import Toast from "react-native-toast-message";

export default function SignUp() {
  const navigation = useNavigation();

  const [nameField, setNameField] = useState<string>("");
  const [emailField, setEmailField] = useState<string>("");
  const [passwordField, setPasswordField] = useState<string>("");

  const handleSignUpClick = async () => {
    if (nameField === "" && emailField === "" && passwordField === "") {
      return Toast.show({
        type: "error",
        text1: "Não foi possível criar conta",
        text2: "Preencha os campos corretamente 🙂",
      });
    }
    try {
      const { status } = await api.post("/users", {
        name: nameField,
        email: emailField,
        password: passwordField,
      });

      if (status === 200) {
        navigation.reset({
          routes: [{ name: "SignIn" }],
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Não foi possível se cadastrar",
        text2: "Ocorreu um erro inesperado, tente novamente! 🙂",
      });
    }
  };

  const handleNavigateToLogin = () => {
    navigation.reset({
      routes: [{ name: "SignIn" }],
    });
  };

  return (
    <Container behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <MiaLogo width="100%" height="80" />

      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={(text) => setNameField(text)}
        />
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu e-mail"
          value={emailField}
          onChangeText={(text) => setEmailField(text)}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={(text) => setPasswordField(text)}
          password
        />

        <CustomButton onPress={handleSignUpClick}>
          <CustomButtonText>Cadastrar</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleNavigateToLogin}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Fazer login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
}
