import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import _ from 'lodash';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class ChoicesModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.choicesModalOpen}
        onBackdropClick={this.props.onClose}
        onClose={this.props.onClose}
      >
        <Grid className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            {`Special: ${_.map(this.props.user.special, specialObject => specialObject.special).join(', ')}`}
          </Typography>
          <Typography variant="h6" id="modal-title2">
            {`Race: ${_.map(this.props.user.race, raceObject => raceObject.race).join(', ')}`}
          </Typography>
          <Typography variant="h6" id="modal-title3">
            {`Armor: ${_.map(this.props.user.armor, armorObject => armorObject.type).join(', ')}`}
          </Typography>
          <Typography variant="h6" id="modal-title3">
            {`Ship: ${this.props.user.ship.type}`}
          </Typography>
        </Grid>
      </Modal>
    );
  }
}

ChoicesModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const ChoicesModalWrapped = withStyles(styles)(ChoicesModal);

export default ChoicesModalWrapped;
