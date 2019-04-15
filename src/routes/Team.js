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
    this.chooseMember = this.chooseMember.bind(this);
  }

  chooseMember(teamMemberObject) {
    const user = this.props.user;
    const teammates = user.team_members;
    const points = user.points;
    if (!_.includes(user.team_members, teamMemberObject)) {
      if (points - teamMemberObject.points > -1) {
          teammates.push(teamMemberObject);
          this.props.modifyTeam(teammates);
      }
    } else {
      _.pullAt(teammates, _.indexOf(teammates, teamMemberObject));
      this.props.modifyTeam(teammates);
    }
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

