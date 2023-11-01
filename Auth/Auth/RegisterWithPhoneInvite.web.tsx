import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Text } from '@components/Restyle';
import Button from '@components/shared/Button/Button';
import Icon from '@components/shared/Icon/Icon';
import theme from '@themes/theme';

import { RegisterFormValues } from './RegisterForm';

const RegisterWithPhoneInviteWeb: React.FC = () => {
  const { submitForm, setFieldValue } = useFormikContext<RegisterFormValues>();
  const { t } = useTranslation('shared');

  useEffect(() => {
    setFieldValue('step', 4);
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      setFieldValue('step', 3);
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
        }}></Box>
      <Box
        marginHorizontal='m'
        style={{ marginStart: 198, width: 560 }}
        justifyContent='center'>
        <Box flex={1} alignItems='center' justifyContent='center'>
          <Icon name='WinnerTwoColor' width={234} height={176}></Icon>

          <Text textAlign='center' variant='heading2' style={{ marginTop: 54 }}>
            {t('yourAccountHasBeenCreated')}
          </Text>
          <Text textAlign='center' variant='body' marginTop='m'>
            {t('inviteYourPhoneContactsToTaskTag')}
          </Text>
          <Text textAlign='center' variant='bodySecondary' marginTop='xs'>
            {t('addYourContactsToCollaborateOnTaskTag')}
          </Text>
        </Box>

        <Box marginTop='xxl' style={{ marginBottom: 100 }}>
          <Button
            variant='primary'
            onPress={() => {}}
            accessibilityLabel='Continue'>
            <Text color='white'>{t('copyInviteLink')}</Text>
          </Button>
          <Button
            marginTop='s'
            variant='reversed'
            onPress={submitForm}
            accessibilityLabel='Continue'>
            <Text color='black'>{t('skip')}</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterWithPhoneInviteWeb;
