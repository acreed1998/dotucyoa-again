import React, { Component } from "react";
import NoChoiceCard from '../components/NoChoiceCard';
import ChoiceCard from '../components/ChoiceCard';
import _ from 'lodash';
import GridItem from '@material-ui/core/Grid';

export default class Special extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.changeSpecial.bind(this);
  }

  changeSpecial(userSpecial) {
    // const twoSpecials = _.includes(_.map(this.props.user.boons, boon => boon.name), 'The Chosen One');
    const twoSpecials = _.includes(_.map(this.props.user.boons, boon => boon.name), 'The Chosen One');
    const specials = this.props.user.special;
    console.log(twoSpecials, userSpecial);
    if (_.includes(specials, userSpecial)) {
      this.props.changeSpecial(_.filter(specials, special => special !== userSpecial));
    } else {
      if (twoSpecials === true && specials.length < 2) {
        specials.push(userSpecial);
        this.props.changeSpecial(specials);
      } else if (twoSpecials === false && specials.length < 1) {
        specials.push(userSpecial);
        this.props.changeSpecial(specials);
      } else if (twoSpecials === false && specials.length === 1) {
        specials[0] = userSpecial;
        this.props.changeSpecial(specials);
      }
    }
  }

  render() {
    return(
      <div>
        <NoChoiceCard cardText={this.props.special.opening}/>
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.special.choices, (choice, index) => {
            return (
              <GridItem key={`special-grid-${index}`} item xs>
                <ChoiceCard
                cardText={choice.text}
                special={index}
                changeSpecial={this.props.changeSpecial}
                picked={_.includes(this.props.user.special, choice)}
                onClick={() => { this.changeSpecial(choice) }}/>
              </GridItem>
            );
          })}
        </GridItem>
      </div>
    );
  }
}

