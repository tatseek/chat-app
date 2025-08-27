import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { API_BASE } from "../services/config";

export default function ChatList({ route, navigation }) {
  const { token, user } = route.params;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.filter((u) => u._id !== user._id));
      } catch (err) {
        alert("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {user.name}</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ChatScreen", { token, user, other: item })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: "#ccc" },
});

