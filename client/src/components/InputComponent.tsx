import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export const InputComponent = ({ placeholder, value, onChangeText }: {
  placeholder: string,
  value: string,
  onChangeText: (text: string) => void
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        keyboardType={placeholder === 'Email' ? 'email-address' : 'visible-password'}
        secureTextEntry={placeholder === 'Password' ? true : false}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 8,
    marginTop: 20,
    padding: 10,
  }
})