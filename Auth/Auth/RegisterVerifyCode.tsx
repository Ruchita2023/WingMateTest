import { useRoute } from '@react-navigation/native';
import fetch from 'cross-fetch';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';

import { Box, Text } from '@components/Restyle';
import { RegisterStackScreenProps } from '@navigation/auth/register-stack';
import { RegisterWithPhoneNumberFormValues } from '@screens/Auth/RegisterWithPhoneNumberForm';
import VerificationCodeInput from '@screens/Auth/VerificationCodeInput';
import theme from '@themes/theme';
import { getApiConfig } from '@utils/getApiConfig';

import { RegisterFormValues } from './RegisterForm';

const apiConfig = getApiConfig();

const RegisterVerifyCode: React.FC<
  RegisterStackScreenProps<'register-verify-code'>
> = ({ navigation }) => {
  const route = useRoute();
  const { submitForm, values, isSubmitting, setFieldValue } = useFormikContext<
    RegisterFormValues | RegisterWithPhoneNumberFormValues
  >();
  const { t } = useTranslation('shared');
  const [countdown, setCountdown] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const startCountdown = () => {
    setCountdown(30);
    setIsActive(true);
  };

  const stopCountdown = () => {
    setIsActive(false);
  };

  const formatPhoneNumber = (xphoneNumber: string) => {
    const phoneNumber = xphoneNumber.replace(/\D/g, '');
    if (phoneNumber.startsWith('1')) {
      return phoneNumber.length == 11
        ? '(' +
            phoneNumber.substring(1, 4) +
            ')' +
            phoneNumber.substring(4, 7) +
            '-' +
            phoneNumber.substring(7)
        : '(' +
            phoneNumber.substring(0, 3) +
            ')' +
            phoneNumber.substring(3, 6) +
            '-' +
            phoneNumber.substring(6);
    } else {
      return phoneNumber;
    }
  };

  const verifyVerificationCode = async (code: string) => {
    setLoading(true);
    const verifyVerificationCodeURL = `/api/v2/verify_verification_code.json`;
    const userPayload = {
      phone_number: values.phone,
      verification_code: code,
    };
    const authEndpoint = `${apiConfig.apiUrl}${verifyVerificationCodeURL}`;

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
          Alert.alert('Verify Code Method', response?.error);
          setFieldValue('verify_code', '');
        } else {
          if (response.success) {
            stopCountdown();
            if (route.params.isRegiserWithPhoneNumber) {
              navigation.navigate('register-with-phone-number-create-profile');
            } else {
              submitForm();
            }
          } else {
            setFieldValue('verify_code', '');
            Alert.alert('Verify Code Method failed.');
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const sendVerificationCode = async () => {
    setFieldValue('verify_code', '');
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
            startCountdown();
          } else {
            Alert.alert('Send verify code Method failed.');
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  useEffect(() => {
    let _timer: NodeJS.Timer;

    if (isActive && countdown > 0) {
      _timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsActive(false);
    }

    return () => clearInterval(_timer);
  }, [isActive, countdown]);

  return (
    <Box marginHorizontal='m' style={{ marginTop: 40 }}>
      {(loading || isSubmitting) && (
        <Box marginBottom='s'>
          <ActivityIndicator />
        </Box>
      )}

      <Text
        variant='labelLarge'
        marginBottom='l'
        style={{ color: theme.colors.textSecondary }}>
        {t('enterThe4-digitCode', {
          phoneNumber: formatPhoneNumber(values.phone),
        })}
      </Text>
      <Box flex={1} marginTop='m' flexDirection='row'>
        <VerificationCodeInput
          inputSize={4}
          onTextChanged={(text) => {
            setFieldValue('verify_code', text);
            if (text.length == 4) {
              verifyVerificationCode(text);
            }
          }}></VerificationCodeInput>
      </Box>
      {countdown > 0 && isActive && (
        <Text variant='bodySecondary' marginTop='xl'>
          {t('resendCode', {
            time:
              (countdown.toString().length == 1 ? '00:0' : '00:') +
              countdown.toString(),
          })}
        </Text>
      )}
      {(countdown == 0 || !isActive) && (
        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            sendVerificationCode();
          }}>
          <Text variant='buttonLabel' marginTop='xl' color='greenSecondary'>
            {t('ResendCodeViaSMS')}
          </Text>
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default RegisterVerifyCode;
