import React from 'react';
import {Button, CardPanel, Collection, CollectionItem, Input} from 'react-materialize';

export default class DisplayAllBounties extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "Not real title",
      description: "",
      reward: null,
      accepted: false,
      text: "blank string"
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
    console.log("trying to make submission")
    console.log("handleClick this.state", this.state)
    event.preventDefault();
    let submissionText = await this.props.instance.methods.createBountySubmission(this.props.bountyId, this.state.text).send({from: this.props.ownerAddress});
    console.log('submissionText', submissionText)
  }

  render(props) {
    return(
      <div>
      <CardPanel className="teal lighten-4 black-text">
      <Collection header={this.state.title}>
        <CollectionItem><strong>Task Description: </strong>{this.state.description}</CollectionItem>
        <CollectionItem><strong>reward (wei): </strong>{this.state.reward}</CollectionItem>
        <Input s={12} label="Type your response to bounty here" type="text" onChange={event => this.setState({text: event.target.value})} />
      </Collection>
      <Button class="btn waves-effect waves-light" type="submit" name="action" value="Button" onClick={this.handleClick}>Submit</Button>
      </CardPanel>
      </div>
    )
  }
}
