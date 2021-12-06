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

const getTodos = (setTodosFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from todos',
        [],
        (_, { rows: { _array } }) => {
          setTodosFunc(_array)
        }
      );
    },
    (t, error) => { console.log("db error load todos"); console.log(error) },
    (_t, _success) => { console.log("loaded todos")}
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

const completeTarget = (id, newPending, successFunc) => {
  db.transaction( tx => {
    tx.executeSql( 'update targets set pending=? where id=?', [newPending, id] );
  },
  (t, error) => { console.log("db error completeTarget"); console.log(error);},
  (t, success) => { successFunc() }
)
}

const insertTodo = (title, createdDate, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into todos (title, createdDate, completed) values (?, ?, 0)', [title, createdDate] );
    },
    (t, error) => { console.log("db error insertTodo"); console.log(error);},
    (t, success) => { successFunc() }
  )
}

const deleteTodo = (id, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'delete from todos where id=?', [id] );
    },
    (t, error) => { console.log("db error deleteTodo"); console.log(error);},
    (t, success) => { successFunc() }
  )
}

const completeTodo = (id, successFunc) => {
  db.transaction( tx => {
    tx.executeSql( 'update todos set completed=1 where id=?', [id] );
  },
  (t, error) => { console.log("db error completeTodo"); console.log(error);},
  (t, success) => { successFunc() }
)
}

const dropDatabaseTablesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql('drop table targets');
        tx.executeSql('drop table todos');
        },
        (_, result) => { resolve(result) },
        (_, error) => { console.log("error dropping targets table: " + error); reject(error) },
      )
    })
}

const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          "create table if not exists targets (id integer primary key not null, title text, pending int, completed int);"
        );
        tx.executeSql(
          "create table if not exists todos (id integer primary key not null, title text, createdDate text, completed int);"
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
  completeTarget,
  getTodos,
  insertTodo,
  deleteTodo,
  completeTodo,
  setupDatabaseAsync,
  dropDatabaseTablesAsync,
}