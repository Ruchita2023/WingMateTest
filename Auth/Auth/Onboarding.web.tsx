import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Box, Text } from '@components/Restyle';
import Button from '@components/shared/Button/Button';
import Icon from '@components/shared/Icon/Icon';

const Onboarding: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Box flex={1}>
      <Box
        marginBottom='m'
        marginHorizontal='m'
        alignItems='center'
        justifyContent='center'
        flex={1}>
        <Box style={{ width: 375 }} alignItems='center'>
          <Icon
            name='Logo'
            width={106}
            height={32}
            marginBottom='xl'
            color='textPrimary'
          />
          <Text marginBottom='l'>Get started with TaskTag</Text>
          <Button
            variant='primary'
            onPress={() =>
              navigation.navigate('onboarding-web', { isLogin: false })
            } // when there are more login options this should be 'onboarding-web'
            marginBottom='s'
            fullWidth>
            <Text color='white'>Sign up</Text>
          </Button>

          <Button
            borderColor='textPrimary'
            borderWidth={1}
            variant='text'
            onPress={() =>
              navigation.navigate('onboarding-web', { isLogin: true })
            }
            fullWidth>
            <Text color='black'>Log in</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Onboarding;
