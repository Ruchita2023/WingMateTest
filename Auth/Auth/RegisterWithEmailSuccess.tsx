import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HeaderWrapper } from '@components/Headers/HeaderWrapper';
import { Box, Text } from '@components/Restyle';
import Button from '@components/shared/Button/Button';
import Icon from '@components/shared/Icon/Icon';
import { RegisterStackScreenProps } from '@navigation/auth/register-stack';
import theme from '@themes/theme';

import { RegisterFormValues } from './RegisterForm';

const RegisterWithEmailSuccess: React.FC<
  RegisterStackScreenProps<'register-with-email-success'>
> = ({ navigation }) => {
  const { submitForm } = useFormikContext<RegisterFormValues>();
  const { t } = useTranslation('shared');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Box paddingTop='xs'>
          <HeaderWrapper>
            <Box flex={1} alignItems='flex-end'>
              <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
                accessibilityLabel={t('shared:done')}
                onPress={submitForm}>
                <Text variant='buttonLabel' color='greenSecondary'>
                  {t('skip')}
                </Text>
              </TouchableOpacity>
            </Box>
          </HeaderWrapper>
        </Box>
      ),
    });
  }, []);

  return (
    <Box flex={1} marginHorizontal='m'>
      <Text textAlign='center' variant='heading2' style={{ marginTop: 80 }}>
        {t('yourAccountHasBeenCreated')}
      </Text>
      <Text textAlign='center' variant='body' marginTop='m'>
        {t('inviteYourPhoneContactsToTaskTag')}
      </Text>
      <Text textAlign='center' variant='bodySecondary' marginTop='xs'>
        {t('addYourContactsToCollaborateOnTaskTag')}
      </Text>
      <Box flex={1} alignItems='center' justifyContent='center'>
        <Icon name='WinnerTwoColor' width={234} height={176}></Icon>
      </Box>
      <Box style={{ height: 38 }}></Box>
      <Box style={{ marginBottom: theme.spacing.l + insets.bottom }}>
        <Button
          marginBottom='s'
          variant='primary'
          onPress={() => {}}
          accessibilityLabel='Invite Phone Contacts'>
          {t('invitePhoneContacts')}
        </Button>
        <Button
          variant='reversed'
          onPress={() => {}}
          accessibilityLabel='Share Invite Link'>
          {t('shareInviteLink')}
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterWithEmailSuccess;
