import React, { useState } from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';
import pinIcon from '../assets/pin.png';
import unpinIcon from '../assets/unpin.png';

const TodoItem = ({ todo, toggleTodo, editTodo, deleteTodo, togglePin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleEdit = () => {
    setEditedText(todo.text);
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (editedText.trim() !== '') {
      editTodo(todo.id, editedText.trim());
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handlePin = () => {
    togglePin(todo.id);
  };

  return (
    <View style={styles.container}>
      {!isEditing && (
        <TouchableOpacity onPress={handleToggle}>
          <Text style={todo.completed ? styles.completedText : styles.text}>
            {todo.text}
          </Text>
        </TouchableOpacity>
      )}
      {isEditing && (
        <View style={styles.editContainer}>
          <TextInput
            value={editedText}
            onChangeText={setEditedText}
            autoFocus
            onBlur={handleSave}
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleEdit}>
          <Image source={editIcon} style={[styles.buttonImage, styles.editIcon]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Image source={deleteIcon} style={[styles.buttonImage, styles.deleteIcon]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePin}>
          <Image source={todo.pinned ? unpinIcon : pinIcon} style={[styles.buttonImage, styles.pinIcon]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonImage: {
    width: 16, // Set the desired width for your images
    height: 16, // Set the desired height for your images
    marginHorizontal: 5, // Adjust the spacing between buttons if needed
  },
  editContainer: {
    flex: 1,
  },
  deleteIcon: {
    tintColor: 'red',
  },
  editIcon: {
    tintColor: 'green',
  },
  pinIcon: {
    tintColor: 'blue',
  },
});

export default TodoItem;
