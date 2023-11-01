import { useNavigation } from '@react-navigation/native';
import fetch from 'cross-fetch';
import { Field, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

import { ConfirmModal } from '@components/Modals/ConfirmModal';
import ActivityIndicatorLoading from '@components/shared/ActivityIndicatorLoading';
import PhoneField from '@components/shared/PhoneField/PhoneField';
import { RegisterWithPhoneNumberFormValues } from '@screens/Auth/RegisterWithPhoneNumberForm';
import theme from '@themes/theme';
import { getApiConfig } from '@utils/getApiConfig';

import { Box, Text } from '../../components/Restyle';
import Button from '../../components/shared/Button/Button';
import Icon from '../../components/shared/Icon/Icon';

const apiConfig = getApiConfig();

const RegisterWithPhone: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation('shared');
  const { t: f } = useTranslation('forms');
  const [loading, setLoading] = useState<boolean>(false);

  const { errors, touched, values, setFieldValue, setErrors } =
    useFormikContext<RegisterWithPhoneNumberFormValues>();
  const [errorMsg, setErrorMsg] = useState('');

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
            setErrorMsg('Phone number available method error.');
          }
        }
      })
      .catch((err) => {
        setErrorMsg(err);
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
          setErrorMsg(response?.error);
        } else {
          if (response.success) {
            navigation.navigate('register-with-phone-verify-code', {
              isRegiserWithPhoneNumber: true,
            });
          } else {
            setErrorMsg('Send verify code method error.');
          }
        }
      })
      .catch((err) => {
        setErrorMsg(err);
      });
  };
  useEffect(() => {
    setFieldValue('step', 1);
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
      <Box marginHorizontal='m' style={{ marginStart: 198, width: 560 }}>
        <Text variant='heading1' style={{ marginBottom: 54 }}>
          {t('phoneNumber')}
        </Text>
        <Field
          component={PhoneField}
          label={t('pleaseEnterYourPhoneNumber')}
          name='phone'
          isLarge
          accessibilityLabel='Phone Number'
          phoneIn
          value={values.phone}
        />
        <Text variant='metadata' marginBottom='s'>
          {t('termsAndConditions')}
        </Text>
        <Box flex={1} style={{ marginBottom: 100 }}>
          <Button
            variant='primary'
            onPress={() => verifyPhoneNumber()}
            disabled={loading || (touched.phone && !!errors.phone)}>
            {loading ? (
              <ActivityIndicatorLoading marginTop={-10} />
            ) : (
              <Text color='white'>{f('continue')}</Text>
            )}
          </Button>
        </Box>
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

export default RegisterWithPhone;
