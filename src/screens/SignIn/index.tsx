import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AboutMiaModal from "../../components/AboutMiaModal";

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
import SignInput from "../../components/SignInput";
import api from "../../services/api";

import Toast from "react-native-toast-message";
import { Platform } from "react-native";

export default function SignIn() {
  const navigation = useNavigation();

  const [emailField, setEmailField] = useState<string>("");
  const [passwordField, setPasswordField] = useState<string>("");
  const [apresentitionModal, setApresentitionModal] = useState<boolean>(true);

  const handleSignInClick = async () => {
    if (emailField === "" && passwordField === "") {
      return Toast.show({
        type: "error",
        text1: "Não foi possível fazer login",
        text2: "Preencha os campos corretamente 🙂",
      });
    }
    try {
      const { data } = await api.post("/auth", {
        email: emailField,
        password: passwordField,
      });
      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("userInfo", JSON.stringify(data.user));
        navigation.reset({
          routes: [{ name: "MainTab" }],
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Não foi possível fazer login",
        text2: "Ocorreu um erro inesperado, tente novamente! 🙂",
      });
    }
  };

  const handleChangeModalState = useCallback((value) => {
    setApresentitionModal(value)
  }, []);

  const handleNavigateToSignUp = () => {
    navigation.reset({
      routes: [{ name: "SignUp" }],
    });
  };

  return (
    <Container behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <MiaLogo width="100%" height="80" />

      <InputArea>
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

        <CustomButton onPress={handleSignInClick}>
          <CustomButtonText>Entrar</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleNavigateToSignUp}>
        <SignMessageButtonText>Não tem conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>

      <AboutMiaModal showModal={apresentitionModal} changeModalStage={handleChangeModalState}/>
    </Container>
  );
}
