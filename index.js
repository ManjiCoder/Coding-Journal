/**
 * @format
 */

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
const queryClient = new QueryClient();
export default function Main() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </>
  );
}
AppRegistry.registerComponent(appName, () => Main);
