// Append State: https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array
// Remove First Element: https://stackoverflow.com/questions/68135691/remove-first-element-of-an-array-in-react-usestate-hooks
// Clone array, then update: https://stackoverflow.com/questions/65393641/how-to-update-an-array-by-index-using-the-usestate-hook
// Round Number: https://www.w3schools.com/jsref/jsref_tofixed.asp
// Random Number inclusive: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Animated,
  Pressable,
} from "react-native";
import Pizza from "./Pizza";
import CustomSlider from "./CustomSlider";
import CustomSwitch from "./CustomSwitch";
import ToppingButton from "./ToppingButton";
import AnchovyIcon from "./AnchovyIcon";
import MushroomIcon from "./MushroomIcon";
import PepperoniIcon from "./PepperoniIcon";
import BlackOliveIcon from "./BlackOliveIcon";
import ChickenIcon from "./ChickenIcon";
import BellPepperIcon from "./BellPepperIcon";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { Modal, Portal, Provider } from "react-native-paper";

export default function App() {
  const [size, setSize] = useState(0);
  const [isTomato, setIsTomato] = useState(true);
  const [isThin, setIsThin] = useState(false);
  const [pepperoniArray, setPepperoniArray] = useState([]);
  const [chickenArray, setChickenArray] = useState([]);
  const [anchovyArray, setAnchovyArray] = useState([]);

  const [bellPepperArray, setBellPepperArray] = useState([]);
  const [blackOliveArray, setBlackOliveArray] = useState([]);
  const [mushroomArray, setMushroomArray] = useState([]);

  const [purchaseState, setPurchaseState] = useState(false);

  const [zIndex, setZIndex] = useState(-1);

  const [visible, setVisible] = React.useState(false);

  const pizzaWidths = [150, 200, 250, 300];
  const pizzaWidth = pizzaWidths[size];
  const thinModifier = isThin ? 15 : 0;
  const cheeseWidth = pizzaWidth - 45 + thinModifier;
  const sauceWidth = pizzaWidth - 25 + thinModifier;
  const toppingWidth = 20;
  const toppingsCount = 30; //pizzaWidth / 5;

  // Redraw toppings when pizza is resized
  useEffect(() => {
    repositionToppings(pepperoniArray, setPepperoniArray);
    repositionToppings(chickenArray, setChickenArray);
    repositionToppings(anchovyArray, setAnchovyArray);

    repositionToppings(bellPepperArray, setBellPepperArray);
    repositionToppings(blackOliveArray, setBlackOliveArray);
    repositionToppings(mushroomArray, setMushroomArray);
  }, [size]);

  const repositionToppings = (toppingGetter, toppingSetter) => {
    let newArray = [];
    for (let item of toppingGetter)
      newArray.push({
        position: getToppingPosition(),
        animation: new Animated.Value(0),
      });
    toppingSetter(newArray);
  };

  // Increment the topping count and the topping components in the UI
  const handleAdd = (toppingArrayGetter, toppingArraySetter) => {
    const cloneArray = [...toppingArrayGetter];
    for (let item of cloneArray) item.animation = null; // Don't animate old toppings
    toppingArraySetter(cloneArray);

    for (let i = 0; i < toppingsCount; ++i) {
      // Add new toppings and animate them
      toppingArraySetter((curr) => [
        ...curr,
        { position: getToppingPosition(), animation: new Animated.Value(0) },
      ]);
    }
  };

  // Decrement the topping count and the topping components in the UI
  const handleRemove = (toppingArray, toppingArraySetter) => {
    if (toppingArray.length === 0) return;
    toppingArraySetter(
      toppingArray.slice(0, toppingArray.length - toppingsCount)
    );
  };

  // Generate a random position on the pizza
  const getRandomPosition = (value) => {
    return Math.floor(Math.random() * (2 * value + 1) - value);
  };

  // Generate a random offset and angle for a given topping
  const getToppingPosition = () => {
    const maxOffset = (cheeseWidth - toppingWidth) / 2;
    const randomAngle = Math.floor(Math.random() * 361) + "deg";
    const randomXOffset = getRandomPosition(maxOffset);
    const randomYOffset = getRandomPosition(
      Math.sqrt(maxOffset ** 2 - randomXOffset ** 2)
    );
    setZIndex(zIndex + 1);
    return {
      zIndex: zIndex,
      transform: [
        { translateX: randomXOffset },
        { translateY: isNaN(randomYOffset) ? 0 : randomYOffset },
        { rotate: randomAngle },
      ],
    };
  };

  const reset = () => {
    setPepperoniArray([]);
    setChickenArray([]);
    setAnchovyArray([]);
    setBellPepperArray([]);
    setBlackOliveArray([]);
    setMushroomArray([]);
    setIsThin(false);
    setSize(0);
  };

  const handleCloseModal = () => {
    if (purchaseState) setPurchaseState(false);
    setVisible(false);
  };

  const handlePurchaseButton = () => {
    if (!purchaseState) {
      setPurchaseState(true);
      reset();
    } else handleCloseModal();
  };

  const getPepperoniPrice = () => {
    return (pepperoniArray.length / toppingsCount) * 1.99;
  };

  const getChickenPrice = () => {
    return (chickenArray.length / toppingsCount) * 1.99;
  };

  const getAnchovyPrice = () => {
    return (anchovyArray.length / toppingsCount) * 1.99;
  };

  const getBellPepperPrice = () => {
    return (bellPepperArray.length / toppingsCount) * 1.99;
  };

  const getBlackOlivePrice = () => {
    return (blackOliveArray.length / toppingsCount) * 1.99;
  };

  const getMushroomPrice = () => {
    return (mushroomArray.length / toppingsCount) * 1.99;
  };

  const getPizzaPrice = () => {
    const pizzaObj = { 150: 9.99, 200: 11.99, 250: 13.99, 300: 14.99 };
    return pizzaObj[pizzaWidth];
  };

  const getTotalPrice = () => {
    let output = getPizzaPrice();
    output += getPepperoniPrice() + getChickenPrice() + getAnchovyPrice();
    output += getBellPepperPrice() + getBlackOlivePrice() + getMushroomPrice();
    return output.toFixed(2);
  };

  const generateSizeText = (index) => {
    const sizeDescriptions = ["Small", "Medium", "Large", "Extra Large"];
    return sizeDescriptions[index];
  };

  const getToppingPriceArray = () => {
    const toppingPriceArray = [
      {
        name: "Pepperoni",
        multiplier: pepperoniArray.length / toppingsCount,
        price: getPepperoniPrice(),
      },
      {
        name: "Chicken",
        multiplier: chickenArray.length / toppingsCount,
        price: getChickenPrice(),
      },
      {
        name: "Anchovies",
        multiplier: anchovyArray.length / toppingsCount,
        price: getAnchovyPrice(),
      },
      {
        name: "Green Peppers",
        multiplier: bellPepperArray.length / toppingsCount,
        price: getBellPepperPrice(),
      },
      {
        name: "Black Olives",
        multiplier: blackOliveArray.length / toppingsCount,
        price: getBlackOlivePrice(),
      },
      {
        name: "Mushrooms",
        multiplier: mushroomArray.length / toppingsCount,
        price: getMushroomPrice(),
      },
    ];

    let noBlanks = [];
    for (let item of toppingPriceArray) if (item.price) noBlanks.push(item);
    return noBlanks;
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <View style={styles.UIContainer}>
          <View style={styles.priceContainer}>
            <Text style={[styles.priceText, styles.shadow]}>
              Total Price: ${getTotalPrice()}
            </Text>
          </View>
          <View style={styles.pizzaContainer}>
            <Pizza
              pizzaWidth={pizzaWidth}
              cheeseWidth={cheeseWidth}
              sauceWidth={sauceWidth}
              toppingWidth={toppingWidth}
              isTomato={isTomato}
              pepperoniArray={pepperoniArray}
              chickenArray={chickenArray}
              anchovyArray={anchovyArray}
              bellPepperArray={bellPepperArray}
              blackOliveArray={blackOliveArray}
              mushroomArray={mushroomArray}
            />
          </View>
        </View>
        <View style={styles.controlsContainer}>
          <View style={styles.settingsContainer}>
            <View style={styles.sizeContainer}>
              <CustomSlider
                size={size}
                setSize={setSize}
                generateSizeText={generateSizeText}
              />
            </View>
            <View style={styles.crustContainer}>
              <CustomSwitch
                isEnabled={isThin}
                setIsEnabled={setIsThin}
                falseCase={"Thick"}
                trueCase={"Thin"}
              />
            </View>
            <View style={styles.sauceContainer}>
              {/* <CustomSwitch isEnabled={isTomato} setIsEnabled={setIsTomato} /> */}
              <Pressable
                onPress={reset}
                style={({ pressed }) => [
                  styles.buttonSmall,
                  styles.shadow,
                  pressed && styles.buttonPressed,
                ]}
              >
                <MaterialIcons name="loop" size={48} color="white" />
              </Pressable>
            </View>
          </View>
          <View style={styles.toppingsContainer}>
            <View style={styles.meatContainer}>
              <View style={styles.toppingHeaderContainer}>
                <Text style={styles.toppingHeaderText}>Meats</Text>
              </View>
              <View style={styles.toppingBodyContainer}>
                <ToppingButton
                  count={pepperoniArray.length}
                  handleRemove={() =>
                    handleRemove(pepperoniArray, setPepperoniArray)
                  }
                  handleAdd={() => handleAdd(pepperoniArray, setPepperoniArray)}
                  name={"Pepperoni"}
                  icon={<PepperoniIcon />}
                />

                <ToppingButton
                  count={chickenArray.length}
                  handleRemove={() =>
                    handleRemove(chickenArray, setChickenArray)
                  }
                  handleAdd={() => handleAdd(chickenArray, setChickenArray)}
                  name={"Chicken"}
                  icon={<ChickenIcon />}
                />

                <ToppingButton
                  count={anchovyArray.length}
                  handleRemove={() =>
                    handleRemove(anchovyArray, setAnchovyArray)
                  }
                  handleAdd={() => handleAdd(anchovyArray, setAnchovyArray)}
                  name={"Anchovies"}
                  icon={<AnchovyIcon />}
                />
              </View>
            </View>
            <View style={styles.veggieContainer}>
              <View
                style={[
                  styles.toppingHeaderContainer,
                  { backgroundColor: "teal" },
                ]}
              >
                <Text style={styles.toppingHeaderText}>Veggies</Text>
              </View>
              <View style={styles.toppingBodyContainer}>
                <ToppingButton
                  count={bellPepperArray.length}
                  handleRemove={() =>
                    handleRemove(bellPepperArray, setBellPepperArray)
                  }
                  handleAdd={() =>
                    handleAdd(bellPepperArray, setBellPepperArray)
                  }
                  name={"Green Peppers"}
                  icon={<BellPepperIcon />}
                />

                <ToppingButton
                  count={blackOliveArray.length}
                  handleRemove={() =>
                    handleRemove(blackOliveArray, setBlackOliveArray)
                  }
                  handleAdd={() =>
                    handleAdd(blackOliveArray, setBlackOliveArray)
                  }
                  name={"Black Olives"}
                  icon={<BlackOliveIcon />}
                />

                <ToppingButton
                  count={mushroomArray.length}
                  handleRemove={() =>
                    handleRemove(mushroomArray, setMushroomArray)
                  }
                  handleAdd={() => handleAdd(mushroomArray, setMushroomArray)}
                  name={"Mushrooms"}
                  icon={<MushroomIcon />}
                />
              </View>
            </View>
          </View>
          <View style={styles.checkoutContainer}>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={() => setVisible(false)}
                contentContainerStyle={[styles.modal, styles.shadow]}
              >
                <View style={styles.modalHeader}>
                  <View style={styles.modalHeaderRow}>
                    <Text style={styles.modalHeaderRowText}>
                      {!purchaseState && "Order Summary"}
                    </Text>
                    <Pressable
                      onPress={handleCloseModal}
                      style={({ pressed }) => [
                        styles.buttonClose,
                        styles.shadow,
                        pressed && styles.buttonPressed,
                      ]}
                    >
                      <AntDesign name="close" size={24} color="white" />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.modalBody}>
                  {!purchaseState && (
                    <>
                      <View style={styles.modalBodyHeader}>
                        <Text style={styles.modalBodyHeaderText}>
                          {generateSizeText(size)} Pizza: ${getPizzaPrice()}
                        </Text>
                      </View>
                      {getToppingPriceArray().map((item, index) => (
                        <View key={index} style={styles.modalBodyBody}>
                          <Text style={styles.modalBodyBodyText}>
                            {" • "} {item.name} x{item.multiplier}: $
                            {item.price.toFixed(2)}
                          </Text>
                        </View>
                      ))}
                      <View style={styles.modalBodyFooter}>
                        <Text style={styles.modalBodyFooterText}>
                          Total Price: ${getTotalPrice()}
                        </Text>
                      </View>
                    </>
                  )}

                  {purchaseState && (
                    <View style={styles.modalBodySuccessContainer}>
                      <Text style={styles.orderCompleteText}>SUCCESS!</Text>
                      <Text style={styles.orderCompleteText}>🤝😄💸</Text>
                    </View>
                  )}
                </View>
                <View style={styles.modalFooter}>
                  {!purchaseState && (
                    <Pressable
                      onPress={handlePurchaseButton}
                      style={({ pressed }) => [
                        styles.buttonPurchase,
                        styles.shadow,
                        pressed && styles.buttonPressed,
                      ]}
                    >
                      <Text style={styles.buttonText}>Complete Purchase</Text>
                    </Pressable>
                  )}
                </View>
              </Modal>
            </Portal>
            <Pressable
              onPress={() => setVisible(true)}
              style={({ pressed }) => [
                styles.button,
                styles.shadow,
                pressed && styles.buttonPressed,
              ]}
            >
              <FontAwesome5 name="shopping-cart" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
    margin: 10,
  },
  UIContainer: {
    flex: 1,
    backgroundColor: "blue",
  },
  priceContainer: {
    flex: 1,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
  },
  priceText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  pizzaContainer: {
    flex: 7,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
  },
  controlsContainer: {
    flex: 1,
    marginTop: 5,
    backgroundColor: "white",
  },
  settingsContainer: {
    flex: 1.5,
    backgroundColor: "white",
    flexDirection: "row",
  },
  sizeContainer: {
    flex: 2,
    backgroundColor: "white",
    flexDirection: "row",
  },
  sauceContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
  },
  crustContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    margin: 4,
  },
  toppingsContainer: {
    flex: 4,
    backgroundColor: "white",
    flexDirection: "row",
  },
  meatContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  veggieContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  toppingHeaderContainer: {
    flex: 1,
    backgroundColor: "#922B21",
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  toppingHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  toppingBodyContainer: {
    flex: 5,
    backgroundColor: "ivory",
    margin: 3,
    marginTop: 0,
  },
  checkoutContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  button: {
    flex: 1,
    margin: 4,
    backgroundColor: "teal",
    borderRadius: 15,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  buttonSmall: {
    flex: 1,
    margin: 4,
    backgroundColor: "#922B21",
    borderRadius: 15,
    padding: 5,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
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
  buttonClose: {
    width: 40,
    height: 40,
    margin: 10,
    backgroundColor: "#5D6D7E",
    borderRadius: 40,
    padding: 5,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPurchase: {
    flex: 1,
    margin: 10,
    backgroundColor: "teal",
    borderRadius: 15,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
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
  modal: {
    backgroundColor: "white",
    height: "45%",
    margin: 30,
    borderRadius: 10,
    borderWidth: 2,
  },
  modalHeader: {
    flex: 1,
  },
  modalHeaderRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalHeaderRowText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 10,
  },
  modalBody: {
    flex: 3,
  },
  modalBodyHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginVertical: 3,
    marginHorizontal: 10,
    borderTopWidth: 2,
  },
  modalBodyHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  modalBodyBody: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-end",
    marginVertical: 2,
    marginHorizontal: 10,
  },
  modalBodyBodyText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },

  modalBodySuccessContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    marginTop: 10,
  },
  modalFooter: {
    flex: 1,
    marginBottom: 10,
  },
  modalBodyFooter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    borderTopWidth: 2,
    marginVertical: 3,
    marginTop: 5,
    marginHorizontal: 10,
  },
  modalBodyFooterText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  orderCompleteText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "gold",
  },
});
