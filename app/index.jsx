import { useState } from "react"
import { Text, View, TextInput, Pressable, StyleSheet, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { data } from "@/data/todos"

export default function Index() {
  const [todos, setTodos] = useState(data)
  const [text, setText] = useState("")

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1
      setTodos([...todos, { id: newId, title: text.trim(), completed: false }])
      setText("")
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  const renderItem = ({ item }) => (
    <Pressable onPress={() => toggleTodo(item.id)} style={styles.todoItem}>
      <View 
        style={[
          styles.todoContainer, 
          { backgroundColor: item.completed ? "#B7E4C7" : "#FFDDC1" } 
        ]}
      >
        <Text style={[styles.todoText, item.completed && styles.completedText]}>
          {item.title}
        </Text>
        <Pressable onPress={() => deleteTodo(item.id)} style={styles.deleteButton}>
          <MaterialIcons name="delete-outline" size={24} color="#E63946" />
        </Pressable>
      </View>
    </Pressable>
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TODO APP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          placeholderTextColor="#A8DADC"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="#FFFFFF" />
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", 
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "System",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#E3F2FD", 
    color: "#2C3E50", 
    marginRight: 10,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#56CCF2", 
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flexGrow: 1,
  },
  todoItem: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  todoGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#DFF6E5", 
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    color: "#2C3E50",
    fontWeight: "500",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#8395A7",
  },
  deleteButton: {
    padding: 5,
    backgroundColor: "white", 
    borderRadius: 10,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
})
