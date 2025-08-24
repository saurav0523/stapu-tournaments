import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TournamentScreen } from './components/TournamentScreen';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <TournamentScreen />
    </>
  );
}
