import React, { useState } from 'react';
import { Text, Button, View, TextInput, StyleSheet  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';




export default function CalendarScreen() {

  const [daysMarked, setDaysMarked] = useState();

  return (
    <SafeAreaView >
      <Calendar
        onDayPress={(day) => {
          console.log('selected day', day.dateString)
          const selectedDay = {...daysMarked, ...{[day.dateString]: {selected: true, selectedColor: '#FE724C'}}}
          setDaysMarked(selectedDay)
          console.log(daysMarked);
        }}
        markedDates={
          daysMarked
        }
      ></Calendar>

    <View>
      <Text>ToDo List</Text>
      <TextInput
        style={styles.input}
      />

      <Text>Target</Text>

    </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    shadowColor:'black',
    shadowOffset: {
      width: 6,
      height: 10
    },
    shadowOpacity: 80,
    shadowRadius: 4
  },
});