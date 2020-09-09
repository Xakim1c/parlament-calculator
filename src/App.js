import React from 'react';
import logo from './logo.svg';
import './App.css';

import electionsConfig from './electionsConfig'
import Parties from './components/Parties'

const parliamentSVG = require('parliament-svg')
let parties = 
{
	"linke": {
		"seats": 64,
		"colour": "#a08"
	},
	"spd": {
		"seats": 193,
		"colour": "#e02"
	},
	"gruene": {
		"seats": 63,
		"colour": "#0b2"
	},
	"union": {
		"seats": 311,
		"colour": "#333"
	}
}

const svg = parliamentSVG(parties, true)
//console.log(JSON.stringify(svg))

//console.log(svg)

function App() {
  
  return (
    <div className="App">
      <div>{electionsConfig.distribute_all_votes_message}</div>
      <Parties></Parties>
    </div>
  );
}

export default App;
