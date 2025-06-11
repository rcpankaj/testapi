import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function RequestComp() {
  // State variables
  const [loading, setLoading] = useState(false); // for showing the loading spinner
  const [apiResponse, setApiResponse] = useState(null); // for storing the API response
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts"); // initial API URL
  const [inputUrl, setInputUrl] = useState(""); // state to store input URL

  // Function to call the API
  const fetchData = async () => {
    setLoading(true);
    setApiResponse(null); // Clear previous response
    try {
      const response = await axios.get(inputUrl || url); // Use input URL if provided, else use default URL
      setApiResponse(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setApiResponse({ error: "Error fetching data" });
    } finally {
      setLoading(false);
    }
  };

  const handleNewRequest = () => {
    setApiResponse(null);
    setInputUrl(""); // Clear the input URL
    // fetchData(); // Trigger a new API request with the current URL
  };

  return (
    <View style={styles.container}>
      {/* Input for custom URL */}
      <TextInput
        style={styles.input}
        placeholder="Enter API URL"
        value={inputUrl}
        onChangeText={setInputUrl}
      />

      {/* Button to fetch data from the input URL */}
      <Button title="Fetch API Data" onPress={fetchData} disabled={loading} />

      {/* Show loader when the API is being called */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Show API response after data is fetched */}
      {apiResponse && !loading && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>API Response:</Text>
          <Text style={styles.jsonResponse}>
            {JSON.stringify(apiResponse, null, 2)}
          </Text>
          <Button title="New API Request" onPress={handleNewRequest} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  responseContainer: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginTop: 20,
    width: "90%",
    maxWidth: 400,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  jsonResponse: {
    fontFamily: "Courier New",
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    whiteSpace: "pre-wrap", // To maintain formatting
    overflowX: "auto", // To handle long lines in JSON response
    textAlign: "left",
    maxHeight: 300,
    overflowY: "scroll",
  },
});
