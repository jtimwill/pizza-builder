import React from "react";
import { View, Switch, StyleSheet, Text } from "react-native";

export default CustomSwitch = ({ isEnabled, setIsEnabled, falseCase, trueCase }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>{ isEnabled ? trueCase : falseCase}</Text>
      <Switch
        trackColor={{ false: "black", true: "black" }}
        thumbColor={isEnabled ? "teal" : "white"}
        ios_backgroundColor="black"
        onValueChange={() => setIsEnabled(previousState => !previousState)}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4, 
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5
  },
});