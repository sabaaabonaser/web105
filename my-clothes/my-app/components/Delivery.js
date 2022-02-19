import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  StatusBar,
  AsyncStorage,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Hoshi } from "react-native-textinput-effects";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import * as Con from "../Constant/images";
// var Constant = Con.Photo;

export default class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      phone: "",
      cart: [],
    };
  }

  componentDidMount() {
    let cart = this.props.navigation.getParam("cart");
    let name = this.props.navigation.getParam("name");
    let price = this.props.navigation.getParam("price");
    let phone = this.props.navigation.getParam("phone");

    this.setState({ name: name, price: price, cart: cart, phone: phone });
  }

  render() {
    return (
      <>
        <View
          style={{
            width: 230,
            height: 230,
            borderRadius: 115,
            backgroundColor: "#5EC2B7",
            position: "absolute",
            left: 10,
            top: -50,
          }}
        ></View>
        <View
          style={{
            width: 230,
            height: 230,
            borderRadius: 115,
            backgroundColor: "#13A090",
            position: "absolute",
            left: -45,
            top: -25,
            //   alignContent: 'center',
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              // backgroundColor: 'yellow',
              marginLeft: 60,
            }}
          >
            <Image
              source={require("./delivery.png")}
              style={{
                width: null,
                height: null,
                flex: 1,
                borderRadius: 60,
                resizeMode: "contain",
              }}
            />
          </View>
          <Text style={{ marginLeft: 60 }}>Delivery company</Text>
        </View>
        {/* ----- */}
        <ScrollView showsVerticalScrollIndicator>
          <View
            style={{
              width: "90%",
              marginHorizontal: "5%",
              // backgroundColor: 'yellow',
              marginTop: 210,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Dear:{this.state.name}
            </Text>
            <Text style={{ fontSize: 18 }}>
              Your phone are :{this.state.phone}
            </Text>

            <Text style={{ fontSize: 18 }}>Your order are :</Text>
          </View>
          <View
            style={{
              width: "90%",
              marginHorizontal: "5%",
              backgroundColor: "#5EC2B7",
              marginTop: 10,
              borderRadius: 20,
              paddingHorizontal: "5%",
              paddingVertical: "5%",
            }}
          >
            {/* ----- */}
            {this.state.cart.map((item, index) => {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>{item.name}</Text>
                    <Text style={{ fontSize: 18 }}>
                      {item.product_count}piece
                    </Text>
                    <Text style={{ fontSize: 18 }}>{item.price}$</Text>
                  </View>
                  <View
                    style={{
                      width: "90%",
                      height: 5,
                      borderRadius: 20,
                      backgroundColor: "#13A090",
                      marginHorizontal: "5%",
                    }}
                  ></View>
                </View>
              );
            })}
            {/* -------- */}
          </View>
          {/* ---- */}
          <View style={{ width: "90%", marginHorizontal: "5%" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 20 }}>
              Delivery service 20$
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}>
              Your receipt = ${this.state.price + 30}
            </Text>
          </View>
          {/* ---- */}
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("HomeShop", {
                cart: "",
              });
            }}
            style={{
              width: "90%",
              height: 60,
              marginHorizontal: "5%",
              backgroundColor: "#5EC2B7",
              borderRadius: 30,
              marginTop: 30,
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#FFFFFF",
                fontWeight: "bold",
                
                fontStyle: "normal",
              }}
            >
              finish
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  }
}
