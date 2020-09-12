import React from 'react';
import logo from './logo.svg';
import './App.css';

import electionsConfig from './electionsConfig'
import Parties from './components/Parties'

function App() {	
	
  return (
    <div className="App">
      
      <div>{electionsConfig.distribute_all_votes_message}</div>

      <Parties></Parties>
	
    </div>
  );
}

export default App;
