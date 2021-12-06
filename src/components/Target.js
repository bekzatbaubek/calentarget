import React, { useState, useContext } from 'react';
import { Text, Button, TextInput, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { TargetsContext } from '../contexts/TargetsContext'

export default function Target() {

  const { targets, addNewTarget, selectTargetForPomodoro } = useContext(TargetsContext);
  const [newTargetText, setNewTargetText] = useState("");
  const [newTargetNumber, setNewTargetNumber] = useState(3);

  const singleTarget = (target, index) => {
    return <View key={index} style={styles.singleTarget}>
      <TouchableOpacity onPress={() => selectTargetForPomodoro(target)}>
        <Text style={{ fontFamily: 'SofiaProRegular', fontSize: 20, color: "#858992" }}>{target.title}</Text>
        <Text style={{ fontSize: 25 }}>{"🎓".repeat(target.pending)}</Text>
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
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 5, paddingTop: 20}}>
          {targets.filter(target => target.pending > 0).map((target, index) => singleTarget(target, index))}
          <TextInput
            value={newTargetText}
            onChangeText={(text) => setNewTargetText(text)}
            style={ styles.input }
            placeholder={"Write something to work on"}
            />
            
        </View>
      <View style={{flex: 1, alignItems: "center"}}>
        <TouchableOpacity style={ styles.button }  onPress={() => insertTarget(newTargetText, newTargetNumber)}>
          <Text style={{color:"white", fontFamily: "SofiaProMedium"}}>Set Target</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    fontFamily: "SofiaProSemiBold",
    backgroundColor: "#FE724C",
    paddingVertical: 15,
    paddingHorizontal: 45,
    marginBottom: 50,
    borderRadius: 28,
    shadowColor: '#989799',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    maxWidth: 300,
    alignItems: "center",  
  },
  input: {
    marginHorizontal: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#D7D7D7"
  },
  singleTarget: {
    marginHorizontal: 15,
    marginBottom: 5,
  }

})

