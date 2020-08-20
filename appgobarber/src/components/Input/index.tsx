import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, InputText, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { icon, name, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocus, setIsFocus] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleIsFocus = useCallback(() => {
    setIsFocus(true);
  }, []);
  const handleIsFilled = useCallback(() => {
    setIsFocus(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ value: '' });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocus={isFocus} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocus || isFilled ? '#ff9000' : '#666360'}
      />
      <InputText
        ref={inputElementRef}
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleIsFocus}
        onBlur={handleIsFilled}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
