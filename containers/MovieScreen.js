import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

const MovieScreen = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movies/popular"
      );

      console.log("response.data=", response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <Text>MOVIE</Text>
      {/* <FlatList
    data={}
    keyExtractor={}
    renderItem={}
    ></FlatList> */}
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({});
