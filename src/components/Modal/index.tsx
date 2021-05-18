import React, { useState } from "react";
import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import Close from "../../assets/images/close.svg";

import theme from "../../constants/theme";
import api from "../../services/api";

const Container = styled.Modal``;

const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalBody = styled.View`
  background-color: ${theme.colors.primary};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
  margin-left: auto;
`;

const Text = styled.Text`
  color: ${theme.colors.brain};
  font-size: 28px;
  font-weight: bold;
  font-family: "Lato-Bold";
  text-align: center;
  padding-top: 10px;
  text-shadow: -1px 1px 10px rgba(0, 0, 0, 0.1);
`;

const FinishButton = styled.TouchableOpacity`
  background-color: ${theme.colors.brain};
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const FinishButtonText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: ${theme.colors.primary};
`;

const PickerField = styled.View``;

interface IProps {
  modalState: boolean;
  changeModal: (value: boolean) => void;
}

export default function Modal({ changeModal, modalState }: IProps) {
  const [selectedDisease, setSelectedDisease] = useState();

  const navigation = useNavigation();

  const handleCloseButton = () => {
    changeModal(false);
  };

  const handleConfirmDiagnostic = async () => {
    try {
      const user = await AsyncStorage.getItem("userInfo");
      const token = await AsyncStorage.getItem("token");
      if (user && token) {
        const headerConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { id } = JSON.parse(user);
        await api.post(
          "/infected",
          {
            user_id: id,
            disease_id: process.env.DISEASE_ID,
          },
          headerConfig
        );
        handleCloseButton();
        navigation.reset({
          routes: [{ name: "MainTab" }],
        });
      }
    } catch {
      handleCloseButton();
      navigation.reset({
        routes: [{ name: "MainTab" }],
      });
    }
  };

  return (
    <Container transparent={true} visible={modalState} animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <Close width="20" height="20" fill={theme.colors.brain} />
          </CloseButton>

          <Text>Eu fui diagnosticado com:</Text>

          <PickerField>
            <Picker
              selectedValue={selectedDisease}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedDisease(itemValue)
              }
            >
              <Picker.Item
                label="Covid-19"
                value="covid-19"
                color={theme.colors.text}
              />
            </Picker>
          </PickerField>

          <FinishButton onPress={handleConfirmDiagnostic}>
            <FinishButtonText>Confirmar</FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </Container>
  );
}
