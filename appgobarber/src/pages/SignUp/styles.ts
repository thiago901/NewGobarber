import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px ${Platform.OS === 'android' ? 180 : 40}px;
`;
export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 64px 0 24px;
`;

export const BackToLogin = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const BackToLoginText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  margin-left: 16px;
  color: #f4ede8;
`;
