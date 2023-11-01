import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Highlighter from 'react-native-highlight-words';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Box, Text } from '@components/Restyle';
import Button from '@components/shared/Button/Button';
import Icon from '@components/shared/Icon/Icon';
import { useGoogleAuth } from '@hooks/useGoogleAuth';
import { AuthStackScreenProps } from '@navigation/auth/auth-stack';
import Images from '@themes/images';
import theme from '@themes/theme';
import { getApiConfig } from '@utils/getApiConfig';

const Onboarding: React.FC<AuthStackScreenProps<'onboarding'>> = ({
  navigation,
}) => {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [carousel, setCarousel] = useState<Carousel<CarouselItem>>();
  const apiConfig = getApiConfig();
  const [showApiConfig, setShowApiConfig] = useState<boolean>(__DEV__);
  const { clearUserInfo } = useGoogleAuth();
  const { t } = useTranslation('models');
  const insets = useSafeAreaInsets();

  const carouselItem = (item: CarouselItem) => {
    const { title, greenWords, description, banner } = item;

    return (
      <Box flex={1}>
        <Box flex={1}>
          <Image
            source={banner}
            style={{
              width: `100%`,
              height: `100%`,
            }}
            resizeMode='contain'
          />
        </Box>
        <Box style={{ marginTop: 16, marginBottom: 220 }} alignItems='center'>
          <Text
            textAlign='center'
            marginTop='s'
            color='textPrimary'
            variant='heading3'
            style={{ fontSize: 32 }}>
            <Highlighter
              autoEscape
              highlightStyle={{ color: theme.colors.greenSecondary }}
              searchWords={greenWords}
              textToHighlight={title}
            />
          </Text>
          <Text
            variant='metadata1'
            color='textSecondary'
            textAlign='center'
            style={{
              marginTop: Platform.OS === 'android' ? 14 : 14,
              opacity: 0.6,
            }}>
            {description}
          </Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      flex={1}
      backgroundColor='grey01'
      style={{ paddingTop: insets.top + 10 }}>
      <Box
        flexDirection='row'
        style={{
          paddingHorizontal: 20,
          marginBottom: 10,
        }}>
        <Icon name='LogoInitials' width={26} height={24} />
        <Box flex={1}></Box>
        {activeIndex < 2 && (
          <TouchableOpacity
            onPress={() => {
              carousel && carousel.snapToItem(2);
              setActiveIndex(2);
            }}
            accessibilityLabel={t('onBoarding.skip')}>
            <Text
              variant='body1'
              color='textSecondary'
              style={{ opacity: 0.6 }}>
              {t('onBoarding.skip')}
            </Text>
          </TouchableOpacity>
        )}
      </Box>
      <Box flex={1} alignItems='center' justifyContent='flex-start'>
        <Carousel
          ref={(c) => c && setCarousel(c)}
          data={carouselList}
          renderItem={({ item }) => carouselItem(item)}
          itemWidth={screenWidth}
          sliderWidth={screenWidth}
          itemHeight={screenHeight}
          sliderHeight={screenHeight}
          onSnapToItem={(index) => setActiveIndex(index)}
          inactiveSlideOpacity={0}
        />
      </Box>
      <Box
        marginBottom='m'
        marginHorizontal='m'
        style={[styles.bottomButtonContainer, { marginTop: 40 }]}>
        <Pagination
          dotsLength={carouselList.length}
          activeDotIndex={activeIndex}
          dotColor={theme.colors.grey05}
          dotStyle={{
            borderRadius: 0,
            width: theme.spacing.s,
            height: theme.spacing.s,
          }}
          inactiveDotColor={theme.colors.grey02}
          inactiveDotStyle={{
            borderRadius: 0,
            width: theme.spacing.xs,
            height: theme.spacing.xs,
          }}
          inactiveDotScale={1}
        />
        {activeIndex < 2 && (
          <Box>
            <Button
              variant='primary'
              marginBottom='s'
              backgroundColor='grey01'
              borderColor='grey01'>
              {' '}
            </Button>
            <Button
              variant='primary'
              onPress={() => {
                carousel && carousel.snapToNext();
                setActiveIndex(activeIndex + 1);
              }}
              accessibilityLabel={t('onBoarding.continue')}>
              <Text color='white'>{t('onBoarding.continue')}</Text>
            </Button>
          </Box>
        )}
        {activeIndex === 2 && (
          <>
            <Button
              variant='primary'
              onPress={() => {
                clearUserInfo && clearUserInfo();
                navigation.navigate('onboarding-modal', { isLogin: false });
              }} // should be "onboarding-modal" when there's more options
              marginBottom='s'
              accessibilityLabel={t('onBoarding.signUp')}>
              <Text color='white'>{t('onBoarding.signUp')}</Text>
            </Button>

            <Button
              borderColor='textPrimary'
              borderWidth={1}
              variant='text'
              onPress={() => {
                clearUserInfo && clearUserInfo();
                navigation.navigate('onboarding-modal', { isLogin: true });
              }} // should be "login-modal" when there's more options
              accessibilityLabel={t('onBoarding.logIn')}>
              <Text color='black'>{t('onBoarding.logIn')}</Text>
            </Button>
          </>
        )}
      </Box>
      {__DEV__ && showApiConfig && (
        <TouchableOpacity
          style={styles.devIndicator}
          onPress={() => setShowApiConfig(false)}>
          <Box style={styles.devIndicatorBox}>
            <Text variant='labelSmall'>Api: {apiConfig.apiUrl}</Text>
            <Text variant='labelSmall'>Socket: {apiConfig.webSocketUrl}</Text>
          </Box>
        </TouchableOpacity>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  bottomButtonContainer: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
  },
  topRight: {
    top: 10,
    right: -60,
    transform: [{ rotate: '-30deg' }],
  },
  bottomLeft: {
    bottom: 116,
    left: -84,
    transform: [{ rotate: '46deg' }, { scaleX: 1 }],
  },
  topLeft: {
    left: -46,
    transform: [{ rotate: '-18deg' }, { scaleX: -1 }],
  },
  devIndicator: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'white',
    margin: 16,
  },
  devIndicatorBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Onboarding;

type CarouselItem = {
  index: number;
  title: string;
  greenWords: string[];
  description: string;
  watermarkIcon: keyof typeof Images;
  watermarkIcon1?: keyof typeof Images;
  waterMarkPosition: 'topRight' | 'bottomLeft' | 'topLeft';
  banner: ImageSourcePropType;
};

const carouselList: CarouselItem[] = [
  {
    index: 0,
    title: 'Manage your \n Projects & Tasks',
    greenWords: ['Projects', 'Tasks'],
    description: 'No more needing to use 5 apps.',
    watermarkIcon: 'Folder',
    waterMarkPosition: 'topRight',
    banner: require('../../../assets/images/onboarding1.png'),
  },
  {
    index: 1,
    title: 'Organize \n Files & Photos',
    greenWords: ['Files', 'Photos'],
    description: 'Tag a file to organize for you.',
    watermarkIcon: 'File',
    waterMarkPosition: 'bottomLeft',
    banner: require('../../../assets/images/onboarding2.png'),
  },
  {
    index: 2,
    title: 'All through \n Chat',
    greenWords: ['Chat'],
    description: 'Stay connected with your team.',
    watermarkIcon: 'MessageSquare',
    waterMarkPosition: 'topLeft',
    banner: require('../../../assets/images/onboarding3.png'),
  },
];
