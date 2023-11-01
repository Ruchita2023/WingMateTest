import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { AlertButton, Platform } from 'react-native';
import { InferType } from 'yup';

import { Alert } from '@components/Alert';
import { AuthStackScreenProps } from '@navigation/auth/auth-stack';
import { passwordResetSchema } from '@schemas/passwordResetSchema';
import { PasswordReset } from '@screens/Auth/PasswordReset';
import { getApiConfig } from '@utils/getApiConfig';

const apiConfig = getApiConfig();

export type PasswordResetFormValues = InferType<typeof passwordResetSchema>;

export const PasswordResetForm = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { params } =
    useRoute<AuthStackScreenProps<'password-reset'>['route']>();
  const { reset_password_token: token } = params || {};

  const navigateToLogIn = async () => {
    if (Platform.OS === 'web') {
      navigation.navigate('onboarding');
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'onboarding' }],
      });
    }
  };

  if (!token) {
    navigateToLogIn();
    return null;
  }

  const initialValues: PasswordResetFormValues = {
    token,
    password: '',
    confirmPassword: '',
  };

  const resetPassword = async (values: PasswordResetFormValues) => {
    const { token, password, confirmPassword: password_confirmation } = values;
    const resetEndpoint = `${apiConfig.apiUrl}/api/v1/reset_password.json`;

    await fetch(resetEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          token,
          password,
          password_confirmation,
        },
      }),
    })
      .then((response) => response.json())
      .then(() => resetPasswordAlert())
      .catch(() => resetPasswordErrorAlert());
  };

  const resetPasswordAlert = () => {
    const title = t('shared:resetPassword');
    const message = t('models:resetPassword.success.message');
    const okayButton: AlertButton = {
      text: t('shared:okay'),
      onPress: navigateToLogIn,
    };
    Alert.alert(title, message, [okayButton]);
  };

  const resetPasswordErrorAlert = () => {
    const title = t('shared:error');
    const message = t('models:resetPassword.error.message');
    const okayButton: AlertButton = {
      text: t('shared:okay'),
      style: 'cancel',
      onPress: navigateToLogIn,
    };
    Alert.alert(title, message, [okayButton]);
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnMount
      onSubmit={(values) => resetPassword(values)}
      validationSchema={passwordResetSchema}>
      <PasswordReset />
    </Formik>
  );
};
