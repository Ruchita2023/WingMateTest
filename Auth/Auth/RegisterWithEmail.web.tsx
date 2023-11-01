import { useNavigation } from '@react-navigation/native';
import { Field, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, Text } from '@components/Restyle';
import Button from '@components/shared/Button/Button';
import Icon from '@components/shared/Icon/Icon';
import TextField from '@components/shared/TextField/TextField';
import { RegisterFormValues } from '@screens/Auth/RegisterForm';

const RegisterWithEmail: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const _inputHeight = 56 + insets.bottom;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { t } = useTranslation('shared');
  const { t: f } = useTranslation('forms');

  const { errors, touched, isValid } = useFormikContext<RegisterFormValues>();

  return (
    <Box flex={1} alignItems='flex-start' justifyContent='center'>
      <Box marginHorizontal='m' style={{ marginStart: 198, width: 560 }}>
        <Text variant='heading1' style={{ marginBottom: 54 }}>
          {t('email')}
        </Text>
        <Field
          component={TextField}
          label={t('pleaseEnterYourEmail')}
          name='email'
          isLarge
          textInputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
            keyboardType: 'email-address',
          }}
          validateOnChange={false}
        />
        <Field
          component={TextField}
          label={t('pleaseEnterYourPassword')}
          name='password'
          isLarge
          suffix={
            <Icon
              name='EyeOff'
              variant='l'
              color='textPrimary'
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          textInputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
            secureTextEntry: !showPassword,
          }}
          validateOnChange={false}
        />
        <Text variant='metadata' marginBottom='s'>
          {t('termsAndConditions')}
        </Text>
        <Button
          variant='primary'
          onPress={() =>
            navigation.navigate('create-profile', { socialSignUp: true })
          }
          disabled={
            (touched.email && !!errors.email) ||
            (!!errors.email && !isValid) ||
            (touched.password && !!errors.password) ||
            (!!errors.password && !isValid)
          }>
          {f('continue')}
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterWithEmail;
