import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './components/TodoList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Todo List">
        <Stack.Screen name="Todo List" component={TodoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
