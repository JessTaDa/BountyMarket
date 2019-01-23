import React from 'react';
import {Button, CardPanel, Collection, CollectionItem} from 'react-materialize';

export default class DisplayBounties extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "Not real title",
      description: "",
      price: 2,
      accepted: false
    }
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

  render(props) {
    return(
      <div>
      <CardPanel className="teal lighten-4 black-text">
      <Collection header={this.state.title}>
        <CollectionItem>{this.state.description}</CollectionItem>
        <CollectionItem>{this.state.price}</CollectionItem>
        <CollectionItem>{this.state.accepted}</CollectionItem>
        </Collection>
      </CardPanel>
      </div>
    )
  }
}
