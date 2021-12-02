import React, { useState } from 'react';
import { FlatList, Text, Button, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

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

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists targets (id integer primary key not null, title text, pending int, completed int);"
      );
    });
  }, []);

  const [targets, setTargets] = useState(stubTargets);
  const [newTargetText, setNewTargetText] = useState("");
  const [newTargetNumber, setNewTargetNumber] = useState(1);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  const addNewTargetToDB = (newTargetText) => {
    if (newTargetText === "" || newTargetText === null) {
      return false;
    }
    console.log(`Adding ${newTargetText} to the database`);

    db.transaction(
      (tx) => {
        tx.executeSql("insert into targets (title, pending, completed) values (?, 1, 0)", [newTargetText]);
        tx.executeSql("select * from targets", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  }

  const dropTable = () => {
    console.log("Dropping db...");
    db.transaction(
      (tx) => {
        tx.executeSql("drop table targets", []);
        console.log("DB table drop successful");
        tx.executeSql(
          "create table if not exists targets (id integer primary key not null, title text, pending int, completed int);"
        );
      },
      null,
      forceUpdate
    );
  }

  return (
    <SafeAreaView  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={targets}
        renderItem={({item}) =>
          singleTarget(item)
        }
        keyExtractor={(item, index) => index}
      />
      <TextInput
        onChangeText={(text) => setNewTargetText(text)}
        style={{ borderWidth: 1, width: 100 }}/>
      <Button
        onPress={() => addNewTargetToDB(newTargetText)}
        title="Add a target"/>
      <Button
        onPress={() => dropTable()}
        title="Clean DB"/>
    </SafeAreaView >
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}