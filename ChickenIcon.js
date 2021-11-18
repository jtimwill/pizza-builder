import React from "react";
import { StyleSheet, View } from "react-native";

export default function ChickenIcon() {
  const toppingWidth = 20;

  const styles = StyleSheet.create({
    chicken: {
      position: "absolute",
      flex: 1,
      height: toppingWidth * 2,
      width: toppingWidth / 1.5,
      borderRadius: 2,
      backgroundColor: "#FAD7A0",
      borderWidth: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
      transform: [{ rotate: "90deg" }],
      borderTopLeftRadius: 5,
      borderBottomRightRadius: 5
    },
    grillMark: {
      borderRadius: 4,
      height: 3,
      width: toppingWidth / 1.6,
      backgroundColor: "#6E2C00",
      transform: [{ rotate: "45deg" }],
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

  return (
    <View style={[styles.chicken, styles.shadow]}>
      <View style={styles.grillMark} />
      <View style={styles.grillMark} />
      <View style={styles.grillMark} />
    </View>
  );
}
