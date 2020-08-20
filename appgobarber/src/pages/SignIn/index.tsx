import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import getValidationErrors from '../../util/getValidationError';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';
import Input from '../../components/Input';
import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SignInData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const { signin } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const inputPasswordRef = useRef<TextInput>(null);
  const [load, setLoad] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail valido')
            .required('Email obrigatorio'),
          password: Yup.string().required('Senha obrigatoria'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        setLoad(true);
        await signin({ email: data.email, password: data.password });
        setLoad(false);

        // history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const err = getValidationErrors(error);
          formRef.current?.setErrors(err);
          return;
        }
        // dispara toast
        Alert.alert('Erro no Login', 'Erro ao realizar o login');
        setLoad(false);
      }
    },
    [signin],
  );
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="email"
                icon="mail"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => inputPasswordRef.current?.focus()}
              />
              <Input
                ref={inputPasswordRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              {load ? 'Loading...' : 'Entrar'}
            </Button>

            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma Conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
