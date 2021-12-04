// force the state to clear with fast refresh in Expo
// @refresh reset
import React, {useEffect} from 'react';

import {database} from '../database'

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        await database.dropDatabaseTablesAsync()
        await database.setupDatabaseAsync()

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
}