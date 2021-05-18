import React, { useEffect } from "react";
import { Container } from "./style";
import { useNavigation } from "@react-navigation/native";

import LottieView from "lottie-react-native";
import MiaAnimation from "../../utils/mia-animation.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Preload() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");

      setTimeout(() => {
        if (token) {
          navigation.reset({
            routes: [{ name: "MainTab" }],
          });
        } else {
          navigation.reset({
            routes: [{ name: "SignIn" }],
          });
        }
      }, 3000);
    };

    checkToken();
  }, []);
  return (
    <Container>
      <LottieView
        style={{
          width: 300,
          height: 300,
        }}
        source={MiaAnimation}
        autoPlay
        loop
      />
    </Container>
  );
}
