import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';

export default function ToppingButton({count, handleRemove, handleAdd, name, icon }) {
  return (
    <View style={styles.toppingButtonContainer}>
        <Pressable onPress={handleRemove} style={({ pressed }) => [ styles.toppingRemoveButton, styles.shadow, pressed && styles.buttonPressed ]}>
            <Entypo name="arrow-bold-down" size={30} color="white" />
        </Pressable>
      <View style={[styles.toppingInfoText, styles.shadow]}>{icon}</View>
        <Pressable onPress={handleAdd} style={({ pressed }) => [ styles.toppingAddButton, styles.shadow, pressed && styles.buttonPressed ]}>
            <Entypo name="arrow-bold-up" size={30} color="white" />
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  toppingButtonContainer: {
    flex: 1,
    backgroundColor: "white",
    margin: 0,
    flexDirection: "row",
  },
  toppingRemoveButton: {
    flex: 1,
    backgroundColor: "#5D6D7E",
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 2,
  },
  toppingAddButton: {
    flex: 1,
    backgroundColor: "#5D6D7E",
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    borderWidth: 2,
  },
  toppingInfoText: {
    flex: 2,
    backgroundColor: "#5D6D7E",
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  toppingText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
  buttonPressed: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderWidth: 0,
  },
  shadow: {
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2.5,
  },
});
