import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Parser from 'html-react-parser';
import { Button } from '@material-ui/core';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

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

function MultiChoiceCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}
      raised={!props.picked}
      style={{ backgroundColor: props.picked === false ? 'white' : 'lime' }}>
      <CardContent>
        <Typography component="div">
          {Parser(props.cardText)}
        </Typography>
        <div style={{display: 'inline-flex', marginTop: 10}}>
          <Button onClick={props.onMinus}><FaMinus size={'1em'} /></Button>
          <Typography style={{justifyContent: 'center', alignContent: 'center', marginLeft: 5, marginRight: 5}}>{`Taken: ${props.ammountPicked}`}</Typography>
          <Button onClick={props.onPlus}><FaPlus size={'1em'} /></Button>
        </div>
      </CardContent>
    </Card>
  );
}

MultiChoiceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MultiChoiceCard);
