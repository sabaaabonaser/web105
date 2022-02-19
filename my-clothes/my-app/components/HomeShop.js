// import React, { Component } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";

// export default class HomeShop extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           this.props.navigation.navigate("Cart");
//         }}
//         style={{marginTop:50}}
//       >
//         <Text > HomeShop </Text>
//       </TouchableOpacity>
//     );
//   }
// }

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
import shopData from "./ShopData";

export default class HomeShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      collection: [
        {
          type: "All",
        },
        {
          type: "Hoddie",
        },
        {
          type: "Jacket",
        },
        {
          type: "Pants",
        },
        {
          type: "T-shirt",
        },
        {
          type: "shose",
        },
        {
          type: "Socks",
        },
      ],
      modalvisiable: false,
      showsearch: false,
      details: {},
      detailscolor: true,
      reviewcolor: false,
      showtext: true,
      cart: [],
    };
  }
  

  componentDidMount() {
    this.getData();
  }

  async getData() {
    let Products = shopData;

    // ------------------add view to objects for searchfun----------------
    for (var i = 0; i < Products.length; i++) {
      Products[i].view = true;
    }
    // ---------------------------
    this.setState({ Products: Products });
  }

  makesearchfun(value) {
    let Products = this.state.Products;
    for (var i = 0; i < Products.length; i++) {
      if (Products[i].name.toUpperCase().includes(value.toUpperCase())) {
        Products[i].view = true;
      } else {
        Products[i].view = false;
      }
    }
    this.setState({ Products: Products });
  }

  makesearchfun2(item, index) {
    let Products = this.state.Products;
    for (var i = 0; i < Products.length; i++) {
      if (Products[i].name.toUpperCase().includes(item.toUpperCase())) {
        Products[i].view = true;
      } else if (item == "All") {
        Products[i].view = true;
      } else {
        Products[i].view = false;
      }
    }
    this.setState({ Products: Products });
  }

  heartfun(value, index) {
    let Products = this.state.Products;
    Products[index].heart_active = !value;
    // alert(Products[index].heart_active);
    // alert(value);
    this.setState({ Products: Products });
  }

  renderproductlist() {
    return this.state.Products.map((item, index) => {
      return (
        <>
          {item.view ? (
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalvisiable: true, details: item });
                // alert(index);
                // alert(JSON.stringify(item));
              }}
            >
              <View
                key={index}
                style={{
                  // backgroundColor: 'yellow',
                  width: 150,
                  height: 180,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
              >
                <View
                  style={{
                    flex: 3,
                    borderRadius: 15,
                    backgroundColor: "#fff",
                  }}
                >
                  <Image
                    source={item.image}
                    source={{ uri: item.image }}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 15,
                      resizeMode: "center",
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    // backgroundColor: 'blue',
                    flex: 0.5,
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{item.name}</Text>
                  <Text>${item.price}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    let value = item.heart_active;
                    // alert(value);
                    this.heartfun(value, index);
                  }}
                  style={{
                    position: "absolute",
                    left: 130,
                    top: 10,
                    // backgroundColor: 'yellow',
                  }}
                >
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ) : null}
        </>
      );
    });
  }

  renderCatgory() {
    return (
      <View
        style={{
          width: "95%",
          height: 100,
          marginLeft: "5%",
          //   backgroundColor: "yellow",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={true}
          style={{ flexDirection: "row" }}
        >
          {this.state.collection.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this.makesearchfun2(item.type, index);
                }}
                style={{
                  width: 60,
                  height: 35,
                  backgroundColor: "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  alignSelf: "center",
                  marginHorizontal: 5,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, color: "#9EA2A2" }}
                >
                  {item.type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
  rendermodel1() {
    return (
      <Modal
        visible={this.state.modalvisiable}
        onRequestClose={() => {
          this.setState({ modalvisiable: false });
        }}
      >
        <>
        
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: "100%",
                height: 400,
                backgroundColor: "white",
              }}
            >
              <Image
                source={{ uri: this.state.details.image }}
                style={{ flex: 1, width: null, height: null }}
              />
            </View>

            {/* --------------icons----------------- */}
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalvisiable: true});
              }}
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#000",
                borderRadius: 25,
                position: "absolute",
                top: 10,
                left: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
               <Icon name="chevron-left" size={20} style={{ color: "#fff" }} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {
              {
                this.state.Component.length == 0;
                this.props.navigation.navigate("HomeShop", {
                  cart: this.state.Component,
                });
              }
            }}
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#E2E7E7",
                borderRadius: 25,
                position: "absolute",
                top: 10,
                right: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >

            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#E2E7E7",
                borderRadius: 25,
                position: "absolute",
                top: 10,
                right: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="shopping-bag" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#E2E7E7",
                borderRadius: 25,
                position: "absolute",
                top: 280,
                right: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="heart"
                size={20}
                style={{
                  color: this.state.details.heart_active ? "#000" : "orange",
                }}
              />
            </TouchableOpacity>
            {/* ------------------------------- */}
            <View
              style={{
                width: "100%",
                // backgroundColor: 'red',
                height: 340,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <View
                style={{
                  width: "90%",
                  marginHorizontal: "5%",
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 24 }}>{this.state.details.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  ${this.state.details.price}
                </Text>
              </View>
              <View style={{ width: "90%", marginHorizontal: "5%" }}>
                <Text>(price incl 21% vat)</Text>
              </View>
              {/* ----- */}
              <View
                style={{ width: "90%", marginHorizontal: "5%", marginTop: 10 }}
              >
                <Text style={{ fontSize: 18 }}>Choose Size</Text>
                <View style={{ flexDirection: "row" }}>
                  {/* ----------size------------ */}
                  {this.state.details &&
                  Object.keys(this.state.details).length !== 0
                    ? this.state.details.product_size.map(
                        (item_size, index_size) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                let details = this.state.details;
                                details.select_size = item_size;
                                this.setState({ details: details });
                                // alert(this.state.details.select_size);
                              }}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 20,
                                backgroundColor: "yellow",
                                marginRight: 5,
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 1,
                              }}
                            >
                              <Text style={{ fontSize: 18 }}>{item_size}</Text>
                            </TouchableOpacity>
                          );
                        }
                      )
                    : null}

                  {/* ----------------- */}
                </View>
              </View>
              {/* ---------color------- */}
              <View
                style={{
                  width: "15%",
                  height: 120,
                  backgroundColor: "#E2E7E7",
                  position: "absolute",
                  right: 10,
                  top: 30,
                  borderRadius: 10,
                }}
              >
                {/* ---- */}
                {this.state.details &&
                Object.keys(this.state.details).length !== 0
                  ? this.state.details.product_color.map(
                      (item_color, index_color) => {
                        return (
                          <View
                            style={{
                              flex: 1,
                              // backgroundColor: 'yellow',
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                let details = this.state.details;
                                details.select_color = item_color;
                                this.setState({ details: details });
                                // alert(this.state.details.select_color);
                              }}
                              style={{
                                width: 30,
                                height: 30,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 20,
                                backgroundColor: "#fff",
                                borderWidth: 2,
                                borderColor: item_color,
                              }}
                            >
                              <View
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 20,
                                  backgroundColor: item_color,
                                }}
                              ></View>
                            </TouchableOpacity>
                          </View>
                        );
                      }
                    )
                  : null}
                {/* ---- */}
              </View>
              {/* ---------------Details&&Review-------------- */}
              <View
                style={{
                  width: "90%",
                  height: 110,
                  // backgroundColor: 'green',
                  marginHorizontal: "5%",
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "60%",
                    height: 30,
                    // backgroundColor: 'red',
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        detailscolor: true,
                        reviewcolor: false,
                        showtext: true,
                      });
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        detailscolor: false,
                        reviewcolor: true,
                        showtext: false,
                      });
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>Review</Text>
                  </TouchableOpacity>
                </View>
                {/* ----- */}
                <View
                  style={{
                    width: "60%",
                    height: 3,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                  }}
                >
                  {this.state.detailscolor ? (
                    <View
                      style={{
                        width: "50%",
                        height: 3,
                        backgroundColor: "yellow",
                      }}
                    ></View>
                  ) : null}
                  {this.state.reviewcolor ? (
                    <View
                      style={{
                        width: "100%",
                        height: 3,
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          width: "50%",
                          height: 3,
                          backgroundColor: "#fff",
                        }}
                      ></View>
                      <View
                        style={{
                          width: "50%",
                          height: 3,
                          backgroundColor: "yellow",
                        }}
                      ></View>
                    </View>
                  ) : null}
                  {/* ----- */}
                </View>
                {/* ----- */}
                <View style={{ marginHorizontal: 5 }}>
                  {this.state.showtext ? (
                    <Text>
                      Activ is one of the most proprietary brands in the sports
                      fields. We are adhering to be existed as a strong
                      supporter of the various kinds of athletic activities. Not
                      only we became a sponsor of many football teams, young
                      champions.
                    </Text>
                  ) : (
                    <Text>
                      The material is very good and the price is very
                      reasonable😍👌
                    </Text>
                  )}
                </View>
              </View>
              {/* ----- */}
              {this.state.details.add_to_cart ? (
                <TouchableOpacity
                  onPress={() => {
                    let details = this.state.details;
                    if (
                      details.select_size == "" &&
                      details.select_color == ""
                    ) {
                      alert("you shoud choose Size and Color");
                    } else if (details.select_size == "") {
                      alert("Youe shoud choose Size");
                    } else if (details.select_color == "") {
                      alert("Youe shoud choose color");
                    } else {
                      let cart = this.state.cart;
                      let details = this.state.details;
                      details.add_to_cart = false;
                      cart.push(details);
                      this.setState({
                        modalvisiable: false,
                        show: false,
                        cart: cart,
                      });
                    }
                  }}
                  // onPress={() => {
                  //   let cart = this.state.cart;
                  //   let details = this.state.details;
                  //   let cartcounter = this.state.cartcounter;
                  //   details.add_to_cart = false;
                  //   cart.push(details);
                  //   cartcounter += 1;
                  //   this.setState({
                  //     modalvisiable: false,
                  //     cartcounter: cartcounter,
                  //     show: false,
                  //   });
                  // }}
                  style={{
                    width: "85%",
                    height: 50,
                    marginHorizontal: "7.5%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#E7A94C",
                    borderRadius: 15,
                    marginTop: 10,
                    flexDirection: "row",
                  }}
                >
                  <Icon
                    name="shopping-bag"
                    size={20}
                    style={{ marginRight: 10, color: "#fff" }}
                  />
                  <Text style={{ fontWeight: "bold", color: "#fff" }}>
                    Add To bag
                  </Text>
                </TouchableOpacity>
              ) : null}

              {/* ----- */}
            </View>
            {/* ---------------------- */}
          </ScrollView>
        </>
      </Modal>
    );
  }

  render() {
    return (
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* ---------------------- */}
          <View style={{ marginTop: "10%" }}>
            <View
              style={{
                width: "90%",
                height: 50,
                marginHorizontal: "5%",
                marginTop: 5,
                //   backgroundColor: "green",
                flexDirection: "row",
              }}
            >
              {/* ---- */}
              <View
                style={{
                  flex: 1,
                  // backgroundColor: 'red',
                  alignItems: "center",
                }}
              >
              </View>
              {/* ---- */}
              <View
                style={{
                  flex: 3,
                  // backgroundColor: 'grey',
                  alignItems: "center",
                }}
              >
                {this.state.showsearch ? (
                  <View
                    style={{
                      // backgroundColor: 'blue',
                      width: "90%",
                      height: 40,
                      borderRadius: 25,
                      borderWidth: 0.5,
                    }}
                  >
                    <TextInput
                      placeholder="Search"
                      onChangeText={(value) => {
                        this.makesearchfun(value);
                      }}
                    />
                  </View>
                ) : null}
              </View>
              {/* ---- */}
              <View
                style={{
                  flex: 1,
                  // backgroundColor: 'red',
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    let x = this.state.showsearch;
                    this.setState({ showsearch: !x });
                  }}
                  style={{
                    // backgroundColor: 'red',
                    width: 40,
                    height: 40,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 0.5,
                  }}
                >
                  <Icon name="search" size={17} />
                </TouchableOpacity>
              </View>
              {/* ---- */}
              <View
                style={{
                  flex: 1,
                  // backgroundColor: 'yellow',
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    // alert(JSON.stringify(this.state.cart));
                    {
                      this.state.cart.length == 0
                        ? alert(
                            "Your Cart is empty choose any thing to full it"
                          )
                        : this.props.navigation.navigate("Cart", {
                            cart: this.state.cart,
                          });
                    }
                  }}
                  style={{
                    // backgroundColor: 'blue',
                    width: 40,
                    height: 40,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 0.5,
                  }}
                >
                  <Icon name="shopping-cart" size={17} />
                </TouchableOpacity>
              </View>
              {/* ---- */}
            </View>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#E7A94C",
                borderRadius: 10,
                position: "absolute",
                right: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>{this.state.cart.length}</Text>
            </View>
            {/* ---------------------- */}
            {this.renderCatgory()}
            {/* ---------------------- */}
            <View style={{ marginHorizontal: "5%" }}>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                Recommanded for you
              </Text>
              <Text>Based on Search</Text>
            </View>
            {/* ---------------------- */}
            <ScrollView showsVerticalScrollIndicator>
              <View
                style={{
                  // backgroundColor: 'yellow',
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}
              >
                {/* ----------------- */}
                {this.renderproductlist()}
                {/* ----------------- */}
              </View>
              <View style={{ width: 50, height: 50 }}></View>
            </ScrollView>
          </View>
        </ScrollView>
        {/* ----------------- */}
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#252060",
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
           // marginHorizontal: '5%',
          }}
        >
          <TouchableOpacity>
            <Icon name="home" size={24} style={{ color: "#fff" }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="shopping-cart" size={24} style={{ color: "#fff" }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="heart" size={24} style={{ color: "#fff" }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="user" size={24} style={{ color: "#fff" }} />
          </TouchableOpacity>
        </View>
        {/* -------------------------------------------------- */}
        {/* ---------------------modal------------------------ */}
        {this.rendermodel1()}
        {/* -------------------------------------------------- */}
      </>
    );
  }
}
