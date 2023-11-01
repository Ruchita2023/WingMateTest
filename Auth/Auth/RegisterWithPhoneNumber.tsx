import fetch from 'cross-fetch';
import { Field, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, Text } from '@components/Restyle';
import ActivityIndicatorLoading from '@components/shared/ActivityIndicatorLoading';
import Button from '@components/shared/Button/Button';
import PhoneField from '@components/shared/PhoneField/PhoneField';
import { RegisterStackScreenProps } from '@navigation/auth/register-stack';
import { RegisterWithPhoneNumberFormValues } from '@screens/Auth/RegisterWithPhoneNumberForm';
import theme from '@themes/theme';
import { getApiConfig } from '@utils/getApiConfig';

const apiConfig = getApiConfig();

const RegisterWithPhoneNumber: React.FC<
  RegisterStackScreenProps<'register-with-phone-number'>
> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const inputHeight = 56 + insets.bottom;
  const { values, errors, touched, setTouched, setErrors } =
    useFormikContext<RegisterWithPhoneNumberFormValues>();
  const { t } = useTranslation('shared');
  const [loading, setLoading] = useState<boolean>(false);

  const verifyPhoneNumber = async () => {
    setLoading(true);
    const verifyPhoneNumberURL = `/api/v2/phone_number_available.json`;
    const userPayload = {
      phone_number: values.phone,
    };

    const authEndpoint = `${apiConfig.apiUrl}${verifyPhoneNumberURL}`;

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
        setLoading(false);
        if (response?.error) {
          setErrors({
            phone: response?.error,
          });
        } else {
          if (response.success) {
            await sendVerificationCode();
          } else {
            Alert.alert('Phone number available method error.');
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const sendVerificationCode = async () => {
    setLoading(true);
    const sendVerificationCodeURL = `/api/v2/send_verification_code.json`;
    const userPayload = {
      phone_number: values.phone,
    };

    const authEndpoint = `${apiConfig.apiUrl}${sendVerificationCodeURL}`;

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
        setLoading(false);
        if (response?.error) {
          Alert.alert('Send verify code Method', response?.error);
        } else {
          if (response.success) {
            navigation.navigate('register-verify-code', {
              isRegiserWithPhoneNumber: true,
            });
          } else {
            Alert.alert('Send verify code Method failed.');
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <Box flex={1}>
      <Box flex={1} marginHorizontal='m' style={{ marginTop: 40 }}>
        <Text
          variant='labelLarge'
          marginBottom='s'
          style={{ color: theme.colors.textSecondary }}>
          {t('pleaseEnterYourPhoneNumber')}
        </Text>
        <Field
          isLarge
          component={PhoneField}
          name='phone'
          accessibilityLabel={t('phoneNumber')}
          phoneIn
          value={values.phone}
        />
        <Text
          style={{ marginTop: -theme.spacing.m }}
          variant='metadata'
          color={errors.phone ? 'grey03' : 'textSecondary'}>
          {t('youWillReceiveA4DigitCode')}
        </Text>
      </Box>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.select({
          ios: inputHeight,
          android: 500,
        })}>
        <Box marginBottom='l' marginHorizontal='m'>
          <Text variant='typoMetadata' marginBottom='xs' color='textPrimary'>
            {t('termsAndConditions')}
          </Text>
          <Button
            variant='primary'
            disabled={loading || (touched.phone && !!errors.phone)}
            onPress={() => {
              setTouched({ ...touched, phone: true });
              if (!errors.phone) {
                verifyPhoneNumber();
              }
            }}
            accessibilityLabel={t('continue')}>
            {loading ? (
              <ActivityIndicatorLoading />
            ) : (
              <Text color='white'>{t('continue')}</Text>
            )}
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default RegisterWithPhoneNumber;
