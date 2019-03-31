import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import Card from './ChoiceCard';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function AutoGrid(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify='space-evenly'>
        {_.map(props.choices, (choice, index) => {
          return (
            <Grid item xs>
              <Card cardText={choice} special={index} changeSpecial={props.changeSpecial} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

AutoGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoGrid);
