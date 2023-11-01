import { useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import Box from '@components/Restyle/Box';
import { RegisterFormValues } from '@screens/Auth/RegisterForm';
import { RegisterWithPhoneNumberFormValues } from '@screens/Auth/RegisterWithPhoneNumberForm';

interface VerificationCodeInputProps {
  inputSize: number;
  onTextChanged: (text: string) => void;
}

const VerificationCodeInputWeb: React.FC<VerificationCodeInputProps> = ({
  inputSize,
  onTextChanged,
}) => {
  const [textString, setTextString] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const _inputRef = useRef<TextInput>();
  const [selectionStr, setSelectionStr] = useState({ start: 0, end: 0 });
  const { values } = useFormikContext<
    RegisterFormValues | RegisterWithPhoneNumberFormValues
  >();

  useEffect(() => {
    if (values.verify_code == '') {
      setTextString('');
      setActiveIndex(0);
    }
  }, [values.verify_code]);

  const renderText = () => {
    const inputs = [];
    for (let i = 0; i < inputSize; i++) {
      inputs.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            setTextInput(textString);
          }}>
          <Text
            key={i}
            style={[
              styles.text,
              textString.length === i ? styles.focusText : null,
            ]}>
            {textString[i]}
          </Text>
        </TouchableOpacity>
      );
    }

    return inputs;
  };

  const setTextInput = (text: string | undefined) => {
    const xtext = (text ?? textString).replace(/\D/g, '');

    setTextString(xtext);
    onTextChanged(xtext);
    setActiveIndex(xtext.length < 4 ? xtext.length : 3);
    _inputRef.current?.focus();
  };

  return (
    <Box style={[styles.viewBox]}>
      <Box
        style={{
          width: 400,
          height: 48,
        }}>
        <Box
          style={[
            styles.textBox,
            { flexDirection: 'row', justifyContent: 'center' },
          ]}>
          {renderText()}
        </Box>
        <TextInput
          ref={_inputRef}
          style={{
            width: 48,
            height: 48,
            fontSize: 25,
            borderWidth: 0,
            borderRadius: 8,
            borderColor: 'transparent',
            color: 'transparent',
            zIndex: 1000,
            position: 'absolute',
            left: activeIndex * 64,
            backgroundColor: 'transparent',
          }}
          onChangeText={(text) => {
            setTextInput(text);
          }}
          selection={selectionStr}
          onSelectionChange={() => {
            setSelectionStr({
              start: textString.length,
              end: textString.length,
            });
          }}
          onEndEditing={() => {}}
          onBlur={() => {
            _inputRef.current?.focus();
          }}
          underlineColorAndroid='transparent'
          maxLength={inputSize}
          autoFocus={true}
          keyboardType='numeric'
          selectionColor='black'
          value={textString}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  viewBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  textBox: {
    position: 'absolute',
  },
  text: {
    height: 48,
    width: 48,
    lineHeight: 48,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e8e8e8',
    color: 'black',
    fontSize: 25,
    marginRight: 16,
    textAlign: 'center',
  },
  focusText: {
    borderColor: 'black',
  },
  inputItem: {
    lineHeight: 20,
    width: 80,
    textAlign: 'center',
    height: 48,
  },
});
export default VerificationCodeInputWeb;
