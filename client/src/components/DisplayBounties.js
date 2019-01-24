import React from 'react';
import {Button, CardPanel, Collection, CollectionItem} from 'react-materialize';

export default class DisplayBounties extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "Not real title",
      description: "",
      price: 2,
      accepted: false,
      submissionIds: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    let bounty = await this.props.instance.methods.getBountyById(this.props.id).call({from: this.props.ownerAddress});
    this.setState({
      title: bounty.title,
      description: bounty.description,
      price: bounty.price,
      accepted: bounty.accepted
    })
  }

  async handleClick(event) {
    console.log("hello")
    event.preventDefault();
    let submissionIds = await this.props.instance.methods.retrieveSubmissionsIds(this.props.id).call({from: this.props.ownerAddress});
    this.setState({submissionIds: submissionIds})
    console.log("hancleClick this.state", this.state)

  }

  render(props) {
    return(
      <div>
      <CardPanel className="teal lighten-4 black-text">
      <Collection header={this.state.title}>
        <CollectionItem>{this.state.description}</CollectionItem>
        <CollectionItem>{this.state.price}</CollectionItem>
        <CollectionItem>{this.state.accepted}</CollectionItem>
        </Collection>
        <Button class="btn waves-effect waves-light" type="submit" name="action" value="Button" onClick={this.handleClick}>See Bounty Submissions</Button>

      </CardPanel>
      </div>
    )
  }
}
