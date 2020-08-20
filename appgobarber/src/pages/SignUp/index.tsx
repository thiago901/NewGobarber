import React, { useRef, useCallback } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import getValidationErrors from '../../util/getValidationError';

import Button from '../../components/Button';
import Input from '../../components/Input';
import logoImg from '../../assets/logo.png';

import { Container, Title, BackToLogin, BackToLoginText } from './styles';

interface FormDataSignup {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const inputEmailRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async (data: FormDataSignup) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string()
          .email('Digite um e-mail valido')
          .required('Email obrigatorio'),
        password: Yup.string().min(6, 'Minimo de 6 caracteres'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      await api.post('/users', data);
      Alert.alert(
        'Cadastro Realizado',
        'Você já pode fazer logon no GoBarber!',
      );
      navigation.goBack();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const err = getValidationErrors(error);
        formRef.current?.setErrors(err);
        return;
      }
      // dispara toast
      Alert.alert(
        'Erro no Cadastro',
        'Erro ao realizar o cadastro, tente novamente',
      );
    }
  }, []);
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
              <Title>Crie sua conta</Title>
            </View>
            <Form onSubmit={handleSubmit} ref={formRef}>
              <Input
                autoCapitalize="words"
                returnKeyType="next"
                name="name"
                icon="user"
                placeholder="Nome"
                onSubmitEditing={() => inputEmailRef.current?.focus()}
              />
              <Input
                ref={inputEmailRef}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                name="email"
                icon="mail"
                placeholder="Email"
                onSubmitEditing={() => inputPasswordRef.current?.focus()}
              />
              <Input
                ref={inputPasswordRef}
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="Senha"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>
            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToLogin onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#f4ede8" />
        <BackToLoginText>Voltar para logon</BackToLoginText>
      </BackToLogin>
    </>
  );
};

export default SignUp;
