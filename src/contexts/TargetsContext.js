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
  const [targetForPomodoro, setTargetForPM] = useState(null);

  useEffect(() => {
    refreshTargets()
  }, [] )

  const addNewTarget = (title, pending) => {
    return database.insertTarget(title, pending, refreshTargets)
  };

  const updateTarget = (id, newPending) => {
    return database.completeTarget(id, newPending, refreshTargets);
  }

  const refreshSelectedTarget = (id) => {
    setTargetForPM(targets.find(elem => elem.id === id))
  }

  const refreshTargets = () =>  {
    refreshSelectedTarget();
    return database.getTargets(setTargets)
  }

  const selectTargetForPomodoro = (target) => {
    setTargetForPM(target);
  }

  // Make the context object:
  const targetsContext = {
    targets,
    addNewTarget,
    targetForPomodoro,
    selectTargetForPomodoro,
    updateTarget,
  };

  // pass the value in provider and return
  return <TargetsContext.Provider value={targetsContext}>{children}</TargetsContext.Provider>;
};