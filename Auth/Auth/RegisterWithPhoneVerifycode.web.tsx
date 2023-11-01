import { useNavigation } from '@react-navigation/native';
import fetch from 'cross-fetch';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { ConfirmModal } from '@components/Modals/ConfirmModal';
import { Box, Text } from '@components/Restyle';
import Icon from '@components/shared/Icon/Icon';
import { RegisterStackScreenProps } from '@navigation/auth/register-stack';
import { RegisterFormValues } from '@screens/Auth/RegisterForm';
import { RegisterWithPhoneNumberFormValues } from '@screens/Auth/RegisterWithPhoneNumberForm';
import VerificationCodeInputWeb from '@screens/Auth/VerificationCodeInput.web';
import theme from '@themes/theme';
import { getApiConfig } from '@utils/getApiConfig';

const apiConfig = getApiConfig();
const RegisterWithPhoneVerifycode: React.FC<
  RegisterStackScreenProps<'register-verify-code'>
> = ({ route }) => {
  const navigation = useNavigation();
  const { t } = useTranslation('shared');

  const { values, setFieldValue, submitForm } = useFormikContext<
    RegisterWithPhoneNumberFormValues | RegisterFormValues
  >();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState('');

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
          setFieldValue('verify_code', '');
          setErrorMsg(response?.error);
        } else {
          if (response.success) {
            stopCountdown();
            if (route.params.isRegiserWithPhoneNumber) {
              navigation.navigate('register-with-phone-profile');
            } else {
              submitForm();
            }
          } else {
            setFieldValue('verify_code', '');
            setErrorMsg('Verify Code Method failed.');
          }
        }
      })
      .catch((err) => {
        setErrorMsg(err);
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
          setErrorMsg(response?.error);
        } else {
          if (response.success) {
            startCountdown();
          } else {
            setErrorMsg('Send verify code Method failed.');
          }
        }
      })
      .catch((err) => {
        setErrorMsg(err);
      });
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

  const [countdown, setCountdown] = useState(30);
  const [isActive, setIsActive] = useState(true);

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

  const startCountdown = () => {
    setIsActive(true);
  };

  const stopCountdown = () => {
    setIsActive(false);
  };

  useEffect(() => {
    setFieldValue('step', route.params.isRegiserWithPhoneNumber ? 2 : 3);
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      setFieldValue('step', route.params.isRegiserWithPhoneNumber ? 1 : 2);
    };
    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return (
    <Box flex={1} alignItems='flex-start' justifyContent='center'>
      <Box
        flex={1}
        style={{
          position: 'absolute',
          right: theme.spacing.l,
          top: theme.spacing.l,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Box flexDirection='row' alignItems='flex-end'>
            <Icon variant='l' name='X' marginRight='xs' />
            <Text variant='labelEmphasized'>{t('cancel')}</Text>
          </Box>
        </TouchableOpacity>
      </Box>
      <Box
        marginHorizontal='m'
        style={{ marginStart: 198, width: 560, marginBottom: 100 }}>
        {loading && <ActivityIndicator />}
        <Text variant='heading1' style={{ marginBottom: 54 }}>
          {t('verify')}
        </Text>
        <Text
          variant='labelAssignedTask'
          marginBottom='s'
          style={{ color: theme.colors.textSecondary }}>
          {t('enterThe4-digitCode', {
            phoneNumber: formatPhoneNumber(values.phone),
          })}
        </Text>
        <Box flex={1} flexDirection='row' style={{ marginBottom: 22 }}>
          <VerificationCodeInputWeb
            inputSize={4}
            onTextChanged={(text) => {
              setFieldValue('verify_code', text);
              if (text.length == 4) {
                verifyVerificationCode(text);
              }
            }}></VerificationCodeInputWeb>
        </Box>

        {countdown > 0 && isActive && (
          <Text variant='bodySecondary' marginBottom='s'>
            {t('resendCode', {
              time:
                (countdown.toString().length == 1 ? '00:0' : '00:') +
                countdown.toString(),
            })}
          </Text>
        )}
        {(countdown == 0 || !isActive) && (
          <TouchableOpacity
            onPress={() => {
              sendVerificationCode();
            }}>
            <Text variant='buttonLabel' marginBottom='s' color='greenSecondary'>
              {t('ResendCodeViaSMS')}
            </Text>
          </TouchableOpacity>
        )}
      </Box>
      <ConfirmModal
        showModal={errorMsg !== ''}
        isAlert={true}
        onPress={() => {
          setErrorMsg('');
        }}
        buttonText='OK'
        title={t('models:onBoarding.modal.signUpWithPhoneNumber')}
        message={errorMsg}
      />
    </Box>
  );
};

export default RegisterWithPhoneVerifycode;
