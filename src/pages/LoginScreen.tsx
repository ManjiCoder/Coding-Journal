import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import styles from '../styles/common';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          gap: 30,
          justifyContent: 'center',
          alignContent: 'center',
        },
      ]}>
      <View style={{rowGap: 5}}>
        <Text variant="headlineMedium" style={styles.textCenter}>
          Login to your Account
        </Text>
        <Text variant="titleSmall" style={styles.textCenter}>
          Welcome back to CodingJournal
        </Text>
      </View>

      <View style={{paddingVertical: 0, gap: 30}}>
        <TextInput
          label="Email"
          value={email}
          autoFocus
          // placeholder="Enter your Email"
          onChangeText={text => setEmail(text)}
          right={<TextInput.Icon icon="email" />}
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={pass}
          // placeholder="Enter your Password"
          onChangeText={text => setPass(text)}
          right={<TextInput.Icon icon="eye" />}
        />
      </View>

      <Button mode="contained" rippleColor="#fff">
        LogIn
      </Button>
    </View>
  );
};

export default LoginScreen;
