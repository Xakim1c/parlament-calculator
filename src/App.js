import React from 'react';
import logo from './logo.svg';
import './App.css';

import electionsConfig from './electionsConfig'
import Parties from './components/Parties'

import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useInterval } from 'react';
import { generateDataset } from 'react';
import { d3 } from 'react';

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

const Circles = () => {
	const [dataset, setDataset] = useState(
	  generateDataset()
	)
	const ref = useRef()
  
	useEffect(() => {
	  const svgElement = d3.select(ref.current)
	  svgElement.selectAll("circle")
		.data(dataset)
		.join("circle")
		  .attr("cx", d => d[0])
		  .attr("cy", d => d[1])
		  .attr("r",  3)
	}, [dataset])
  
	useInterval(() => {
	  const newDataset = generateDataset()
	  setDataset(newDataset)
	}, 2000)
  
	return (
	  <svg
		viewBox="0 0 100 50"
		ref={ref}
	  />
	)
  }

const svg = parliamentSVG(parties, true)
console.log(JSON.stringify(svg))

console.log(svg)

function App() {
  
  return (
    <div className="App">
      
      <div>{electionsConfig.distribute_all_votes_message}</div>

      <Parties></Parties>
    </div>
  );
}

export default App;
