import { useNavigation } from '@react-navigation/native';
import { Field, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert,KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ConfirmModal } from '@components/Modals/ConfirmModal';
import { Box } from '@components/Restyle';
import Button from '@components/shared/Button/Button';
import TextField from '@components/shared/TextField/TextField';
import { AuthFormValues } from '@navigation/auth/log-in-stack';
import { getApiConfig } from '@utils/getApiConfig';

const apiConfig = getApiConfig();
const ContinueWithEmail: React.FC = () => {
  const { errors, setErrors, touched, values, isValid, setTouched } =
    useFormikContext<AuthFormValues>();
  const { t } = useTranslation();
  const { t: m } = useTranslation('models');
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const inputHeight = 56 + insets.bottom;
  const emailRef = useRef();
  const [showProviderModal,setShowProviderModal] = useState(false);
  const [errorName,setErrorName] = useState('');

  useEffect(() => {
    emailRef.current?.focus();
  }, [emailRef.current]);

  const checkEmail = () => {
    setTouched({ ...touched, email: true });
    !errors.email && verifyUserEmail(values.email);
  };

  const verifyUserEmail = async (email: string) => {
    const verifyUser = `/api/v1/verify_user.json`;
    const userPayload = {
      user: {
        email: email,
        is_verified: true,
      },
    };

    const authEndpoint = `${apiConfig.apiUrl}${verifyUser}`;

    await fetch(authEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userPayload),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.success) {
          if (!(!!errors.email && !isValid)) {
            navigation.navigate('continue-with-email-password');
          }
        } else if (response.auth_provider) {
          if(Platform.OS === 'web'){
          setShowProviderModal(true);
          setErrorName(response.error);
          }
          Alert.alert(
            m('onBoarding.error.title'),
            response?.error,
            [
              {
                text: m('onBoarding.error.errorMsg', {
                  provider: response.auth_provider,
                }),
                onPress: () => loginPress(),
              },
              {
                text: 'Dismiss',
                onPress: () => {},
              },
            ],
            {
              cancelable: true,
            }
          );
        } else if (response.error) {
          setErrors({ email: response?.error });
        }
      })
      .catch((_err) => {
       // console.log('err', err);
      });
  };

  const loginPress = () => {
    navigation.pop();
    navigation.navigate('onboarding-modal', { isLogin: true });
  };

  return (
    <Box flex={1}>
      <Box flex={1} marginHorizontal='m' style={{ marginTop: 36 }}>
        <Field
          component={TextField}
          label={t('shared:pleaseEnterYourEmail')}
          name='email'
          isLarge
          textInputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
            ref: emailRef,
            keyboardType: 'email-address',
            onSubmitEditing: checkEmail,
          }}
          accessibilityLabel={t('shared:pleaseEnterYourEmail')}
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
            onPress={checkEmail}
            accessibilityLabel={t('shared:continue')}>
            {t('shared:continue')}
          </Button>
        </Box>
          {showProviderModal && (
            <ConfirmModal
              showModal={showProviderModal}
              onClose={() => setShowProviderModal(false)}
              onPress={() => loginPress()}
              buttonText={m('onBoarding.error.okPress')}
              title={m('onBoarding.error.title')}
              message={errorName}
              />
            )}
      </KeyboardAvoidingView>
    </Box>
  );
};

export default ContinueWithEmail;
