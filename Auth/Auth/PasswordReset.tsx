import { Field, useFormikContext } from 'formik';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, Text } from '@components/Restyle';
import Button from '@components/shared/Button/Button';
import Icon from '@components/shared/Icon/Icon';
import TextField from '@components/shared/TextField/TextField';
import { PasswordResetFormValues } from '@screens/Auth/PasswordResetForm';

export const PasswordReset = () => {
  const insets = useSafeAreaInsets();
  const inputHeight = 56 + insets.bottom;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { touched, isValid, setTouched, submitForm } =
    useFormikContext<PasswordResetFormValues>();

  const passwordResetContent = (
    <Box flex={1}>
      <Box flex={1} marginHorizontal='m' style={{ marginTop: 36 }}>
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

        <Field
          component={TextField}
          label='Confirm Password'
          name='confirmPassword'
          isLarge
          suffix={
            <Icon
              name={showConfirmPassword ? 'Eye' : 'EyeOff'}
              variant='l'
              color='textPrimary'
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
          textInputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
            secureTextEntry: !showConfirmPassword,
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
              setTouched({ ...touched, confirmPassword: true, password: true });
              if (isValid) {
                submitForm();
              }
            }}
            accessibilityLabel='Continue'>
            Reset Password
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );

  if (Platform.OS === 'web') {
    return (
      <Box
        flex={1}
        backgroundColor='grey03'
        justifyContent='center'
        alignItems='center'>
        <Box
          flex={1}
          borderRadius='m'
          style={{
            position: 'absolute',
            height: 520,
            width: 533,
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
          alignItems='center'>
          <Box alignItems='center' marginTop='xl'>
            <Icon name='Logo' width={142} height={43} color='textPrimary' />
          </Box>

          <Box flex={1} width={343}>
            <Text mt='xl' textAlign='center' variant='heading2'>
              Change your Password
            </Text>
            {passwordResetContent}
          </Box>
        </Box>
      </Box>
    );
  } else {
    return passwordResetContent;
  }
};
