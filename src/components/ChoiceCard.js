import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Parser from 'html-react-parser';

const styles = {
  card: {
    minWidth: 275,
    height: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  'card-block': {
    display: 'flex',
    'flex-direction': 'column',
  },
  'card.card-footer': {
    'align-self': 'flex-end',
    flex: '1 1 auto',
  }
};

function ChoiceCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}
    onClick={() => {props.onClick()}}
    raised={!props.picked}
    style={{backgroundColor: props.picked === false ? 'white' : 'lime'}}>
      <CardContent>
        <Typography component="div">
          {Parser(props.cardText)}
        </Typography>
      </CardContent>
    </Card>
  );
}

ChoiceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChoiceCard);
