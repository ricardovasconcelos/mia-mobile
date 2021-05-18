import React from "react";
import LottieView from "lottie-react-native";
import LocationAnimation from "../../utils/location-animation.json";
export default function Loading() {
  return (
    <LottieView
      style={{
        width: 300,
        height: 300,
      }}
      source={LocationAnimation}
      autoPlay
      loop
    />
  );
}
