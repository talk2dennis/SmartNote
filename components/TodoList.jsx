import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import OptionModal from "./OptionModal";
import Entypo from '@expo/vector-icons/Entypo';
import { ThemeContext } from "../context/ThemeContext";
import { formatDate } from "../utils/utils";

const TodoList = ({ todos }) => {
  const { theme } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const animationValue = useRef(new Animated.Value(0)).current;
  const style = styles(theme);
  const router = useRouter();

  // Animate the FlatList on mount
  useEffect(() => {
    const animation = Animated.timing(animationValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop(); // Cleanup animation on unmount
  }, [animationValue]);

  const handlePress = (id) => router.push(`notes/${id}`);

  const handleLongPress = (item) => {
    setSelectedTodo(item);
    setModalVisible(true);
  };

  const toggleVisibility = () => {
    setModalVisible(false);
    setSelectedTodo(null);
  };

  const renderItem = ({ item }) => (
    <View style={style.card}>
      <View style={style.titleContainer}>
        <Text style={style.title}>{item.title}</Text>
        <Pressable
          style={style.button}
          onPress={() => handleLongPress(item)}
          accessible
          accessibilityLabel="Options menu"
        >
          <Entypo name="dots-three-vertical" size={18} color={"gray"} />
        </Pressable>
      </View>
      <Pressable
        style={({ pressed }) => [ pressed && style.pressedCard]}
        onPress={() => handlePress(item.id)}
        onLongPress={() => handleLongPress(item)}
      >
        <Text style={style.description}>
          {item.description.length > 50
            ? `${item.description.substring(0, 50)}...`
            : item.description}
        </Text>
      </Pressable>
      <View style={style.tagContainer}>
        {item.tags.map((tag, index) => (
          <Text key={index} style={style.tag}>
            #{tag}
          </Text>
        ))}
      </View>
      <Text style={style.date}>
        {item.updatedAt ? "Updated: " : "Created: "}{" "}
        {item.updatedAt
          ? formatDate(item.updatedAt)
          : formatDate(item.createdAt)}
      </Text>
    </View>
  );

  return (
    <View style={style.container}>
      {todos && todos.length > 0 ? (
        <Animated.FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          windowSize={5}
          style={{
            opacity: animationValue,
            transform: [
              {
                scale: animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1],
                }),
              },
            ],
          }}
          renderItem={renderItem}
        />
      ) : (
        <Text style={style.emptyText}>
          {todos && todos.length === 0
            ? "No tasks to display. Add a new one!"
            : "Search not found. Try using different tags or descriptions."}
        </Text>
      )}
      {modalVisible && (
        <OptionModal
          toggleVisibility={toggleVisibility}
          modalVisible={modalVisible}
          selectedTodo={selectedTodo}
        />
      )}
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.background || "#fff",
    },
    card: {
      backgroundColor: theme?.cardBackground || "#f8f8f8",
      marginVertical: 8,
      borderRadius: 8,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    pressedCard: {
      transform: [{ scale: 0.95 }],
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme?.text || "#000",
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: theme?.textSecondary || "#555",
      marginBottom: 8,
    },
    tagContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 8,
    },
    tag: {
      backgroundColor: theme?.tagBackground || "#e0e0e0",
      color: theme?.tagText || "#000",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 4,
      marginTop: 8,
      fontSize: 12,
    },
    date: {
      fontSize: 12,
      color: theme?.textSecondary || "#555",
      textAlign: "right",
    },
    emptyText: {
      fontSize: 16,
      color: theme?.textSecondary || "#555",
      textAlign: "center",
      marginTop: 20,
    },
  });

export default TodoList;
