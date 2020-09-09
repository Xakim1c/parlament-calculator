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
        electionsConfig.parties.map((value) => {defaultState[value]=0})
        console.log(defaultState)

        this.state = defaultState;
      }    

    render() {
        return (
            <List dense className={'Parties'}>
              {electionsConfig.parties.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem key={value} button>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${value}`}
                        src={`/static/images/avatar/${value}.jpg`}
                      />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value} />
                    
                    <TextField id="outlined-basic" label="Процент голосов" variant="outlined" />
    
                  </ListItem>
                );
              })}
            </List>
          );
        }
    }    

export default Parties