import styled from 'styled-components/native';
import theme from '../../constants/theme'

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.tertiary};
`;

export const InputArea = styled.View`
  width: 100%;
  padding: 40px;
`;

export const InputText = styled.View`
  width: 100%;
  height: 60px;
  background-color: 'rgba(255,99,149, 0.3)';
  flex-direction: row;
  border-radius: 6px;
  padding-left: 15px;
  align-items: center;
  margin-bottom: 15px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${theme.colors.text};
  margin-left: 10px;
`;

export const CustomButton = styled.TouchableOpacity`
  height: 60px;
  background-color: ${theme.colors.brain};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;
export const CustomButtonText = styled.Text`
  font-size: 18px;
  color: ${theme.colors.primary};
  font-weight: bold;
`;

export const SignMessageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
`;
export const SignMessageButtonText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.brain};
`;
export const SignMessageButtonTextBold = styled.Text`
  font-size: 16px;
  color: ${theme.colors.brain};
  font-weight: bold;
  margin-left: 5px;
`;
