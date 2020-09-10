import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import electionsConfig from '../electionsConfig'

import birimdik from './Биримдик.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})); 

class Parties extends React.Component {

    constructor(props) {
        super(props);

        let defaultState = {}

        defaultState.percentsLeft=100
        defaultState.againstAllReached = false

        let parties = {}
        electionsConfig.parties.map((value) => {

            let partyInfo = {}

            partyInfo.voteResult = 0
            partyInfo.parlamentResultChairs = 0
            partyInfo.parlamentResultPercents = 0
            partyInfo.message = ''

            parties[value]=partyInfo
        })

        defaultState.parties = parties

        this.state = defaultState;
      }    

    voteNumberOnChange = (event) => {
        console.log(event.target.id)

        const party = event.target.id
        const parties = {...this.state.parties}  
        parties[party].voteResult = Number(event.target.value)

        this.setState( {parties: parties} )

        console.log(parties)
        console.log(this.state)

        //Percents left
        this.calculateResults(party)
    }

    calculateResults = (changedParty) => {

        let percentSum = 0
        let totalPassedParlamentPercent = 0

        Object.keys(this.state.parties).map((party) => {
            console.log(party)

            let voteResult = this.state.parties[party].voteResult
            percentSum = percentSum + voteResult

            if (voteResult > electionsConfig.cutoff){
                totalPassedParlamentPercent = totalPassedParlamentPercent + voteResult     
            }

         })     
         
        let percentsLeft = 100 - percentSum
        this.setState( {percentsLeft: percentsLeft} )

        const parties = {...this.state.parties} 

        if (percentsLeft == 0) {                     

            //this.setState( {parties: parties} )
            Object.keys(this.state.parties).map((party) => {
                console.log(party)
    
                let voteResult = this.state.parties[party].voteResult
                percentSum = percentSum + voteResult
    

                let parlamentResultPercents = 0  
                let parlamentResultChairs = 0 
                let message = electionsConfig.cutoff_message + ' ' + electionsConfig.cutoff + '%'

                if (voteResult > electionsConfig.cutoff){
                    parlamentResultPercents = voteResult * 100 / totalPassedParlamentPercent  
                    parlamentResultChairs = electionsConfig.totalChairs * parlamentResultPercents / 100 
                    message = ''
                } 

                parties[party].parlamentResultPercents = parlamentResultPercents
                //parties[party].parlamentResultChairs = Math.round(parlamentResultChairs)
                parties[party].parlamentResultChairs = Number(parlamentResultChairs).toFixed(1)
                parties[party].message = message
            })             
        } else {
            
            this.setState( {parties: parties} )
            Object.keys(this.state.parties).map((party) => {
                console.log(party)

                parties[party].parlamentResultPercents = 0
                parties[party].parlamentResultChairs = 0
                parties[party].message = ''
            })             
        }  

        //Против всех
        if (parties['Против всех'].parlamentResultPercents < electionsConfig.against_all_cutoff && (percentsLeft == 0))  {
            parties['Против всех'].message = electionsConfig.against_all_message   
            this.setState( {againstAllReached: false} ) 
        } else {
            parties['Против всех'].message = ''
            this.setState( {againstAllReached: true} )
        }
        
        this.setState( {parties: parties} )
    }

    render() {

        const isAgainstAllReached = this.state.againstAllReached;

        return (
            <div> 
                <div>Осталось распределить: {this.state.percentsLeft}</div>  

                <b>{isAgainstAllReached ? electionsConfig.against_all_reached_message : ''}</b>

                <List dense className={'Parties'}>
                {electionsConfig.parties.map((value) => {
                    const labelId = `label-${value}`;
                    return (
                    <ListItem key={value} button>
                        <ListItemAvatar>
                        <Avatar
                            //alt={`Avatar n°${value}`}
                            src={birimdik}
                            variant="square"
                        />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={value} />
                        
                        <TextField  
                            id={value} 
                            type ='number'                            
                            onChange={this.voteNumberOnChange}
                            label="Процент голосов" 
                            variant="outlined" /> 

                        <TextField  
                            id={value} 
                            value={this.state.parties[value].parlamentResultChairs}
                            disabled={true}
                            onChange={this.voteNumberOnChange}
                            label="Мест в парламенте" 
                            variant="outlined" /> 

                        <div>{this.state.parties[value].message}</div>

                    </ListItem>
                    );
                })}
                </List>                       
            </div>
          );
        }
    }    

export default Parties