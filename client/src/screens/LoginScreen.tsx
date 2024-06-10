import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { InputComponent } from '../components/InputComponent'
import NikeLogo from '../assets/icons/nike2.svg'
import { ButtonComponent } from '../components/ButtonComponent'
import { signInWithEmailPassword } from '../services/atuthService'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Login success'))
        .catch((err) => Alert.alert('Login error', err.message));
    }
  };

  return (
    <View style={styles.container}>
      <NikeLogo
        width={200}
        height={200}
        fill={'#000'}
        style={{ marginTop: 100, }}
      />
      <View style={styles.inputContainer}>
        <InputComponent
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <InputComponent
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <ButtonComponent
          text="Login"
          onPress={() => onHandleLogin()}
        />
        <View style={{
          flexDirection: 'row',
          marginTop: 20
        }}>
          <Text>
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={{ color: 'blue' }}>
              {' '}Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: .6,
    height: 10,
  }
})