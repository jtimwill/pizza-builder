import React from "react";
import { StyleSheet, View } from "react-native";

export default function BellPepperIcon() {
  const toppingWidth = 20;

  const styles = StyleSheet.create({
    bellPepper: {
      position: "absolute",
      height: toppingWidth * 1.5,
      width: toppingWidth / 3,
      backgroundColor: "green",
      borderWidth: 1,
      transform: [{ rotate: "90deg" }],
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10
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

  return <View style={[styles.bellPepper, styles.shadow]} />;
}
