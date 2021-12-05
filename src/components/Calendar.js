import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity  } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button } from 'react-native-elements/dist/buttons/Button';

const Todo = (props) => {
  return (
      <View style={styles.flexAway}>
          <View style={styles.flexContainer}>
              <TouchableOpacity style={styles.tickBox}></TouchableOpacity>
              <Text style={styles.itemText}>{props.text}</Text>
          </View>

          <TouchableOpacity onPress={() => props.whenXisClicked(props.index)}><Text style={styles.closeX}>X</Text></TouchableOpacity>
      </View>
  );
}

export default function CalendarScreen() {

  const [daysMarked, setDaysMarked] = useState();
  const [todo, setTodo] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  const addTodo = () => {
    setTodoItems([...todoItems, todo])
    setTodo("")
  }

  const removeTodo = (index) => {
    let itemsCopy = [...todoItems]
    itemsCopy.splice(index, 1)
    setTodoItems(itemsCopy)
  }

  return (
    <ScrollView style={styles.overallBackground}>
      <Calendar
        onDayPress={(day) => {
          console.log('selected day', day.dateString);
          const selectedDay = {
            [day.dateString]: {selected: true, selectedColor: '#FE724C'}
          }
          setDaysMarked({...daysMarked, ...selectedDay});
          console.log(daysMarked);
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
            {/* The tasks are gonna be popped here */}
            {
            todoItems.map((items, index) => {
              return <Todo key={index} text={items} index={index} whenXisClicked={removeTodo}/>
            })
            }
            {/* <Todo text={'Task test Essay 1500 words INT2035 due on Thursday'} />
            <Todo text={'Task test Essay 1500 words INT2035'} /> */}
            
            {/* Input a todo here */}
            <TextInput 
            style={styles.input}
            placeholder={'Write something to do'}
            onSubmitEditing={ () => addTodo() } 
            value={todo} 
            onChangeText={(text) => setTodo(text)}
            />
          </View>

          <Text style={styles.titleStyle}>Target</Text>
          <View style={styles.boxWrap}>
            
          </View>

          <KeyboardAvoidingView
          behavior = {Platform.OS === "ios" ? "padding" : "height"}
          style = {styles.writeTaskWrapper}
          >
          </KeyboardAvoidingView>
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