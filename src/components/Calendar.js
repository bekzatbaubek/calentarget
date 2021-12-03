import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

export default function CalendarScreen() {

  const [daysMarked, setDaysMarked] = useState();

  return (
    <SafeAreaView style={styles.overallBackground}>
      <ScrollView>
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
            <TextInput style={styles.input} />
          </View>

          <Text style={styles.titleStyle}>Target</Text>
          <View style={styles.boxWrap}>
            <TextInput style={styles.input} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#858992',
    padding: 10,
    // shadowColor:'black',
    // shadowOffset: {
    //   width: 6,
    //   height: 10
    // },
    // shadowOpacity: 80,
    // shadowRadius: 4,
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

  },

  titleStyle: {
    marginLeft: 32,
    fontWeight: "600",
    fontSize: 28,
    marginBottom: 20,
  }
  // font: {
  //   fontFamily: 'SofiaProMedium',
  // }
});