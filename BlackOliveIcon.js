import React from "react";
import { StyleSheet, View } from "react-native";

export default function BlackOliveIcon() {
  const toppingWidth = 20;

  const styles = StyleSheet.create({
    blackOlive: {
      position: "absolute",
      height: toppingWidth * 0.7,
      width: toppingWidth * 0.7,
      borderRadius: toppingWidth * 0.7,
      borderColor: "#1B2631",
      borderWidth: 4,
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

  return <View style={[styles.blackOlive]} />;
}
