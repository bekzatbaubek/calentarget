import React, { useState, useContext } from 'react';
import { Text, Button, TextInput, View, ScrollView } from 'react-native';
import { TargetsContext } from '../contexts/TargetsContext'

const singleTarget = (target, index) => {
  return <View key={index}>
    <Text style={{ fontFamily: 'SofiaProRegular', fontSize: 32 }}>{target.title}</Text>
    <Text style={{ fontSize: 32 }}>{"🎓".repeat(target.pending)}</Text>
  </View>
}

export default function Target() {

  const { targets, addNewTarget } = useContext(TargetsContext);
  const [newTargetText, setNewTargetText] = useState("");
  const [newTargetNumber, setNewTargetNumber] = useState(3);

  const insertTarget = (title, pending) => {
    if (title === "" || title === "") {
      return false;
    }
    addNewTarget(title, pending)
  }

  return (
    <ScrollView>
      {targets.map((target, index) => singleTarget(target, index))}
      <TextInput
        onChangeText={(text) => setNewTargetText(text)}
        style={{ borderWidth: 1, width: 100 }}/>
      <Button
        onPress={() => insertTarget(newTargetText, newTargetNumber)}
        title="Add a target"/>
    </ScrollView>
  );
}