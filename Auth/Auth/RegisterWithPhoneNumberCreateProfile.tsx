import { Field, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, Text } from '@components/Restyle';
import ActivityIndicatorLoading from '@components/shared/ActivityIndicatorLoading';
import Button from '@components/shared/Button/Button';
import TextField from '@components/shared/TextField/TextField';
import { useGoogleAuth } from '@hooks/useGoogleAuth';
import { RegisterStackScreenProps } from '@navigation/auth/register-stack';
import { RegisterWithPhoneNumberFormValues } from '@screens/Auth/RegisterWithPhoneNumberForm';
import theme from '@themes/theme';

const RegisterWithPhoneNumberCreateProfile: React.FC<
  RegisterStackScreenProps<'register-with-phone-number-create-profile'>
> = () => {
  const insets = useSafeAreaInsets();
  const inputHeight = 56 + insets.bottom;
  const [showEmailMessage, setShowEmailMessage] = useState(false);

  const { submitForm, isSubmitting, isValid } =
    useFormikContext<RegisterWithPhoneNumberFormValues>();
  const { userInfo } = useGoogleAuth();
  const { t } = useTranslation('shared');

  return (
    <>
      <KeyboardAwareScrollView
        style={{
          paddingHorizontal: theme.spacing.m,
          paddingTop: 36,
        }}
        extraScrollHeight={Platform.OS === 'ios' ? 120 : -80}
        enableAutomaticScroll
        enableOnAndroid>
        <Field
          component={TextField}
          label={t('firstName')}
          name='first_name'
          isLarge
          textInputProps={{
            editable: !userInfo?.given_name,
            color: userInfo?.given_name
              ? theme.colors.grey04
              : theme.colors.black,
            autoCapitalize: 'words',
            autoCorrect: false,
          }}
          accessibilityLabel={t('firstName')}
        />
        <Field
          component={TextField}
          label={t('lastName')}
          name='last_name'
          isLarge
          textInputProps={{
            editable: !userInfo?.family_name,
            color: userInfo?.family_name
              ? theme.colors.grey04
              : theme.colors.black,
            autoCapitalize: 'words',
            autoCorrect: false,
          }}
          accessibilityLabel={t('lastName')}
        />
        <Field
          component={TextField}
          label={t('emailAddress')}
          name='email'
          marginBottom={showEmailMessage ? 'xs' : 'l'}
          textInputProps={{
            editable: !userInfo?.email,
            color: userInfo?.email ? theme.colors.grey04 : theme.colors.black,
            autoCapitalize: 'none',
            autoCorrect: false,
            keyboardType: 'email-address',
            onFocus: () => setShowEmailMessage(true),
            onBlur: () => setShowEmailMessage(false),
          }}
          accessibilityLabel={t('emailAddress')}
        />
        {showEmailMessage && (
          <Text variant='metadata' color='textSecondary' marginBottom='m'>
            {t('aVerificationEmailWillBeSentToThisEmailAddress')}
          </Text>
        )}
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.select({
          ios: inputHeight,
          android: 500,
        })}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <Box marginBottom='l' marginHorizontal='m'>
          <Button
            variant='primary'
            disabled={isSubmitting || !isValid}
            onPress={() => submitForm()}
            accessibilityLabel={t('continue')}>
            {isSubmitting ? (
              <ActivityIndicatorLoading />
            ) : (
              <Text color='white'>{t('continue')}</Text>
            )}
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterWithPhoneNumberCreateProfile;
