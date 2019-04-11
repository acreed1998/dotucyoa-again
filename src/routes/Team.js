import React, { Component } from "react";
import NoChoiceCard from '../components/NoChoiceCard';
import ChoiceCard from '../components/ChoiceCard';
import _ from 'lodash';
import GridItem from '@material-ui/core/Grid';
// import UpgradeCard from "../components/UpgradeCard";
// import { array } from "prop-types";
// import MultiChoiceCard from '../components/MultiChoiceCard';

export default class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <NoChoiceCard cardText={this.props.team.opening} />
        <GridItem container spacing={24} justify='space-evenly'>
          {_.map(this.props.team.choices, (choice, index) => {
            return (
              <GridItem key={`team-grid-${index}`} item xs>
                <ChoiceCard
                  cardText={choice.text}
                  special={index}
                  picked={_.includes(this.props.user.team_members, choice)}
                  onClick={() => { this.chooseMember(choice) }} />
              </GridItem>
            );
          })}
        </GridItem>
      </div>
    );
  }
}

