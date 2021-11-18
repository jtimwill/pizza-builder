import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

export default function CustomSlider({size, setSize, generateSizeText}) {
  return (
    <View style={styles.sliderParentContainer}>
      <View style={[styles.sliderRowContainer, styles.shadow]}>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>
            <Text style={styles.sliderValueText}>
              {" "}
              {generateSizeText(size)}
            </Text>
          </Text>
          <Slider
            maximumValue={3}
            minimumValue={0}
            step={1}
            trackStyle={{ height: 5, backgroundColor: "blue" }}
            thumbStyle={{
              height: 20,
              width: 20,
              backgroundColor: "teal",
              borderWidth: 2
            }}
            value={size}
            onValueChange={(value) => setSize(value)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    sliderParentContainer: {
        flex: 3.75,
        justifyContent: "space-around",
      },
      sliderRowContainer: {
        flex: 1,
        flexDirection: "row",
        margin: 4,
      },
      sliderContainer: {
        flex: 2.5,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "space-around",
        padding: 15,
        borderWidth: 2,
      },
      sliderText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
      },
      sliderValueText: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
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
