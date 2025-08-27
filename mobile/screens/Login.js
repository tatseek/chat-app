import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { API_BASE } from "../services/config";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      alert("Login successful!");
      navigation.navigate("ChatList", { token: res.data.token, user: res.data.user });
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={login} />
      <Button title="Go to Register" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 8,
  },
});

