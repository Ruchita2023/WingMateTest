import { useNavigation } from '@react-navigation/native';
import fetch from 'cross-fetch';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { InferType } from 'yup';

import { ConfirmModal } from '@components/Modals/ConfirmModal';
import { useGoogleAuth } from '@hooks/useGoogleAuth';
import RegisterStack from '@navigation/auth/register-stack';
import registerWithPhoneNumberSchema from '@schemas/registerWithPhoneNumberSchema';
import { logEvent } from '@utils/eventLogger';
import { getApiConfig } from '@utils/getApiConfig';
import { AsyncStorage as AsyncSecureStorage } from '@utils/storage';

import { useAuthContext } from '../../context/authContext';

export type RegisterWithPhoneNumberFormValues = InferType<
  typeof registerWithPhoneNumberSchema
>;

const apiConfig = getApiConfig();

const RegisterWithPhoneNumberForm: React.FC = () => {
  const { setAuthToken } = useAuthContext();
  const { userInfo } = useGoogleAuth();
  const navigation = useNavigation();
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useTranslation('shared');

  const initialValues: RegisterWithPhoneNumberFormValues = {
    email: userInfo?.email || '',
    first_name: userInfo?.given_name || '',
    last_name: userInfo?.family_name || '',
    phone: '',
    auth_token: '',
    step: 1,
  };

  const register = async (
    auth_token: string,
    email: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    setErrors: any,
    setFieldValue: any,
    setSubmitting: any
  ) => {
    if (auth_token !== '') {
      await AsyncSecureStorage.setItem('authToken', auth_token);
      if (Platform.OS !== 'web') {
        logEvent({ name: 'login', params: { email } });
      }
      setAuthToken(auth_token);
    } else {
      const register = `/api/v2/users.json`;

      const registerPayload = {
        user: {
          email: email,
          terms_of_service: true,
          name: [first_name, last_name].filter((item) => item !== '').join(' '),
          phone_number: phone_number,
        },
      };

      const authEndpoint = `${apiConfig.apiUrl}${register}`;

      await fetch(authEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerPayload),
      })
        .then((response) => response.json())
        .then(async (response) => {
          setSubmitting(false);
          if (response?.error) {
            if (Platform.OS === 'web') {
              setErrorMsg(response.error);
            } else {
              alert(response.error);
            }

            const errType = Object.keys(response.errors)[0];
            switch (errType) {
              case 'email':
                setErrors({
                  email: response.error,
                });
                break;
              case 'password':
                setErrors({
                  password: response.error,
                });
                break;
              case 'phone_number':
                setErrors({
                  phone: response.error,
                });
                break;
              default:
                setErrors({
                  email: 'error creating account.',
                });
            }
          } else {
            try {
              if (Platform.OS === 'web') {
                window.sessionStorage.setItem('invitation_token', '');
              }
              await AsyncSecureStorage.setItem('alreadyInstall', 'true');
            } catch (e) {
              // saving error
              // console.log(e);
            } finally {
              setFieldValue('auth_token', response.user.api_tokens[0].token);
              Platform.OS === 'web'
                ? navigation.navigate('register-with-phone-invite')
                : navigation.navigate('register-with-email-success');
            }
          }
        })
        .catch((_err) => {
          setErrorMsg('network error');
          setErrors({
            email: 'network error',
          });
        });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnMount
      onSubmit={(values, { setErrors, setFieldValue, setSubmitting }) => {
        register(
          values.auth_token,
          values.email,
          values.first_name,
          values.last_name,
          values.phone,
          setErrors,
          setFieldValue,
          setSubmitting
        );
      }}
      validationSchema={registerWithPhoneNumberSchema}>
      {() => (
        <>
          <RegisterStack />
          {Platform.OS === 'web' && (
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
          )}
        </>
      )}
    </Formik>
  );
};

export default RegisterWithPhoneNumberForm;
