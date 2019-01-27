import React from 'react';
import {Button, CardPanel, Collection, CollectionItem} from 'react-materialize';
import DisplaySubmissions from './DisplaySubmissions';

export default class DisplayMyBounties extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      reward: null,
      accepted: false,
      submissionIds: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    let bounty = await this.props.instance.methods.getBountyById(this.props.bountyId).call({from: this.props.ownerAddress});
    this.setState({
      title: bounty.title,
      description: bounty.description,
      reward: bounty.reward,
      accepted: bounty.accepted
    })
  }

  async handleClick(event) {
    console.log("hello")
    event.preventDefault();
    let submissionIds = await this.props.instance.methods.retrieveSubmissionsIds(this.props.bountyId).call({from: this.props.ownerAddress});
    this.setState({submissionIds: submissionIds})
  }

  render(props) {
    return(
      <div>
      <CardPanel className="teal lighten-4 black-text">
      <Collection header={this.state.title}>
        <CollectionItem>Task Description: {this.state.description}</CollectionItem>
        <CollectionItem>Bounty Reward (wei):  {this.state.reward}</CollectionItem>
        </Collection>
        {this.state.submissionIds.map((SubmissionId) =>
           <DisplaySubmissions submissionId={SubmissionId} bountyId={this.props.bountyId} bountyReward={this.state.reward} instance={this.props.instance} ownerAddress={this.props.ownerAddress}/>)}
        <Button class="btn waves-effect waves-light" type="submit" name="action" value="Button" onClick={this.handleClick}>See Bounty Submissions</Button>
      </CardPanel>
      </div>
    )
  }
}
