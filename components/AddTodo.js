import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      addTodo(text.trim());
      setText('');
    }
  };

  const handleInputSubmit = () => {
    handleAddTodo();
  };

  return (
    <View>
      <TextInput
        placeholder="Add a new todo"
        value={text}
        onChangeText={(newText) => setText(newText)}
        onSubmitEditing={handleInputSubmit}
      />
      <Button title="Add" onPress={handleAddTodo} />
    </View>
  );
};

export default AddTodo;
