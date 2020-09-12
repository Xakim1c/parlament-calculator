import React from 'react';
import logo from './logo.svg';
import './App.css';

import electionsConfig from './electionsConfig'
import Parties from './components/Parties'

import ParlamentChart from './components/ParlamentChart.js'

function App() {	
	
  return (
    <div className="App">
      
      <div>{electionsConfig.distribute_all_votes_message}</div>

      <Parties></Parties>
	  <ParlamentChart></ParlamentChart>
	
		<b>FFF</b>
    </div>
  );
}

export default App;
