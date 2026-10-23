import { Stack } from 'expo-router';
import { Provider } from 'react-redux';

import { store } from '../store/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: 'Crowd Map' }}
        />
        <Stack.Screen
          name="details"
          options={{ title: 'Location Details' }}
        />
      </Stack>
    </Provider>
  );
}
