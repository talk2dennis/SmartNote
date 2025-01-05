import React, { useState, useContext } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { ThemeContext } from "../context/ThemeContext";


const TodoList = ({ todos }) => {
  const { colorScheme, theme } = useContext(ThemeContext);
  const style = styles(theme);

  // Utility function to format the creation date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <View style={style.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={style.card}>
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
            <Text style={style.date}>Created: {formatDate(item.createdAt)}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = (theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      marginBottom: 40,
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
      marginBottom: 4,
      fontSize: 12,
    },
    date: {
      fontSize: 12,
      color: theme.textSecondary,
      textAlign: "right",
    },
  });

export default TodoList;
