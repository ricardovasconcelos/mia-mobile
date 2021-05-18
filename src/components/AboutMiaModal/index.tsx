import React, { useState, useEffect } from "react";
import Swiper from "react-native-swiper";
import MiaLogo from "../../assets/images/mia.svg";
import NavPrevIcon from "../../assets/images/nav_prev.svg";
import NavNextIcon from "../../assets/images/nav_next.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LottieView from "lottie-react-native";
import AlertAnimation from "../../utils/alert-animation.json";
import TrackingAnimation from "../../utils/tracking-animation.json";
import {
  Container,
  ModalBody,
  SwipeDot,
  SwipeDotActive,
  SlideContainer,
  Title,
  CustomButton,
  CustomButtonText
} from "./style";
import theme from "../../constants/theme";

interface IProps {
  showModal: boolean;
  changeModalStage: (value: boolean) => void;
}

export default function AboutMiaModal({showModal, changeModalStage}: IProps) {
  const [alreadyShowed, setAlreadyShowed] = useState<boolean>(false)

  useEffect(() => {
    async function getModalApresentationState(){
      const apresentation = await AsyncStorage.getItem("apresentation");
      if(apresentation){
        setAlreadyShowed(true)
      }
    }
    getModalApresentationState()
  }, [])


  const handleClickContinue = async() => {
    await AsyncStorage.setItem("apresentation", 'true');
    changeModalStage(false)
  }

  return (
    <Container transparent={true} visible={showModal && !alreadyShowed} animationType="slide">
      <ModalBody>
        <Swiper
          showsButtons
          loop={false}
          dot={<SwipeDot />}
          activeDot={<SwipeDotActive />}
          prevButton={
            <NavPrevIcon width="35" height="35" fill={theme.colors.brain} />
          }
          nextButton={
            <NavNextIcon width="35" height="35" fill={theme.colors.brain} />
          }
        >
          <SlideContainer testID="first">
          <MiaLogo width="100%" height="80" />
              <Title>
                Saiba quais são as regiões onde pessoas contaminadas transitaram
              </Title>
              <LottieView
                style={{
                  width: 250,
                  height: 250,
                }}
                source={TrackingAnimation}
                autoPlay
                loop
              />
          </SlideContainer>
          <SlideContainer testID="second">
          <MiaLogo width="100%" height="80" />
            <Title>Caso você se contamine, crie um alerta para evitar mais contaminações</Title>
            <LottieView
              style={{
                width: 250,
                height: 250,
              }}
              source={AlertAnimation}
              autoPlay
              loop
            />
            <CustomButton onPress={handleClickContinue}>
              <CustomButtonText>Acessar</CustomButtonText>
            </CustomButton>
          </SlideContainer>
        </Swiper>
      </ModalBody>
    </Container>
  );
}
