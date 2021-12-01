import React, { useState } from 'react';
import { FlatList, Text, Button, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const singleTarget = (target) => {
  return <View>
    <Text>{target.title}</Text>
    <Text>{"🎓".repeat(target.numberOfTargets)}</Text>
  </View>
}

const stubTargets = [
  {
    title: "University",
    numberOfTargets: 3
  },
  {
    title: "Personal",
    numberOfTargets: 4
  },
  {
    title: "Whatever",
    numberOfTargets: 5
  },
]

export default function Target() {

  const [targets, setTargets] = useState(stubTargets);

  return (
    <SafeAreaView  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={targets}
        renderItem={({item}) =>
          singleTarget(item)
        }
        keyExtractor={(item, index) => index}
      />
      <TextInput style={{ borderWidth: 1, width: 100 }}/>
      <Button title="Add a target"/>
    </SafeAreaView >
  );
}