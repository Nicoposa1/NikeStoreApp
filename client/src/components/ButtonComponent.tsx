import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export const ButtonComponent = ({ text, onPress }: {
  text: String,
  onPress: () => void
}) => {
  return (
    <TouchableOpacity style={styles.btn}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 30,
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
    marginTop: 20
  },
  btnText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  }
})