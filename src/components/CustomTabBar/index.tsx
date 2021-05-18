import React, { useCallback, useState } from "react";

import styled from "styled-components/native";
import MapIcon from "../../assets/images/pin.svg";
import NotificateIcon from "../../assets/images/my_location.svg";
import SafeIcon from "../../assets/images/safe.svg";
import Modal from '../Modal'

import theme from "../../constants/theme";

const TabArea = styled.View`
  height: 60px;
  background-color: #07d3c9;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 35px;
  border: 3px solid ${theme.colors.brain};
  margin-top: -20px;
`;

type State = {
  index: number;
};

type Navigation = {
  navigate: (el: string) => void;
};

interface IProps {
  state: State;
  navigation: Navigation;
}

export default ({ state, navigation }: IProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const goTo = (screeName: string) => {
    navigation.navigate(screeName);
  };

  const handleChangeModalState = useCallback((value) => {
    setShowModal(value)
  }, []);

  const checkSeletedScreen = (index: number) => {
    if (state.index === index) {
      return 0.8;
    }
    return 1;
  };

  return (
    <>
    <TabArea>
      <TabItem onPress={() => goTo("Home")}>
        <MapIcon
          width="24"
          height="24"
          fill={theme.colors.primary}
          style={{ opacity: checkSeletedScreen(0) }}
        />
      </TabItem>
      <TabItemCenter onPress={() => setShowModal(true)}>
        <NotificateIcon width="32" height="32" fill={theme.colors.brain} />
      </TabItemCenter>
      <TabItem onPress={() => goTo("BeSafe")}>
        <SafeIcon
          width="24"
          height="24"
          fill={theme.colors.primary}
          style={{ opacity: checkSeletedScreen(1) }}
        />
      </TabItem>
    </TabArea>
    <Modal modalState={showModal} changeModal={handleChangeModalState}/>
    </>
  );
};
