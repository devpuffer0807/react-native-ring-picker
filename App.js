/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { ReactNativeRingPicker } from "./src/react-native-ring-picker"

let participants = ["Apple", "Pear", "Banana", "Football", "Volleyball", "Basketball", "Tenniss", "Pingpong", "Frog", "Rabbit", "Tigher", "Lion", "Rabbit", "Girraffe", "Whale", "Dog", "Coat", "Gloves", "Shirt", "Trosers"];

const App = () => {

  const spinRef = useRef(null)
  const [spinFlag, setSpinFlag] = useState(1)

  const Icon = () => {}

  return (
    <View style={styles.container}>
      <ReactNativeRingPicker
        icons={participants}
        girthAngle={120}
        onPress={(iconId) => setSpinFlag(iconId)}
        style={{ flex: 0, marginTop: 0 }}
        defaultIconColor={"#ffccec"}
        noExpDistCorrectionDegree={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
