import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import io from "socket.io-client";
import axios from "axios";
import { API_BASE } from "../services/config";

export default function ChatScreen({ route }) {
  const { token, user, other } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_BASE}/conversations/${other._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.log("Fetch error", err);
      }
    };

    fetchMessages();

    const s = io(API_BASE, {
      auth: { token },
    });

    setSocket(s);

    s.on("connect", () => console.log("Socket connected"));

    s.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => s.disconnect();
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;
    socket.emit("message", { to: other._id, content: text });
    setMessages((prev) => [...prev, { sender: user._id, content: text }]);
    setText("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text style={item.sender === user._id ? styles.me : styles.them}>
            {item.content}
          </Text>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    padding: 8,
    borderRadius: 4,
  },
  me: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
    margin: 4,
    padding: 8,
    borderRadius: 5,
  },
  them: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    margin: 4,
    padding: 8,
    borderRadius: 5,
  },
});

