import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "../Header/Header";
import COLORS from "../src/consts/colors";
import ReservationsList from "../src/consts/ReservationsList";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReservationsForm1 from "./ReservationsForm1";
import CustomForm from "./CustomForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FlatList, TouchableHighlight } from "react-native-gesture-handler";

export default function Reservations({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationItem, setreservationItem] = useState([]);
  const [loading, setLoading] = useState(true);

  //////find on add reservations
  const addReservation = (reservation) => {
    reservation.key = Math.random().toString();
    setReservation((currentReservation) => {
      return [reservation, ...currentReservation];
    });
    setModalVisible(false);
  };

  var now = new Date();
  console.log((now));
  const ListofReservations = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    fetch(`https://galaxy-rest-be.herokuapp.com/tableres`)
      .then((res) => res.json())
      .then((results) => {
        setreservationItem(results);
        console.log(results);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };
  useEffect(() => {
    ListofReservations();
  }, []);

console.log(reservationItem)

  const ReservationsCard = ({ item }) => {
    return (
      <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9}>
        <View style={styles.ReservationsCard}>
          <Modal visible={modalVisible} animationType="fade">
            <Icon
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalVisible(false)}
            ></Icon>
            <ReservationsForm1 addReservation={addReservation} />
            {/* <CustomForm addReservation={addReservation} /> */}
          </Modal>
          <View style={styles.tableNumCon}>
            {/* <Text
              style={{ fontWeight: "bold", fontSize: 20, color: COLORS.white }}
            >
              {item.table}
            </Text> */}
          </View>
          <View
            style={{
              height: 100,
              marginLeft: 10,
              paddingVertical: 10,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {/* {item.cusName} */}
              {item.customerName}
            </Text>

            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {/* {item.time} */}
              {item.startTime} - {item.endTime}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Rs.{item.price}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 14, color:"#808080" }}>
              {item.customerEmail}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 14, color:"#A9A9A9" }}>
              {item.customerContactNumber}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16, color:COLORS.primary }}>
              {item.date.substr(0, 10)}
            </Text>
          </View>
          <View style={{ marginRight: 20, alignItems: "center" }}></View>
        </View>
      </TouchableHighlight>
    );
  };

  const TableCard = ({ item }) => {
    return (
      <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9}>
        <View style={styles.TableCard}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                justifyContent: "center",
              }}
            >
              {item.table}
            </Text>

            <View style={{ marginRight: 20, alignItems: "center" }}></View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Reservations "
        navigation={navigation}
        style={styles.header}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <Modal
          visible={modalVisible}
          animationType="fade"
          style={styles.modalToggle}
        >
          <ReservationsForm1 />
          {/* <CustomForm/> */}
        </Modal>
      </TouchableWithoutFeedback>

      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Button title="ADD" onPress={() => setModalVisible(true)} />
      </View>

      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          // data={ReservationsList}
          data={reservationItem}
          renderItem={({ item }) => <ReservationsCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 50,
  },
  container: {
    flex: 1, //to center the content
  },
  content: {
    backgroundColor: COLORS.light,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  reservedContent: {
    flex: 1,
    height: 45,
    width: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  tableContent: {
    flex: 5,
    height: 45,
    width: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
  },
  ReservationsCard: {
    height: 150,
    borderRadius: 10,
    elevation: 15,
    width: 360,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  TableCard: {
    height: 40,
    borderRadius: 10,
    elevation: 15,
    width: 40,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    flex: 1,
    // paddingBottom: 0,
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 500,
    height: 500,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginLeft: "auto",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "flex-end",
    width: 50,
    justifyContent: "flex-end",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  tableNumCon: {
    height: 45,
    width: 45,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  // modalContent: {
  //   flex: 1,
  // },
});
