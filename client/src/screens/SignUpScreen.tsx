import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { InputComponent } from '../components/InputComponent'
import NikeLogo from '../assets/icons/nike2.svg'
import { ButtonComponent } from '../components/ButtonComponent'
import { signInWithEmailPassword } from '../services/atuthService'
import {authentication} from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const SignUpScreen = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [loggedInUser, setLoggedInUser] = React.useState<any>(null)

  const handleLogin = async () => {
    try {
      await signInWithEmailPassword(email, password)
      console.log('Logged in')
    } catch (e) {
      console.log(e)
    }
  }


  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);

    signInWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        console.log("successful");
        setLoggedInUser(res.user);
      })

      .catch((err) => {
        console.log(err);
        setError("Incorrect Email/Password");
      })

      .finally(() => setIsLoading(false));
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
          <TouchableOpacity>
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