import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Divider } from "react-native-elements";
import Toast from "react-native-toast-message";
import { removeCartItem, resetCart } from "../redux/cart/cartActions";

// import NumericInput from "react-native-numeric-input";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../src/consts/colors";
import foods from "../src/consts/Foods";
import { PrimaryButton } from "../components/Button";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartReducer.items);

  const calculateTotal = () => {
    let totalPrice = 0;
    items.forEach((el) => {
      totalPrice += el.price;
    });
    return totalPrice;
  };

  const CartCard = ({ item }) => {
    return (
      <View style={styles.cartCard}>
        <Image source={item.image} style={{ height: 80, width: 80 }} />
        <View
          style={{ height: 100, marginLeft: 10, paddingVertical: 10, flex: 1 }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>{item.price}</Text>
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{quantity}</Text>
          <View style={styles.actionBtn}>
            <Icon
              name="remove"
              size={25}
              color={COLORS.white}
              onPress={decQuantity}
            ></Icon>
            <Icon
              name="add"
              size={25}
              color={COLORS.white}
              onPress={incQuantity}
            ></Icon>
          </View>
        </View>
      </View>
    );
  };

  const cartIteam = [
    {
      id: "2",
      name: "Cheese Pizza",
      price: "2100.00",
      image: require("../assets/cheesePizza.jpg"),
    },
  ];
  const [TextInputValue, setTextInputValue] = React.useState("");

  const [quantity, setQuantity] = React.useState(1);

  const incQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const placeOrder = () => {
    const data = {
      customerName,
      idNumber,
      tableNumber,
      foodItems: items.map((el) => {
        return {
          item: el._id,
          quantity: el.quantity,
          // qty: el.qty,
          // soldPrice: el.discount
          //   ? (el.price - (el.price * el.discount) / 100).toFixed(2)
          //   : el.price,
          soldPrice: el.price,
        };
      }),
    };
    axios
      .post(`${config.API}/order`, data)
      .then(({ data }) => {
        dispatch(resetCart());
        Toast.show({
          topOffset: 40,
          visibilityTime: 1500,
          position: "top",
          type: "success",
          text1: "Order is placed successfully",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
      </View> */}
      <Header title="Cart" navigation={navigation} style={styles.header} />
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: -5,
          paddingHorizontal: 20,
        }}
      > */}
      {/* <Text>{items.length}</Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Table Number</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 30,
            width: 80,
            paddingHorizontal: 5,
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
            backgroundColor: COLORS.primary,
            color: COLORS.white,
          }}
          onChangeText={(text) => setTextInputValue(text)}
          value={TextInputValue}
        /> */}
      {/* </View> */}
      {/* <View> */}
      <ScrollView style={styles.container}>
        {items.length > 0 ? (
          <>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Order Details
            </Text>
            <View style={{ marginTop: 20 }}>
              {items.map((item, index) => (
                <View
                  key={`${index}_cart_items`}
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Image
                      style={styles.image}
                      source={{
                        uri: item.img,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      marginLeft: 3,
                      width: 120,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                  </View>
                  <View style={{ justifyContent: "center", marginLeft: 3 }}>
                    <Text style={{ fontWeight: "bold" }}>{item.qty}</Text>
                  </View>
                  <View style={{ justifyContent: "center", marginLeft: 3 }}>
                    <Text style={{ fontWeight: "bold", color: "#9F7591" }}>
                      Rs. {item.price}
                    </Text>
                  </View>
                  <View style={{ justifyContent: "center", marginLeft: 3 }}>
                    <TouchableOpacity>
                      <MaterialIcons
                        onPress={() => dispatch(removeCartItem(item))}
                        name="delete"
                        size={24}
                        color="#F7685B"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
            <Divider
              style={{ marginBottom: 30, marginTop: 20 }}
              orientation="horizontal"
            />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                {/* Sub Total ({items.length} Items)  */}
                Total items ({items.length} Items)
              </Text>
              {/* <Text style={{ fontSize: 14, color: "#9F7591" }}> */}
              {/* Rs. {calculateTotal().toFixed(2)} */}
              {/* Rs. {calculateTotal().toFixed} */}
              {/* </Text> */}
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Order Total
              </Text>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
              >
                Rs. {calculateTotal().toFixed(2)}
                {/* Rs. {calculateTotal()} */}
              </Text>
            </View>
          </>
        ) : (
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text style={{ color: "#4B76D1", fontSize: 18 }}>
              Your Cart seems to be Empty...
            </Text>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text>Add a few of our great items and comeback</Text>
              <Text>We will be waiting...</Text>
            </View>
          </View>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        <Button
          onPress={placeOrder}
          disabled={items.length > 0 ? false : true}
          buttonStyle={{ height: 55 }}
          containerStyle={styles.button}
          title="Place Order"
        />
      </View>
      {/* </View> */}
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        // data={cartIteam}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Total Price
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Rs. 3000</Text>
            </View>

            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton title="Place Order" />
            </View>
          </View>
        )}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
  },
  header: {
    marginTop: 20,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    borderRadius: 10,
    elevation: 15,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    width: 60,
    height: 45,
    resizeMode: "cover",
    borderRadius: 8,
  },
  button: {
    width: "90%",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    color: COLORS.primary,
  },
});

export default Cart;
