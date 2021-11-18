import { FontAwesome5 } from "@expo/vector-icons";

import React from "react";
import { View, StyleSheet } from "react-native";

export default function AnchovyIcon() {
  const styles = StyleSheet.create({
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
    <View style={[{ transform: [{ rotate: "0deg" }]}]}>
      <FontAwesome5 name="fish" size={24} color="black" />
    </View>
  );
}
