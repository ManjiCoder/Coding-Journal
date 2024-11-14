import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import MyTabs from './navigators/MyTabs';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
