import React, { useState, useContext } from 'react';
import { Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity  } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TodosContext } from '../contexts/TodosContext';

const Todo = (props) => {
  return (
    <View style={styles.flexAway}>
      <View style={styles.flexContainer}>
        <TouchableOpacity style={styles.tickBox}></TouchableOpacity>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <TouchableOpacity 
        onPress={() => props.whenXisClicked(props.id)}>
          <Text style={styles.closeX}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const formattedToday = () => {
  const date = new Date();
  return date.toISOString().substring(0, 10);
}

export default function CalendarScreen() {

  const [daysMarked, setDaysMarked] = useState();
  const [newTodoItemText, setNewTodoItemText] = useState("");
  const todayInISOString = formattedToday();
  const { todos, addNewTodo } = useContext(TodosContext);

  const addTodoItemToList = () => {

    if (newTodoItemText === null || newTodoItemText === ""){
      return false;
    }

    addNewTodo(newTodoItemText, todayInISOString);
    console.log(todos);
    setNewTodoItemText("");
  }

  const removeTodo = (id) => {
    console.log(`Removing todo item with id ${id}`);
  }

  return (
    <ScrollView style={styles.overallBackground}>
      <Calendar
        onDayPress={(day) => {
          const selectedDay = { [day.dateString]: {selected: true, selectedColor: '#FE724C'} }
          setDaysMarked({...selectedDay});
        }}
        markedDates={daysMarked}
        theme={{
          arrowColor: '#FE724C',
          monthTextColor: '#323643',
          textDayFontFamily: 'SofiaProRegular',
          textMonthFontFamily: 'SofiaProMedium',
          textMonthFontWeight: '600',
        }}
        style={styles.calendarStyle}
      />
      <View>
        <Text style={styles.titleStyle}>ToDo List</Text>
        <View style={styles.boxWrap}>
          { todos.map((todoItem, index) => {
            return <Todo key={index} text={todoItem.title} id={todoItem.id} whenXisClicked={removeTodo}/>
          }) }
          <TextInput 
            style={styles.input}
            placeholder={'Write something to do'}
            onSubmitEditing={ () => addTodoItemToList() } 
            value={newTodoItemText} 
            onChangeText={(text) => setNewTodoItemText(text)}
          />
        </View>

        <KeyboardAvoidingView
          behavior = {Platform.OS === "ios" ? "padding" : "height"}
          style = {styles.writeTaskWrapper}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginLeft: 32,
  },

  overallBackground: {
    backgroundColor: "white"
  },

  calendarStyle: {
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    paddingBottom: 30,
    paddingTop: 10,
    borderRadius: 27,
    shadowColor: '#989799',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },

  boxWrap: {
    minWidth: 360,
    minHeight: 210,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: '#989799',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    padding: 15,

  },

  titleStyle: {
    marginLeft: 32,
    fontWeight: "600",
    fontSize: 28,
    fontFamily: 'SofiaProSemiBold',
    marginBottom: 20,
  },
  font: {
    fontFamily: 'SofiaProMedium',
  },
  flexContainer: {
    display: "flex",
    flexDirection: 'row',
},

tickBox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: "#858992"
},

itemText: {
    fontFamily: "SofiaProRegular",
    fontSize: 16,
    color: "#858992",
    lineHeight: 18,
    paddingTop: 4,
    paddingLeft: 5,
    width: '85%',
},

closeX: {
    fontFamily: "SofiaProRegular",
    fontSize: 16,
    color: "#858992",
    lineHeight: 18,
    paddingTop: 4,
    paddingLeft: 5,
},

flexAway: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
    // maxWidth: 300,
    marginBottom: 16,
}
  
});