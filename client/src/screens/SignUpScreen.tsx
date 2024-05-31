import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { InputComponent } from '../components/InputComponent'
import NikeLogo from '../assets/icons/nike2.svg'
import { ButtonComponent } from '../components/ButtonComponent'
// import { createUserEmailAndPassword, signInWithEmailPassword } from '../services/atuthService'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../store/authSlice'


export const SignUpScreen = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [loggedInUser, setLoggedInUser] = React.useState<any>(null)

  const dispatch = useDispatch();

  const {token} = useSelector((state: any) => state.auth);


  const onHandleSignup = async () => {
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setLoggedInUser(res.user);

        dispatch(setToken(res.user.stsTokenManager.accessToken));
      })

      .catch((err) => {
        console.log(err);
        setError("Incorrect Email/Password");
      })

      .finally(() => setIsLoading(false));
  }
  

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
          onPress={onHandleSignup}
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