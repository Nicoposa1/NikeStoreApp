import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { InputComponent } from '../components/InputComponent'
import NikeLogo from '../assets/icons/nike2.svg'
import { ButtonComponent } from '../components/ButtonComponent'
import { signInWithEmailPassword } from '../services/atuthService'
import { authentication } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

export const LoginScreen = () => {
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [loggedInUser, setLoggedInUser] = React.useState<any>(null)
  const navigation = useNavigation()

  const handleLogin = async () => {
    try {
      await signInWithEmailPassword(email, password)
      console.log('Logged in')
    } catch (e) {
      console.log(e)
    }
  }


  const handleSignIn = async (email, password) => {
    setIsLoading(true);

    try {
      const res = await signInWithEmailAndPassword(authentication, email, password);
      console.log("Login successful");
      setLoggedInUser(res.user);

      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem('@storage_Key', res.user.stsTokenManager.accessToken);

      console.log('Token stored in AsyncStorage');
    } catch (err) {
      console.log(err);
      setError("Incorrect Email/Password");
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
          onPress={() => handleSignIn(email, password)}
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
    alignItems: 'center'
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: .6,
    height: 10,
  }
})