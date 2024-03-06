import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Config from 'react-native-config'

const App = () => {
  
  const env = Config.ENV;

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>{env}</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})