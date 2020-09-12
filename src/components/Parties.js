import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';

import electionsConfig from '../electionsConfig'

import birimdik from './Биримдик.svg';

import ParlamentChart from '../components/ParlamentChart'
import { Typography } from '@material-ui/core';


const styles = theme => ({
    header: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
        [theme.breakpoints.up('sm')]: {
        width: '70%',
        },
        [theme.breakpoints.up('md')]: {
        width: '50%',
        },
    },
    redLine: {
        content:'',
        position:"absolute",
        borderBottom:"solid 1px",
        top:"50%",
        color: "red",
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            width: '100%',
          },
        [theme.breakpoints.up('sm')]: {
        width: '80%',
        },
        [theme.breakpoints.up('md')]: {
        width: '70%',
        },
    }
  });

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

        const party = event.target.id
        const parties = {...this.state.parties}  
        parties[party].voteResult = Number(event.target.value)

        this.setState( {parties: parties} )

        //Percents left
        this.calculateResults(party)
    }

    calculateResults = (changedParty) => {

        let percentSum = 0
        let totalPassedParlamentPercent = 0

        Object.keys(this.state.parties).map((party) => {

            let voteResult = this.state.parties[party].voteResult
            percentSum = percentSum + voteResult

            if (voteResult > electionsConfig.cutoff && party != 'Против всех'){
                totalPassedParlamentPercent = totalPassedParlamentPercent + voteResult     
            }

         })     
         
        let percentsLeft = Number(100 - percentSum).toFixed(2)
        this.setState( {percentsLeft: percentsLeft} )

        const parties = {...this.state.parties} 

        if (percentsLeft == 0) {                     

            Object.keys(this.state.parties).map((party) => {
    
                let voteResult = this.state.parties[party].voteResult
                percentSum = percentSum + voteResult
    

                let parlamentResultPercents = 0  
                let parlamentResultChairs = 0 
                let message = electionsConfig.cutoff_message + ' ' + electionsConfig.cutoff + '%'

                if (voteResult > electionsConfig.cutoff && party != 'Против всех'){
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
            
            Object.keys(this.state.parties).map((party) => {

                //parties[party].parlamentResultPercents = 0
                parties[party].parlamentResultChairs = 0
                parties[party].message = ''
            })             
        }  

        //Против всех
        if (parties['Против всех'].voteResult < electionsConfig.against_all_cutoff)  {

            if ((percentsLeft == 0) && (parties['Против всех'].voteResult > 0)){
                parties['Против всех'].message = electionsConfig.against_all_message                    
            }else {
                parties['Против всех'].message = ''
            }
            this.setState( {againstAllReached: false} )
            
        } else {
            parties['Против всех'].message = ''
            this.setState( {againstAllReached: true} )
        }
        
        this.setState( {parties: parties} )
    }

    prepareChartData = () => {

        let chartData = []

        Object.keys(this.state.parties).map((party) => {

            
            let chairsNumber = this.state.parties[party].parlamentResultChairs

            if (Number(chairsNumber) > 0) {

                let randomColor = this.randomColor();
                let partyChartInfo = [party, parseInt(chairsNumber), randomColor, party]
                chartData.push(partyChartInfo)
            } 
                        
        })    
        console.log(chartData)
        //chartData = [['TEST', 25, '#ffbf00', 'TEST'], ['TEST', 25, '#ffbf00', 'TEST'], ['TEST', 25, '#ffbf00', 'TEST'], ['TEST', 25, '#ffbf00', 'TEST']]
        return chartData
    }

    randomColor = () => {
        let listOfColors = ['#ff4000','#ff8000','#ffbf00','#ffff00','#bfff00','#80ff00','#40ff00','#00ff00','#00ff40','#00ff80','#00ffbf','#00ffff','#00bfff','#0080ff','#0040ff','#0000ff','#4000ff','#8000ff','#bf00ff','#ff00ff','#ff00bf','#ff0080','#ff0040','#ff0000']
        return listOfColors[Math.floor(Math.random() * listOfColors.length)]
    }

    render() {

        console.log(this.state)

        const isAgainstAllReached = this.state.againstAllReached;
        const { classes } = this.props;

        //console.log(this.prepareChartData())
        return (
            <div> 
                <Grid container justify="center">
                    <Grid item className={classes.header}>
                        <Typography variant="h6">{electionsConfig.distribute_all_votes_message}</Typography>
                    </Grid>
                </Grid>
                <Typography variant="body1">Осталось распределить: {this.state.percentsLeft}</Typography>
                

                <b>{isAgainstAllReached ? electionsConfig.against_all_reached_message : ''}</b>

                <List dense className={'Parties'}>
                {electionsConfig.parties.map((value) => {
                    const labelId = `label-${value}`;
                    const disabled = this.state.parties[value].message ? true : false
                    return (
                    <Tooltip TransitionComponent={Zoom} title={disabled ? this.state.parties[value].message : "" } arrow>
                    <ListItem key={value} style={{justifyContent: "center"}} disabled={disabled}>
                        {disabled ? <Grid item className={classes.redLine}></Grid> : null}
                        <Grid item>
                            <ListItemAvatar>
                            <Avatar
                                //alt={`Avatar n°${value}`}
                                src={birimdik}
                                variant="square"
                            />
                            </ListItemAvatar>
                        </Grid>
                        <Grid item xs={5}>
                            <ListItemText id={labelId} primary={value} />
                        </Grid>
                        
                        <Grid style={{width: 90, paddingRight: 5}}>
                        <TextField  
                            id={value} 
                            type ='number'                            
                            onChange={this.voteNumberOnChange}
                            label="Процент голосов" 
                            variant="outlined"
                            fullWidth
                            inputProps={{style: {fontSize: 14}}}
                            InputLabelProps={{style: {fontSize: 14}}}
                            />
                            
                        </Grid>

                        <Grid style={{width: 80}}>
                        <TextField  
                            id={value} 
                            value={this.state.parties[value].parlamentResultChairs}
                            disabled={true}
                            onChange={this.voteNumberOnChange}
                            label="Мест в парламенте" 
                            variant="outlined"
                            fullWidth
                            inputProps={{style: {fontSize: 14}}}
                            InputLabelProps={{style: {fontSize: 14}}}
                            /> 
                        </Grid>

                        {/* <div>{this.state.parties[value].message}</div> */}
                    </ListItem>
                    </Tooltip>
                    );
                })}
                </List>

                <div>
                    {this.state.percentsLeft == 0
                        ? <ParlamentChart>chartData={this.prepareChartData()}</ParlamentChart>
                        : <b>Распределите голоса чтобы посмотреть распределение</b>
                    }
                </div>
                              
            </div>
          );
        }
    }    

export default withStyles(styles, { withTheme: true })(Parties)