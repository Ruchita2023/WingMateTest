import { Field, useFormikContext } from 'formik';
import { RegisterStackScreenProps } from 'navigation/auth/register-stack';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RegisterFormValues } from './RegisterForm';
import { Box } from '../../components/Restyle';
import Button from '../../components/shared/Button/Button';
import Icon from '../../components/shared/Icon/Icon';
import TextField from '../../components/shared/TextField/TextField';

const RegisterWithEmail: React.FC<
  RegisterStackScreenProps<'register-with-email'>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const inputHeight = 56 + insets.bottom;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { errors, touched, isValid, setTouched } =
    useFormikContext<RegisterFormValues>();

  return (
    <Box flex={1}>
      <Box flex={1} marginHorizontal='m' style={{ marginTop: 36 }}>
        <Field
          component={TextField}
          label='Please enter your email'
          name='email'
          isLarge
          textInputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
            keyboardType: 'email-address',
          }}
          accessibilityLabel='Please enter your email'
          validateOnChange={false}
        />
        <Field
          component={TextField}
          label='Password'
          name='password'
          isLarge
          suffix={
            <Icon
              name={showPassword ? 'Eye' : 'EyeOff'}
              variant='l'
              color='textPrimary'
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          textInputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
            secureTextEntry: !showPassword,
          }}
          accessibilityLabel='Password'
          validateOnChange={false}
        />
      </Box>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.select({
          ios: inputHeight,
          android: 500,
        })}>
        <Box marginBottom='l' marginHorizontal='m'>
          <Button
            variant='primary'
            onPress={() => {
              setTouched({ ...touched, email: true, password: true });
              if (
                !(
                  (!!errors.email && !isValid) ||
                  (!!errors.password && !isValid)
                )
              ) {
                navigation.navigate('create-profile');
              }
            }}
            accessibilityLabel='Continue'>
            Continue
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default RegisterWithEmail;
