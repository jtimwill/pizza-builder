// Random Number Generation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Position Absolute for overlapping: https://stackoverflow.com/questions/47545355/how-to-overlap-in-react-native
// Animation: https://hackernoon.com/react-native-animation-guide-poz31is
// Shapes: https://codedaily.io/tutorials/The-Shapes-of-React-Native
// Color Pallette: https://htmlcolorcodes.com/
// Rotate Animation: https://javascript.plainenglish.io/creating-a-rotation-animation-in-react-native-45c3f2973d62

import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Pizza({
  pepperoniArray,
  chickenArray,
  anchovyArray,
  bellPepperArray,
  blackOliveArray,
  mushroomArray,
  pizzaWidth,
  cheeseWidth,
  sauceWidth,
  toppingWidth,
  isTomato,
}) {
  useEffect(() => {
    move(pepperoniArray);
  }, [pepperoniArray]);

  useEffect(() => {
    move(chickenArray);
  }, [chickenArray]);

  useEffect(() => {
    move(anchovyArray);
  }, [anchovyArray]);

  useEffect(() => {
    move(bellPepperArray);
  }, [bellPepperArray]);

  useEffect(() => {
    move(blackOliveArray);
  }, [blackOliveArray]);

  useEffect(() => {
    move(mushroomArray);
  }, [mushroomArray]);

  const move = (toppingArray) => {
    const animations = [];
    for (let item of toppingArray)
      if (item.animation)
        animations.push(
          Animated.timing(item.animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          })
        );
    Animated.stagger(20, animations).start();
  };

  const styles = StyleSheet.create({
    pan: {
      backgroundColor: "#5D6D7E",
      height: 320,
      width: 320,
      borderRadius: 320,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      marginBottom: 14,
    },
    crust: {
      backgroundColor: "#DC7633",
      height: pizzaWidth,
      width: pizzaWidth,
      borderRadius: pizzaWidth,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
    },
    sauce: {
      backgroundColor: isTomato ? "#A93226" : "#F7F9F9",
      height: sauceWidth,
      width: sauceWidth,
      borderRadius: sauceWidth,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
    },
    cheese: {
      backgroundColor: "#F4D03F",
      height: cheeseWidth,
      width: cheeseWidth,
      borderRadius: cheeseWidth,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
    },
    pepperoni: {
      position: "absolute",
      height: toppingWidth,
      width: toppingWidth,
      borderRadius: toppingWidth,
      backgroundColor: "#922B21",
      borderWidth: 1,
    },
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
    anchovy: {
      position: "absolute",
    },
    bellPepper: {
      position: "absolute",
      height: toppingWidth * 1.5,
      width: toppingWidth / 3,
      backgroundColor: "green",
      borderWidth: 1,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10
    },
    blackOlive: {
      position: "absolute",
      height: toppingWidth * 0.7,
      width: toppingWidth * 0.7,
      borderRadius: toppingWidth * 0.7,
      borderColor: "#1B2631",
      borderWidth: 4,
    },
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
    slice: {
      position: "absolute",
      height: 1,
      width: pizzaWidth,
      backgroundColor: "black",
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
    shadowTopping: {
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
      elevation: 2.5,
    },
  });

  const slicePizza = (pizzaWidth) => {
    const angles = {
      150: ["0deg", "90deg"],
      200: ["0deg", "45deg", "90deg", "135deg"],
      250: ["0deg", "45deg", "90deg", "135deg"],
      300: ["0deg", "30deg", "60deg", "90deg", "120deg", "150deg"],
    };
    return angles[String(pizzaWidth)].map((item, index) => (
      <View
        key={index}
        style={[
          styles.slice,
          { zIndex: 1000 },
          { transform: [{ rotate: item }] },
        ]}
      />
    ));
  };

  // const getAnimatedStyle = (animationProperty) => {
  //   return (
  //     animationProperty && {
  //       opacity: animationProperty.interpolate({
  //         inputRange: [0, 1],
  //         outputRange: [0, 1],
  //       }),
  //     }
  //   );
  // };

  const getAnimatedStyle = (animationProperty, position) => {
    const positionArray = position.transform;
    return (
      animationProperty && {
        transform: [
          {
            translateY: animationProperty.interpolate({
              inputRange: [0, 1],
              outputRange: [-500, positionArray[1].translateY]
            }),
          },
          {
            translateX: animationProperty.interpolate({
              inputRange: [0, 1],
              outputRange: [0, positionArray[0].translateX]
            })
          },
          {
            rotate: animationProperty.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', positionArray[2].rotate]
            })
          },
        ]
      }
    );
  };

  return (
    <View style={[styles.pan, styles.shadow]}>
      <View style={[styles.crust, styles.shadow]}>
        <View style={[styles.sauce]}>
          <View style={[styles.cheese]}>
            {pepperoniArray.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.pepperoni,
                  item.position,
                  styles.shadowTopping,
                  getAnimatedStyle(item.animation, item.position),
                ]}
              />
            ))}

            {chickenArray.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.chicken,
                  item.position,
                  styles.shadowTopping,
                  getAnimatedStyle(item.animation, item.position),
                ]}
              >
                <View style={styles.grillMark} />
                <View style={styles.grillMark} />
                <View style={styles.grillMark} />
              </Animated.View>
            ))}

            {anchovyArray.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.anchovy,
                  item.position,
                  getAnimatedStyle(item.animation, item.position),
                ]}
              >
                <FontAwesome5 name="fish" size={24} color="black" />
              </Animated.View>
            ))}

            {bellPepperArray.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.bellPepper,
                  item.position,
                  styles.shadowTopping,
                  getAnimatedStyle(item.animation, item.position),
                ]}
              />
            ))}

            {blackOliveArray.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.blackOlive,
                  item.position,
                  getAnimatedStyle(item.animation, item.position),
                ]}
              />
            ))}

            {mushroomArray.map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.mushroom,
                  item.position,
                  styles.shadowTopping,
                  getAnimatedStyle(item.animation, item.position),
                ]}
              >
                <View style={styles.mushroomTop} />
                <View style={styles.mushroomBottom} />
              </Animated.View>
            ))}

            {slicePizza(pizzaWidth)}
          </View>
        </View>
      </View>
    </View>
  );
}
