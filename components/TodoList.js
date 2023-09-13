import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const loadSavedData = async () => {
      const savedTodos = await getData('todos');
      if (savedTodos) {
        setTodos(savedTodos);
        setNextId(getNextId(savedTodos));
      }
    };
    loadSavedData();
  }, []);

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      alert(`Error retrieving data: ${error.message}`);
    }
  };

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      alert(`Error saving data: ${error.message}`);
    }
  };

  const getNextId = (list) => {
    if (list.length === 0) {
      return 1;
    }
    const maxId = Math.max(...list.map((todo) => todo.id));
    return maxId + 1;
  };

  const addTodo = (text) => {
    const newTodo = { id: nextId, text, completed: false, pinned: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveData('todos', updatedTodos);
    setNextId(nextId + 1);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveData('todos', updatedTodos);
  };

  const editTodo = (id, text) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo
    );
    setTodos(updatedTodos);
    saveData('todos', updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveData('todos', updatedTodos);
  };

  const togglePin = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, pinned: !todo.pinned } : todo
    );
    setTodos(updatedTodos);
    saveData('todos', updatedTodos);
  };

  const sortTodos = (todos) => {
    const pinnedTodos = todos.filter((todo) => todo.pinned);
    const unpinnedTodos = todos.filter((todo) => !todo.pinned);
    return [pinnedTodos.length > 0 ? pinnedTodos : null, unpinnedTodos.length > 0 ? unpinnedTodos : null];
  };

  const [pinnedTodos, unpinnedTodos] = sortTodos(todos);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AddTodo addTodo={addTodo} />
      {pinnedTodos && pinnedTodos.length > 0 && (
        <>
          <Text style={styles.sectionHeader}>Pinned ({pinnedTodos.length})</Text>
          {pinnedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              togglePin={togglePin}
            />
          ))}
        </>
      )}
      {unpinnedTodos && unpinnedTodos.length > 0 && (
        <>
          <Text style={styles.sectionHeader}>All ({unpinnedTodos.length})</Text>
          {unpinnedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              togglePin={togglePin}
            />
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default TodoList;
