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
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
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
    <Pressable
      style={({ pressed }) => [style.card, pressed && style.pressedCard]}
      onPress={() => handlePress(item.id)}
      onLongPress={() => handleLongPress(item)}
    >
      <Text style={style.title}>{item.title}</Text>
      <Text style={style.description}>
        {item.description.length > 50
          ? `${item.description.substring(0, 50)}...`
          : item.description}
      </Text>
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
    </Pressable>
  );

  return (
    <View style={style.container}>
      {todos ? (
        <Animated.FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
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
        <Text style={style.emptyText}>Search not found. Can you try searching with tags or description?</Text>
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
      backgroundColor: theme.background,
    },
    card: {
      backgroundColor: theme.cardBackground,
      marginVertical: 8,
      borderRadius: 8,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    pressedCard: {
      transform: [{ scale: 0.95 }],
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 8,
    },
    tagContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 8,
    },
    tag: {
      backgroundColor: theme.tagBackground,
      color: theme.tagText,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 4,
      marginTop: 8,
      fontSize: 12,
    },
    date: {
      fontSize: 12,
      color: theme.textSecondary,
      textAlign: "right",
    },
    emptyText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 20,
    },
  });

export default TodoList;
