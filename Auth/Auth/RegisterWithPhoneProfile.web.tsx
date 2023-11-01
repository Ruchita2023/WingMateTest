import { useNavigation } from '@react-navigation/native';
import { Field, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Box, Text } from '@components/Restyle';
import ActivityIndicatorLoading from '@components/shared/ActivityIndicatorLoading';
import Button from '@components/shared/Button/Button';
import Icon from '@components/shared/Icon/Icon';
import TextField from '@components/shared/TextField/TextField';
import { useGoogleAuth } from '@hooks/useGoogleAuth';
import theme from '@themes/theme';

import { RegisterFormValues } from './RegisterForm';

const RegisterWithPhoneProfileWeb: React.FC = () => {
  const [showEmailMessage, setShowEmailMessage] = useState(false);

  const { submitForm, setFieldValue, isSubmitting, isValid } =
    useFormikContext<RegisterFormValues>();
  const { userInfo } = useGoogleAuth();
  const { t: tModels } = useTranslation('models');
  const { t } = useTranslation('shared');
  const navigation = useNavigation();

  useEffect(() => {
    setFieldValue('step', 3);
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      setFieldValue('step', 2);
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
      <Box marginHorizontal='m' style={{ marginStart: 198, width: 560 }}>
        <KeyboardAwareScrollView
          style={{
            paddingHorizontal: theme.spacing.m,
            paddingTop: 36,
          }}
          extraScrollHeight={Platform.OS === 'ios' ? 120 : -80}
          enableAutomaticScroll
          enableOnAndroid>
          <Text variant='heading1' style={{ marginBottom: 54 }}>
            {tModels('contacts.tabs.profile')}
          </Text>
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
              editable: userInfo?.email,
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
          <Box marginTop='xxl' style={{ marginBottom: 100 }}>
            <Button
              variant='primary'
              onPress={submitForm}
              disabled={isSubmitting || !isValid}
              accessibilityLabel={t('continue')}>
              {isSubmitting ? (
                <ActivityIndicatorLoading marginTop={-10} />
              ) : (
                <Text color='white'>{t('continue')}</Text>
              )}
            </Button>
          </Box>
        </KeyboardAwareScrollView>
      </Box>
    </Box>
  );
};

export default RegisterWithPhoneProfileWeb;
