import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Header, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import WebView from "react-native-webview";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      articleDetails: {}
    };
  }

  componentDidMount() {
    this.getArticle();
  }

  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
  }

  getArticle = () => {
    const url = "http://localhost:5000/get-article";
    axios
      .get(url)
      .then(response => {
        this.setState({ articleDetails: response.data.data });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  likedArticle = () => {
    const url = "http://localhost:5000/liked-article";
    axios
      .post(url)
      .then(response => {
        this.getArticle();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  unlikedArticle = () => {
    const url = "http://localhost:5000/unliked-article";
    axios
      .post(url)
      .then(response => {
        this.getArticle();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    const { articleDetails } = this.state;
    if (articleDetails.url) {
      const { url } = articleDetails;

      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header
              centerComponent={{
                text: "Recommended",
                style: styles.headerTitle
              }}
              rightComponent={{
                icon: "search",
                color: "#fff",
                onPress: () =>
                  this.props.navigation.navigate("RecommendedArticles")
              }}
              backgroundColor={"#d500f9"}
              containerStyle={{ flex: 1 }}
            />
          </View>
          <View style={styles.upperContainer}>
            <WebView source={{ uri: url }} />
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.likedArticle}>
                <Icon
                  reverse
                  name={"check"}
                  type={"entypo"}
                  size={RFValue(30)}
                  color={"#76ff03"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.unlikedArticle}>
                <Icon
                  reverse
                  name={"cross"}
                  type={"entypo"}
                  size={RFValue(30)}
                  color={"#ff1744"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 0.1
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(18)
  },
  upperContainer: {
    flex: 0.75
  },
  lowerContainer: {
    flex: 0.15
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});
