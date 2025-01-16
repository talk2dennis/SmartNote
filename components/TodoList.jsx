import React, { useState, useContext } from "react";
import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import OptionModal from "./OptionModal";
import { ThemeContext } from "../context/ThemeContext";

const TodoList = ({ todos }) => {
  const { theme } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [selectedTodo, setSelectedTodo] = useState(null); // Selected item for the modal
  const style = styles(theme);
  const router = useRouter();

  // Utility function to format the creation date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  // Handle press event
  const handlePress = (id) => {
    router.push(`notes/${id}`);
  };

  // Show modal and set the selected item
  const handleLongPress = (item) => {
    setSelectedTodo(item);
    setModalVisible(true);
  };

  // Close the modal
  const toggleVisibility = () => {
    setModalVisible(false);
    setSelectedTodo(null); // Clear selected item
  };

  return (
    <View style={style.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={style.card}
            onPress={ () => handlePress(item.id)}
            onLongPress={() => handleLongPress(item)} // Open modal with item
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
            <Text style={style.date}>{ item.updatedAt ? 'Updated: ' : 'Created: '} {item.updatedAt ? formatDate(item.updatedAt) : formatDate(item.createdAt)}</Text>
          </Pressable>
        )}
      />

      {/* Single Modal Component */}
      {modalVisible && (
        <OptionModal
          toggleVisibility={toggleVisibility}
          modalVisible={modalVisible}
          selectedTodo={selectedTodo} // Pass selected item to modal
        />
      )}
    </View>
  );
};

const styles = (theme) => StyleSheet.create({
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
});

export default TodoList;
