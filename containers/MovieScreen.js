import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

const MovieScreen = ({ route, navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzOTk5OTI1Y2U5MzAwMTQ4YTNmZDQiLCJlbWFpbCI6InBhckByaWdhdWRpZXIuZnIiLCJleHBpcmF0aW9uRGF0ZSI6IjIwMjQtMDYtMTVUMjM6MDA6MDAuMDAwWiIsImlzVHJhaW5pbmciOnRydWUsImlhdCI6MTcwOTk3NjU0NH0.9qvolyZD4MplriPl6VNRkS6NQ2JNTb0HL_MYxl3gnZ4";

  const id = route.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movie/${id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      console.log("response.data2=", response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <Text style={styles.movieTitle}>{data.original_title}</Text>
      <Image
        style={styles.moviePicture}
        source={{ uri: data.poster_path.original }}
      ></Image>
      <View style={styles.genresContainer}>
        {data.genres.map((genre) => (
          <Text style={styles.genre} key={genre.id}>
            {genre.name}
          </Text>
        ))}
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.synopsis}>{data.overview}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("PopularMovies")}
      >
        <Text>Retourner aux films</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
    gap: 30,
  },
  movieTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
  },
  moviePicture: {
    height: 250,
    width: 200,
    resizeMode: "contain",
  },
  genresContainer: {
    flexDirection: "row",
    gap: 30,
  },
  genre: {
    color: "grey",
    fontSize: 20,
    fontWeight: "bold",
  },
  synopsis: {
    fontSize: 20,
  },
  scrollView: {
    height: 250,
  },
});
