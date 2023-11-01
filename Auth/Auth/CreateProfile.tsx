import { Field, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TimeZoneModal } from '@components/Modals/TimeZoneModal';
import { Box, Text } from '@components/Restyle';
import Button from '@components/shared/Button/Button';
import Icon from '@components/shared/Icon/Icon';
import PhoneField from '@components/shared/PhoneField/PhoneField';
import TextField from '@components/shared/TextField/TextField';
import { useGoogleAuth } from '@hooks/useGoogleAuth';
import { RegisterStackScreenProps } from '@navigation/auth/register-stack';
import theme from '@themes/theme';
import { getApiConfig } from '@utils/getApiConfig';

import { RegisterFormValues } from './RegisterForm';
import timezones from './timezones.json';

const apiConfig = getApiConfig();

const CreateProfile: React.FC<RegisterStackScreenProps<'create-profile'>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const inputHeight = 56 + insets.bottom;
  const [showEmailMessage, setShowEmailMessage] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { setFieldValue, values, setErrors } =
    useFormikContext<RegisterFormValues>();

  const [loading, setLoading] = useState<boolean>(false);

  const { userInfo } = useGoogleAuth();
  const setTimeZone = (value: string) => {
    setFieldValue('time_zone', value.text);
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      setFieldValue('step', 2);
    }
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      setFieldValue('step', 1);
    };
    if (Platform.OS === 'web') {
      window.addEventListener('popstate', handleBackButton);
    }

    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener('popstate', handleBackButton);
      }
    };
  }, []);

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
            Alert.alert('Phone number available method error.');
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
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
          Alert.alert('Send verify code Method', response?.error);
        } else {
          if (response.success) {
            if (Platform.OS === 'web') {
              navigation.navigate('register-with-phone-verify-code', {
                isRegiserWithPhoneNumber: false,
              });
            } else {
              navigation.navigate('register-verify-code', {
                isRegiserWithPhoneNumber: false,
              });
            }
          } else {
            Alert.alert('Send verify code Method failed.');
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

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
        {loading && (
          <Box marginBottom='s'>
            <ActivityIndicator />
          </Box>
        )}
        <Field
          component={TextField}
          label='First Name'
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
          accessibilityLabel='First Name'
        />
        <Field
          component={TextField}
          label='Last Name'
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
          accessibilityLabel='Last Name'
        />
        <Field
          component={TextField}
          label='Email Address'
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
          accessibilityLabel='Email Address'
        />
        {showEmailMessage && (
          <Text variant='metadata' color='textSecondary' marginBottom='m'>
            A verification email will be sent to this email address.
          </Text>
        )}
        <Field
          component={PhoneField}
          label='Phone Number'
          name='phone'
          isLarge
          accessibilityLabel='Phone Number'
          phoneIn
          value={values.phone}
        />
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Box
            style={{
              borderWidth: 1,
              borderRadius: theme.spacing.xs,
              borderColor: theme.colors.grey02,
              backgroundColor: theme.colors.white,
              paddingHorizontal: theme.spacing.xs,
            }}
            width='100%'
            height={50}
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
            marginBottom='s'
            accessibilityLabel='Time Zone'>
            <Text
              name='time_zone'
              variant='labelSmall'
              style={{
                width: Platform.OS !== 'web' ? '95%' : '100%',
              }}>
              {values.time_zone}
            </Text>
            <Icon
              name='ChevronDown'
              color='textPrimary'
              variant='s'
              marginLeft='xxs'
              onPress={() => setModalOpen(true)}
            />
          </Box>
        </TouchableOpacity>
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
            disabled={loading}
            variant='primary'
            onPress={() => verifyPhoneNumber()}
            accessibilityLabel='Continue'>
            <Text color='white'>Continue</Text>
          </Button>
        </Box>
      </KeyboardAvoidingView>
      <TimeZoneModal
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        timeZoneList={timezones}
        setTimeZone={setTimeZone}
      />
    </>
  );
};

export default CreateProfile;
