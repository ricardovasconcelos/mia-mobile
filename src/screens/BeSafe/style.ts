import styled from "styled-components/native";
import theme from "../../constants/theme";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Wrapper = styled.ScrollView``;

export const Header = styled.View`
  height: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const DivisorField = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Divisor = styled.View`
  width: 88%;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 2px;
`;

export const LogoutButton = styled.TouchableOpacity``

export const UserName = styled.Text`
  font-size: 30px;
  font-family: "Lato-Bold";
  width: 80%;
  color: ${theme.colors.text};
`;

export const Title = styled.Text`
  font-size: 33px;
  color: ${theme.colors.brain};
  text-align: center;
  margin: 25px 10px 0px 10px;
  font-weight: bold;
  font-family: "Lato-Bold";
`;

export const SideField = styled.View`
  padding: 0 20px;
`;

export const DescriptionField = styled.View.attrs((props) => ({
  side: props.side,
}))`
  width: 100%;
  align-items: ${(props) => props.side};
`;

export const Description = styled.Text`
  width: 85%;
  font-size: 20px;
  color: ${theme.colors.brainDark};
  font-family: "Lato-Regular";
  margin: 30px 0;
  text-align: justify;
`;

export const ImageField = styled.View.attrs((props) => ({
  side: props.side,
}))`
  width: 95%;
  align-items: ${(props) => props.side};
`;
