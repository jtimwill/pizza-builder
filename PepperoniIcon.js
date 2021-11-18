import React from "react";
import { StyleSheet, View } from "react-native";

export default function PepperoniIcon() {
  const toppingWidth = 20;

  const styles = StyleSheet.create({
    pepperoni: {
      position: "absolute",
      height: toppingWidth,
      width: toppingWidth,
      borderRadius: toppingWidth,
      backgroundColor: "#922B21",
      borderWidth: 1,
    },
    shadow: {
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
      elevation: 2.5,
    },
  });

  return <View style={[styles.pepperoni, styles.shadow]} />;
}
