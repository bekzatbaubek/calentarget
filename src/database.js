import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('db.db');

const getTargets = (setTargetsFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from targets',
        [],
        (_, { rows: { _array } }) => {
          setTargetsFunc(_array)
        }
      );
    },
    (t, error) => { console.log("db error load targets"); console.log(error) },
    (_t, _success) => { console.log("loaded targets")}
  );
}

const insertTarget = (title, pending, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into targets (title, pending, completed) values (?, ?, 0)', [title, pending] );
    },
    (t, error) => { console.log("db error insertTarget"); console.log(error);},
    (t, success) => { successFunc() }
  )
}

const dropDatabaseTablesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'drop table targets',
        [],
        (_, result) => { resolve(result) },
        (_, error) => { console.log("error dropping targets table"); reject(error)
        }
      )
    })
  })
}

const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          "create table if not exists targets (id integer primary key not null, title text, pending int, completed int);"
        );
      },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
      (_, success) => { resolve(success)}
    )
  })
}


export const database = {
  getTargets,
  insertTarget,
  setupDatabaseAsync,
  dropDatabaseTablesAsync,
}