import React from "react";
import { StyleSheet, View } from "react-native";

export default function MushroomIcon() {
  const toppingWidth = 20;

  const styles = StyleSheet.create({
    mushroom: {
      position: "absolute",
      width: toppingWidth,
      height: toppingWidth,
    },
    mushroomTop: {
      height: toppingWidth / 2,
      width: toppingWidth,
      backgroundColor: "#D5D8DC",
      borderWidth: 1,
      borderTopLeftRadius: toppingWidth,
      borderTopRightRadius: toppingWidth,
    },
    mushroomBottom: {
      right: -toppingWidth / 4,
      height: toppingWidth / 2,
      width: toppingWidth / 2,
      backgroundColor: "#D5D8DC",
      borderWidth: 1,
      borderTopWidth: 0,
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
    <View style={[styles.mushroom, styles.shadow]}>
      <View style={styles.mushroomTop} />
      <View style={styles.mushroomBottom} />
    </View>
  );
}
