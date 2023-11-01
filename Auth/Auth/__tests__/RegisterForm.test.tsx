import '@mocks/server';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { render, waitFor, screen, fireEvent } from '@tests/test-utils';

import RegisterForm from '../RegisterForm';

const MyComponent = () => {
  return <RegisterForm />;
};

test('RegisterForm', async () => {
  render(<MyComponent />);
  const EMAIL_PLACEHOLDER_STRING = 'Please enter your email';
  const PASSWORD_PLACEHOLDER_STRING = 'Password';
  const CONTINUE_STRING = 'Continue';
  const FIRST_NAME_STRING = 'First Name';
  const LAST_NAME_STRING = 'Last Name';
  const EMAIL_ADDRESS_STRING = 'Email Address';
  const PHONE_NUMBER_STRING = 'Phone Number';

  // Screen 1 - Email & Password

  await waitFor(() => {
    expect(screen.getByText(EMAIL_PLACEHOLDER_STRING)).toBeOnTheScreen();
  });

  // Initial state
  expect(screen.getByText(PASSWORD_PLACEHOLDER_STRING)).toBeOnTheScreen();
  expect(screen.getByText(CONTINUE_STRING)).toBeOnTheScreen();

  fireEvent.press(screen.getByText(CONTINUE_STRING));
  expect(screen.getAllByText('Required')).toHaveLength(2);

  fireEvent.changeText(
    screen.getByLabelText(EMAIL_PLACEHOLDER_STRING),
    'testexample@tasktag.com'
  );
  // TODO add test for validate email
  expect(screen.getAllByText('Required')).toHaveLength(1);

  fireEvent.changeText(
    screen.getByLabelText(PASSWORD_PLACEHOLDER_STRING),
    'example1234'
  );
  // TODO add test for validate length

  await waitFor(() => {
    expect(screen.queryAllByText('Required')).toHaveLength(0);
  });

  fireEvent.press(screen.getByText(CONTINUE_STRING));

  // Screen 2 - Profile info

  await waitFor(() => {
    expect(screen.getByText(FIRST_NAME_STRING)).toBeOnTheScreen();
  });
  expect(screen.getByText(LAST_NAME_STRING)).toBeOnTheScreen();
  expect(screen.getByText(EMAIL_ADDRESS_STRING)).toBeOnTheScreen();
  expect(screen.getByText(PHONE_NUMBER_STRING)).toBeOnTheScreen();

  fireEvent.press(screen.getByText(CONTINUE_STRING));

  expect(screen.getAllByText('Required')).toHaveLength(2);
  expect(screen.getByText('Not a valid phone number')).toBeOnTheScreen();

  fireEvent.changeText(screen.getByLabelText(FIRST_NAME_STRING), 'Test');
  await waitFor(
    () => {
      expect(screen.getAllByText('Required')).toHaveLength(1);
    },
    { timeout: 10000 }
  );

  fireEvent.changeText(screen.getByLabelText(LAST_NAME_STRING), 'User');
  await waitFor(
    () => {
      expect(screen.queryAllByText('Required')).toHaveLength(0);
    },
    { timeout: 10000 }
  );

  // screen.debug()

  fireEvent.changeText(screen.getByDisplayValue('+1'), '2815555555');
  await waitFor(
    () => {
      // #1
      expect(
        screen.queryByText('Not a valid phone number')
      ).not.toBeOnTheScreen();
    },
    { timeout: 10000 }
  );

  fireEvent.changeText(screen.getByDisplayValue('+12815555555'), '281555555');
  await waitFor(
    () => {
      expect(screen.getByText('Not a valid phone number')).toBeOnTheScreen();
    },
    { timeout: 10000 }
  );

  fireEvent.changeText(screen.getByDisplayValue('+1281555555'), '2815555555');

  await waitFor(
    () => {
      // #2
      expect(
        screen.queryByText('Not a valid phone number')
      ).not.toBeOnTheScreen();
    },
    { timeout: 10000 }
  );

  fireEvent.press(screen.getByText(CONTINUE_STRING));

  await waitFor(
    () => {
      expect(AsyncStorage.setItem).toBeCalledWith('authToken', 'tokenabc123');
    },
    { timeout: 10000 }
  );
});
