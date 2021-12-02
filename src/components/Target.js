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
    <Text>{"🎓".repeat(target.pending)}</Text>
  </View>
}

export default function Target() {

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists targets (id integer primary key not null, title text, pending int, completed int);"
      );
    });
  }, []);

  const [targets, setTargets] = useState([]);
  const [newTargetText, setNewTargetText] = useState("");
  const [newTargetNumber, setNewTargetNumber] = useState(1);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  const updateTargetsFromDB = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from targets;`,
        [],
        (_, { rows: { _array } }) => setTargets(_array)
      );
    });
  }

  const addNewTargetToDB = (newTargetText, newTargetPending) => {
    if (newTargetText === "" || newTargetText === null) {
      return false;
    }
    if (newTargetPending === undefined || newTargetPending === null) {
      return false;
    }
    console.log(`Adding ${newTargetText} to the database`);

    db.transaction(
      (tx) => {
        tx.executeSql("insert into targets (title, pending, completed) values (?, ?, 0)", [newTargetText, newTargetPending]);
        tx.executeSql("select * from targets", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );

    updateTargetsFromDB();
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
    updateTargetsFromDB();
  }

  return (
    <View>
      <FlatList
        data={targets}
        renderItem={({item}) => singleTarget(item)}
        keyExtractor={(item, index) => index}
      />
      <TextInput
        onChangeText={(text) => setNewTargetText(text)}
        style={{ borderWidth: 1, width: 100 }}/>
      <Button
        onPress={() => addNewTargetToDB(newTargetText, newTargetNumber)}
        title="Add a target"/>
      <Button
        onPress={() => dropTable()}
        title="Clean DB"/>
    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}