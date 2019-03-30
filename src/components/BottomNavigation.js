import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { GiBookCover } from "react-icons/gi";
import { GiRoundStar } from "react-icons/gi";
import { GiChecklist } from "react-icons/gi";

class SimpleBottomNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      sections: ['Opening', 'Special'], 
    }
  }

  handleChange = (event, value) => {
    this.props.setBottomTab(this.state.sections[value]);
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
        style={styles.stickToBottom}
      >
        <BottomNavigationAction label="Recents" icon={<GiBookCover size={'2em'} onClick={() => {console.log(this.state.value)}}/>} />
        <BottomNavigationAction label="Favorites" icon={<GiChecklist size={'2em'}/>} />
        <BottomNavigationAction label="Nearby" icon={<GiRoundStar size={'2em'}/>} />
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  root: {
    width: 500,
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
};


export default withStyles(styles)(SimpleBottomNavigation);
