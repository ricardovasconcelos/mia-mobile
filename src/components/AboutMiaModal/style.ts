import styled from "styled-components/native";
import theme from "../../constants/theme";

export const Container = styled.Modal``;

export const ModalBody = styled.SafeAreaView`
  background-color: ${theme.colors.primary};
  flex: 1;
`;

export const SwipeDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin: 3px;
`;

export const SwipeDotActive = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${theme.colors.brain};
  border-radius: 5px;
  margin: 3px;
`;

export const SlideContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;


export const Title = styled.Text`
  font-size: 27px;
  font-family: "Lato-Bold";
  margin: 60px 0px 20px;
  color: ${theme.colors.brain};
  padding: 0 20px;
  text-align: center;
  text-shadow: -1px 1px 10px rgba(0, 0, 0, 0.1);
`;

export const CustomButton = styled.TouchableOpacity`
  height: 60px;
  background-color: ${theme.colors.brain};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin-top: 20px;
`;
export const CustomButtonText = styled.Text`
  font-size: 18px;
  color: ${theme.colors.primary};
  font-weight: bold;
`;
