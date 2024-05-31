import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { InputComponent } from '../components/InputComponent';
import NikeLogo from '../assets/icons/nike2.svg';
import { ButtonComponent } from '../components/ButtonComponent';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const SignUpScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onHandleSignup = async () => {
    setIsLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setLoggedInUser(res.user);

      // Guarda el token en AsyncStorage
      const idToken = await res.user.getIdToken();
      await AsyncStorage.setItem("@storage_Key", idToken);
      dispatch(setToken(idToken));

      // Navega al Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'Products' }],
      });
    } catch (err) {
      console.log(err);
      setError("Error creating account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <NikeLogo
        width={200}
        height={200}
        fill={'#000'}
        style={{ marginTop: 100 }}
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
          text="Sign up"
          onPress={onHandleSignup}
        />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'blue' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
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
    flex: 0.6,
    height: 10,
  }
});
