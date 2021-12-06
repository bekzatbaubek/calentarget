import React, { useState, useContext } from 'react';
import { Text, Button, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { TargetsContext } from '../contexts/TargetsContext'

export default function Target() {

  const { targets, addNewTarget, selectTargetForPomodoro } = useContext(TargetsContext);
  const [newTargetText, setNewTargetText] = useState("");
  const [newTargetNumber, setNewTargetNumber] = useState(3);

  const singleTarget = (target, index) => {
    return <View key={index}>
      <TouchableOpacity onPress={() => selectTargetForPomodoro(target)}>
        <Text style={{ fontFamily: 'SofiaProRegular', fontSize: 32 }}>{target.title}</Text>
        <Text style={{ fontSize: 32 }}>{"🎓".repeat(target.pending)}</Text>
      </TouchableOpacity>
    </View>
  }

  const insertTarget = (title, pending) => {
    if (title === "" || title === "") {
      return false;
    }
    addNewTarget(title, pending);
    setNewTargetText("");
  }

  return (
    <ScrollView>
      {targets.filter(target => target.pending > 0).map((target, index) => singleTarget(target, index))}
      <TextInput
        value={newTargetText}
        onChangeText={(text) => setNewTargetText(text)}
        style={{ borderWidth: 1, width: 100 }}/>
      <Button
        onPress={() => insertTarget(newTargetText, newTargetNumber)}
        title="Add a target"/>
    </ScrollView>
  );
}