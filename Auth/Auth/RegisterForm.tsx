import { useNavigation } from '@react-navigation/native';
import fetch from 'cross-fetch';
import { Formik } from 'formik';
import moment from 'moment-timezone';
import React from 'react';
import { Platform } from 'react-native';
import { InferType } from 'yup';

import { useGoogleAuth } from '@hooks/useGoogleAuth';
import RegisterStack from '@navigation/auth/register-stack';
import registerSchema from '@schemas/registerSchema';
import registerSocialSchema from '@schemas/registerSocialSchema';
import { logEvent } from '@utils/eventLogger';
import { getApiConfig } from '@utils/getApiConfig';
import { AsyncStorage as AsyncSecureStorage } from '@utils/storage';

import timezones from './timezones.json';
import { useAuthContext } from '../../context/authContext';

export type RegisterFormValues = InferType<typeof registerSchema>;

const apiConfig = getApiConfig();
const RegisterForm = () => {
  const { setAuthToken } = useAuthContext();
  const { userInfo } = useGoogleAuth();
  const navigation = useNavigation();

  let invitation_token = '';
  if (Platform.OS === 'web') {
    const queryParameters = new URLSearchParams(window.location.search);
    invitation_token = queryParameters.get('invitation_token') ?? '';
    if (invitation_token == null) {
      invitation_token =
        window.sessionStorage.getItem('invitation_token') ?? '';
    } else {
      window.sessionStorage.setItem('invitation_token', invitation_token!);
    }
  }
  const timeZoneName = (name: string) => {
    for (let i = 0; i < timezones.length; i++) {
      if (timezones[i].utc.includes(name)) {
        return timezones[i].text;
      }
    }
    const timezoneName = moment.tz(name).format('Z');
    const timeZoneFormat = `(UTC${timezoneName}) ${name}`;
    return timeZoneFormat;
  };
  const initialValues: RegisterFormValues = {
    email: userInfo?.email || '',
    password: '',
    first_name: userInfo?.given_name || '',
    last_name: userInfo?.family_name || '',
    phone: '',
    invitation_token: invitation_token,
    provider: userInfo?.provider,
    uid: userInfo?.id,
    time_zone: timeZoneName(moment.tz.guess()),
    auth_token: '',
  };

  const register = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    invitation_token: string,
    setErrors: any,
    provider: string,
    uid: string,
    time_zone: string,
    auth_token: string,
    setFieldValue: any
  ) => {
    if (auth_token !== '') {
      await AsyncSecureStorage.setItem('authToken', auth_token);
      if (Platform.OS !== 'web') {
        logEvent({ name: 'login', params: { email } });
      }
      setAuthToken(auth_token);
    } else {
      const register = `/api/v1/users.json`;
      const getTimeZoneName = time_zone.split(')');
      const registerPayload = {
        user: {
          email: email,
          password: password,
          terms_of_service: true,
          name: [first_name, last_name].filter((item) => item !== '').join(' '),
          phone_number: phone_number,
          invitation_token: invitation_token,
          provider: provider,
          uid: uid,
          time_zone: getTimeZoneName[1].trim(),
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
          if (response?.error) {
            alert(response?.error);
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
      onSubmit={(values, { setErrors, setFieldValue }) => {
        register(
          values.email,
          values.password,
          values.first_name,
          values.last_name,
          values.phone,
          values.invitation_token ?? '',
          setErrors,
          values.provider,
          values.uid,
          values.time_zone,
          values.auth_token,
          setFieldValue
        );
      }}
      validationSchema={userInfo ? registerSocialSchema : registerSchema}>
      {() => <RegisterStack />}
    </Formik>
  );
};

export default RegisterForm;
