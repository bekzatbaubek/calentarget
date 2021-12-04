// force the state to clear with fast refresh in Expo
// @refresh reset

import React, { useEffect, createContext, useState } from 'react';
import {database} from '../database'

export const TargetsContext = createContext({});

export const TargetsContextProvider = props => {
  // Initial values are obtained from the props
  const {
    targets: initialTargets,
    children
  } = props;

  // Use State to store the values
  const [targets, setTargets] = useState(initialTargets);

  useEffect(() => {
    refreshTargets()
  }, [] )

  const addNewTarget = (title, pending) => {
    return database.insertTarget(title, pending, refreshTargets)
  };

  const refreshTargets = () =>  {
    return database.getTargets(setTargets)
  }

  // Make the context object:
  const targetsContext = {
    targets,
    addNewTarget
  };

  // pass the value in provider and return
  return <TargetsContext.Provider value={targetsContext}>{children}</TargetsContext.Provider>;
};