import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import styles from '../styles/common';

const SignupScreen = () => {
  const [name, setName] = useState('');
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
          Create your Account
        </Text>
        <Text variant="titleSmall" style={styles.textCenter}>
          Welcome to CodingJournal
        </Text>
      </View>

      <View style={{paddingVertical: 0, gap: 20}}>
        <TextInput
          label="Name"
          value={name}
          //   autoFocus
          // placeholder="Enter your Email"
          onChangeText={text => setName(text)}
          right={<TextInput.Icon icon="account" />}
        />
        <TextInput
          label="Email"
          value={email}
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

      <View style={{rowGap: 5}}>
        <Button mode="contained" rippleColor="#fff">
          Sign Up
        </Button>
        <Text variant="titleMedium" style={styles.textCenter}>
          Or
        </Text>
        <Button mode="contained" rippleColor="#fff">
          LogIn
        </Button>
      </View>
    </View>
  );
};

export default SignupScreen;
