import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logout from "../../assets/images/logout.svg";
import Cough from "../../assets/images/cough.svg";
import Doctor from "../../assets/images/doctor.svg";
import DontTouch from "../../assets/images/dont-touch.svg";
import Mask from "../../assets/images/mask.svg";
import Social from "../../assets/images/social-distancing.svg";
import WashHands from "../../assets/images/wash-your-hands.svg";
import theme from "../../constants/theme";

import {
  Container,
  Header,
  UserName,
  DivisorField,
  Divisor,
  SideField,
  Description,
  ImageField,
  Wrapper,
  DescriptionField,
  Title,
  LogoutButton,
} from "./style";

interface IUser {
  id: string;
  name: string;
  email: string;
}

export default function BeSafe() {
  const [userInfo, setUserInfo] = useState<IUser>({
    id: "",
    name: "",
    email: "",
  });
  const navigation = useNavigation();

  useEffect(() => {
    async function getUserInfo() {
      const user = await AsyncStorage.getItem("userInfo");

      if (user) {
        setUserInfo(JSON.parse(user));
      }
    }
    getUserInfo();
  }, []);

  const handleLogoutClick = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.clear()
    navigation.reset({
      routes: [{ name: "SignIn" }],
    });
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <UserName ellipsizeMode="tail" numberOfLines={1}>
            {userInfo.name}
          </UserName>
          <LogoutButton onPress={handleLogoutClick}>
            <Logout height="34" width="34" fill={theme.colors.brain} />
          </LogoutButton>
        </Header>
        <DivisorField>
          <Divisor />
        </DivisorField>

        <Title>Recomendações de Segurança</Title>

        <SideField>
          <DescriptionField side="flex-start">
            <Description>
              Lave suas mãos com frequência. Use sabão e água ou álcool em gel.
            </Description>
          </DescriptionField>
          <ImageField side="flex-end">
            <WashHands height="200" width="200" />
          </ImageField>
        </SideField>

        <SideField>
          <DescriptionField side="flex-end">
            <Description>
              Mantenha uma distância segura de pessoas que estiverem tossindo ou
              espirrando.
            </Description>
          </DescriptionField>
          <ImageField side="flex-start">
            <Social height="200" width="200" />
          </ImageField>
        </SideField>

        <SideField>
          <DescriptionField side="flex-start">
            <Description>
              Use máscara quando não for possível manter o distanciamento
              físico.
            </Description>
          </DescriptionField>
          <ImageField side="flex-end">
            <Mask height="200" width="200" />
          </ImageField>
        </SideField>

        <SideField>
          <DescriptionField side="flex-end">
            <Description>Não toque nos olhos, no nariz ou na boca.</Description>
          </DescriptionField>
          <ImageField side="flex-start">
            <DontTouch height="200" width="200" />
          </ImageField>
        </SideField>

        <SideField>
          <DescriptionField side="flex-start">
            <Description>
              Cubra seu nariz e boca com o braço dobrado ou um lenço ao tossir
              ou expirar.
            </Description>
          </DescriptionField>
          <ImageField side="flex-end">
            <Cough height="200" width="200" />
          </ImageField>
        </SideField>

        <SideField>
          <DescriptionField side="flex-end">
            <Description>
              Procure atendimento médico se tiver febre, tosse e dificuldade
              para respirar.
            </Description>
          </DescriptionField>
          <ImageField side="flex-start">
            <Doctor height="200" width="200" />
          </ImageField>
        </SideField>
      </Wrapper>
    </Container>
  );
}
