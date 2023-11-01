import { Field, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  AlertButton,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Alert } from '@components/Alert';
import { Box, Text } from '@components/Restyle';
import Button from '@components/shared/Button/Button';
import Icon from '@components/shared/Icon/Icon';
import TextField from '@components/shared/TextField/TextField';
import { AuthFormValues } from '@navigation/auth/log-in-stack';
import { getApiConfig } from '@utils/getApiConfig';

const apiConfig = getApiConfig();

const ContinueWithEmailPassword: React.FC = () => {
  const { submitForm, values } = useFormikContext<AuthFormValues>();
  const insets = useSafeAreaInsets();
  const inputHeight = 56 + insets.bottom; // height of chatForm + insets bottom for iOS extra keyboard bar
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [resetLoadingState, setResetLoadingState] = useState<boolean>(false);

  const resetPassword = async () => {
    const resetEndpoint = `${apiConfig.apiUrl}/api/v1/password.json`;

    setResetLoadingState(true);

    await fetch(resetEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: values.email,
        },
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log('err ---->', err))
      .finally(() => setResetLoadingState(false));

    resetLinkSentAlert();
  };

  const resetLinkSentAlert = () => {
    const title = t('shared:resetPassword');
    const message = t('models:resetPassword.message');
    const okayButton: AlertButton = {
      text: t('shared:okay'),
      style: 'cancel',
    };
    Alert.alert(title, message, [okayButton]);
  };

  const passwordRef = useRef();

  useEffect(() => {
    passwordRef.current?.focus();
  }, [passwordRef.current]);

  return (
    <Box flex={1}>
      <Box flex={1} marginHorizontal='m' style={{ marginTop: 36 }}>
        <Field
          component={TextField}
          label={t('shared:password')}
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
            ref: passwordRef,
            secureTextEntry: !showPassword,
            onSubmitEditing: submitForm,
          }}
          accessibilityLabel={t('shared:password')}
        />
        {Platform.OS !== 'web' && (
          <Box
            flexDirection='row'
            alignItems='center'
            justifyContent='flex-start'>
            <TouchableOpacity
              onPress={resetPassword}
              disabled={resetLoadingState}
              accessibilityLabel={t('shared:forgotPassword')}>
              <Text variant='bodySecondary' color='greenSecondary'>
                {t('shared:forgotPassword')}
              </Text>
            </TouchableOpacity>
            {resetLoadingState && (
              <Box marginLeft='s'>
                <ActivityIndicator />
              </Box>
            )}
          </Box>
        )}
      </Box>
      {Platform.OS === 'web' && (
        <Box
          flex={1}
          flexDirection='row'
          marginTop='l'
          marginStart='l'
          alignItems='center'
          justifyContent='flex-start'>
          <TouchableOpacity
            onPress={resetPassword}
            disabled={resetLoadingState}
            accessibilityLabel={t('shared:forgotPassword')}>
            <Text variant='bodySecondary' color='greenSecondary'>
              {t('shared:forgotPassword')}
            </Text>
          </TouchableOpacity>
          {resetLoadingState && (
            <Box marginLeft='s'>
              <ActivityIndicator />
            </Box>
          )}
        </Box>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.select({
          ios: inputHeight,
          android: 500,
        })}>
        <Box marginBottom='l' marginHorizontal='m'>
          <Button
            variant='primary'
            onPress={submitForm}
            accessibilityLabel={t('shared:continue')}>
            {t('shared:continue')}
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default ContinueWithEmailPassword;
