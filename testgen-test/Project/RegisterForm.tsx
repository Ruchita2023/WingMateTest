import AsyncStorage from '@react-native-async-storage/async-storage';
import fetch from 'cross-fetch';
import { Formik } from 'formik';
import React from 'react';
import { Platform } from 'react-native';
import { InferType } from 'yup';

import registerSchema from '@schemas/registerSchema';

import { useAuthContext } from '../../context/authContext';
import RegisterStack from '../../navigation/auth/register-stack';
import { getApiConfig } from '../../utils/getApiConfig';
import { AsyncStorage as AsyncSecureStorage } from '../../utils/storage';

export type RegisterFormValues = InferType<typeof registerSchema>;

const apiConfig = getApiConfig();

const RegisterForm = () => {
  const { setAuthToken } = useAuthContext();

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

  const initialValues: RegisterFormValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    invitation_token: invitation_token,
  };

  const register = async (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    invitation_token: string,
    setErrors: any
  ) => {
    const register = `/api/v1/users.json`;

    const registerPayload = {
      user: {
        email: email,
        password: password,
        terms_of_service: true,
        name: [first_name, last_name].filter((item) => item !== '').join(' '),
        phone_number: phone_number,
        invitation_token: invitation_token,
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
            await AsyncStorage.setItem('alreadyInstall', 'true');
            await AsyncSecureStorage.setItem(
              'authToken',
              response.user.api_tokens[0].token
            );
          } catch (e) {
            // saving error
            // console.log(e);
          } finally {
            setAuthToken(response.user.api_tokens[0].token);
          }
        }
      })
      .catch((_err) => {
        setErrors({
          email: 'network error',
        });
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnMount
      onSubmit={(values, { setErrors }) =>
        register(
          values.email,
          values.password,
          values.first_name,
          values.last_name,
          values.phone,
          values.invitation_token ?? '',
          setErrors
        )
      }
      validationSchema={registerSchema}>
      {() => <RegisterStack />}
    </Formik>
  );
};

export default RegisterForm;
