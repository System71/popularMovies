import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

const PopularMoviesScreen = ({ navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzOTk5OTI1Y2U5MzAwMTQ4YTNmZDQiLCJlbWFpbCI6InBhckByaWdhdWRpZXIuZnIiLCJleHBpcmF0aW9uRGF0ZSI6IjIwMjQtMDYtMTVUMjM6MDA6MDAuMDAwWiIsImlzVHJhaW5pbmciOnRydWUsImlhdCI6MTcwOTk3NjU0NH0.9qvolyZD4MplriPl6VNRkS6NQ2JNTb0HL_MYxl3gnZ4";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movies/popular",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      console.log("response.datas=", response.data.results);
      setData(response.data.results);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.movieItem}
          onPress={() => navigation.navigate("Movie", { id: item.id })}
        >
          <Image
            style={styles.moviePicture}
            source={{ uri: item.poster_path.original }}
          ></Image>
          <View style={styles.movieInfos}>
            <Text>{item.original_title}</Text>
            <Text>{item.overview}</Text>
          </View>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
};

export default PopularMoviesScreen;

const styles = StyleSheet.create({
  moviePicture: {
    height: 300,
    width: 150,
    resizeMode: "contain",
  },
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  movieInfos: {
    gap: 30,
  },
});
