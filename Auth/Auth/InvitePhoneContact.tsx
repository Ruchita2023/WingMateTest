import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Linking, Platform, AppState } from 'react-native';

import CustomTabBar from '@components/CustomTabBar/CustomTabBar';
import { ContactType } from '@components/Invite/Contact';
import ContactList from '@components/Invite/ContactList';
import { Box } from '@components/Restyle';
import ListNavigationItem, {
  ListNavigationItemProps,
} from '@components/shared/ListNavigationItem/ListNavigationItem';
import SearchInput from '@components/shared/SearchInput/SearchInput';
import { TabNavigatorSwipeSpacer } from '@components/shared/TabNavigatorSwipeSpacer';
import { Snackbar } from '@components/Snackbar/Snackbar';
import { TeamListItem } from '@components/Team/TeamListItem';
import { ChatDrawerScreen } from '@components/Web/Drawer/WebDrawerContext';
import {
  useCreateChatMutation,
  User,
  useListContactUsersQuery,
  useListUsersLazyQuery,
  useUploadContactsMutation,
  ListContactUsersDocument,
} from '@graphql/generated';
import { useDeviceContacts } from '@hooks/useDeviceContacts';
import { useListTeamsFromQuery } from '@hooks/useListTeamsFromQuery';
import useMe from '@hooks/useMe';
import { useAppNavigation } from '@navigation/useAppNavigation';
import theme from '@themes/theme';
import { convertUsersToContacts } from '@utils/convertUsersToContacts';

const Tab = createMaterialTopTabNavigator();
const InvitePhoneContact: React.FC = () => {
  const navigation = useAppNavigation();

  const { t: s } = useTranslation('shared');

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [showRequestContactsPermission, setShowRequestContactsPermission] =
    useState(false);
  const { t } = useTranslation('models');

  const { teamsWithoutPersonal: teams } = useListTeamsFromQuery();
  const [listUsers, { data: taskTagUsers }] = useListUsersLazyQuery();
  const { data: listContacts } = useListContactUsersQuery();
  const { me } = useMe();

  const listContactsToContactType = convertUsersToContacts(
    (listContacts?.listContactUsers as User[]) || []
  );

  //Remove self contact from the list. If user save self number into phone contact list
  // it creates duplicate record in the list because we added me manually into the list

  const contactsWithoutMe = listContactsToContactType.filter(
    (user) => user.id !== me?.id
  );

  const listContactWithMe =
    ([
      ...contactsWithoutMe,
      { ...me, displayName: s('myDisplayName', { displayName: me?.name }) },
    ] as ContactType[]) || [];

  // additionally filters out listContacts => rm filter when backend does this
  const listUsersToContactType = convertUsersToContacts(
    (taskTagUsers?.listUsers as User[]) || []
  ).filter((u) => !listContactWithMe.some((c) => c.id === u.id));

  const [createChat] = useCreateChatMutation({
    onCompleted: (data) => {
      const { createChat: createChatData } = data;
      navigation.navigateToChatDrawer({
        screen: ChatDrawerScreen.details,
        chatId: createChatData.id,
        resetStack: Platform.OS != 'web',
      });
    },
    refetchQueries: ['listChats'],
  });
  const [search, setSearch] = useState<string>('');
  const { getDeviceContacts, convertDeviceContactsToPhoneNumbers } =
    useDeviceContacts();
  const [deviceContacts, setDeviceContacts] = useState<ContactType[]>([]);

  const navItems: ListNavigationItemProps[] = [
    {
      title: 'New Group Chat',
      iconName: 'Users',
      onPress: () => navigation.navigate('create-group-stack'),
    },
    {
      title: 'Invite Friends',
      iconName: 'UserCircle',
      onPress: () => navigation.navigate('invite-friends'),
    },
  ];

  const renderTabBar = (props: MaterialTopTabBarProps) => {
    return (
      <Box
        flexDirection='row'
        alignItems='center'
        paddingHorizontal='m'
        paddingBottom='xs'
        maxHeight={50}>
        <CustomTabBar {...props} spacing={theme.spacing.l} />
      </Box>
    );
  };

  const openChat = ({ firstName, lastName, id }: ContactType) => {
    const chatName = [firstName, lastName].filter((item) => !item).join(' ');

    createChat({
      variables: {
        attributes: {
          name: chatName,
          userIds: [id],
        },
      },
    });
  };

  useEffect(() => {
    search && listUsers({ variables: { term: search } });
  }, [search]);

  const [uploadContacts] = useUploadContactsMutation({
    refetchQueries: [{ query: ListContactUsersDocument }],
  });

  useEffect(() => {
    getDeviceContacts({ requestPermission: true }).then((d) => {
      setShowRequestContactsPermission(false);
      if (d.length > 0 && !me?.contactsSyncedAt) {
        setDeviceContacts(d);
        const phoneNumbers = convertDeviceContactsToPhoneNumbers(d);
        uploadContacts({ variables: { attributes: { phoneNumbers } } });
      }
    });

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (appStateVisible == 'active') {
      checkPermission();
    }
  }, [appStateVisible]);

  const checkPermission = () => {
    const { isContactsPermissionAllowed } = useDeviceContacts();
    isContactsPermissionAllowed().then((isAuthorized) => {
      setShowRequestContactsPermission(!isAuthorized);
    });
  };

  return (
    <Box flex={1}>
      <Box
        marginHorizontal='m'
        marginTop='m'
        flexDirection='row'
        alignItems='center'>
        <SearchInput
          onTextChanged={(t: string) => setSearch(t)}
          value={search}
        />
      </Box>
      {showRequestContactsPermission && (
        <Box p='m' paddingBottom='none'>
          <Snackbar
            title={t('chat.snackBar.title')}
            description={t('chat.snackBar.message')}
            iconName='Winners'
            onPress={() => {
              Linking.openSettings();
            }}
            onClose={() => setShowRequestContactsPermission(false)}
          />
        </Box>
      )}
      {!search ? (
        <>
          <Box marginHorizontal='m'>
            <FlatList
              data={navItems}
              renderItem={({ item, index }) => (
                <ListNavigationItem key={index} {...item} isLarge />
              )}
              ItemSeparatorComponent={() => (
                <Box
                  borderBottomColor='grey02'
                  borderBottomWidth={1}
                  marginBottom='s'
                  marginTop='xxs'
                />
              )}
              ListHeaderComponent={() => <Box height={28} />}
              scrollEnabled={false}
            />
            <Box
              borderBottomColor='grey02'
              borderBottomWidth={1}
              marginTop='xxs'
            />
          </Box>
          <Box marginTop='m' flexDirection='row' flex={1}>
            <Tab.Navigator
              screenOptions={{ swipeEnabled: Platform.OS !== 'web' }}
              sceneContainerStyle={{
                backgroundColor: 'transparent',
              }}
              tabBar={renderTabBar}
              initialRouteName='recent'
              backBehavior='none'>
              <Tab.Screen
                name='all-contacts'
                options={{
                  tabBarAccessibilityLabel: 'All Contacts',
                  tabBarLabel: 'All Contacts',
                }}
                initialParams={{ tabBarLabel: 'All Contacts' }}
                children={() => (
                  <Box flex={1}>
                    <ContactList
                      contacts={listContactWithMe}
                      alphabetize
                      onPress={(item: ContactType) => openChat(item)}
                    />
                  </Box>
                )}
              />
              <Tab.Screen
                name='teams'
                options={{
                  tabBarAccessibilityLabel: 'Teams',
                  tabBarLabel: 'Teams',
                }}
                initialParams={{ tabBarLabel: 'Teams' }}
                children={() => (
                  <Box flex={1} marginHorizontal='m'>
                    <FlatList
                      keyboardDismissMode='on-drag'
                      data={teams}
                      renderItem={({ item }) => (
                        <TeamListItem
                          team={item}
                          onSelect={() =>
                            navigation.navigate('new-chat-from-team-members', {
                              teamId: item.id,
                            })
                          }
                        />
                      )}
                      ItemSeparatorComponent={() => <Box marginTop='l' />}
                    />
                  </Box>
                )}
              />
            </Tab.Navigator>
            <TabNavigatorSwipeSpacer />
          </Box>
        </>
      ) : (
        <Box flex={1} marginTop='m'>
          <ContactList
            contacts={[...listContactWithMe, ...deviceContacts]}
            taskTagUsers={listUsersToContactType}
            filterVal={search}
            onPress={(item: ContactType) => openChat(item)}
          />
        </Box>
      )}
    </Box>
  );
};

export default InvitePhoneContact;
