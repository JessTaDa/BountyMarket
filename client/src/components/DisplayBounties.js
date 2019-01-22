import React from 'react';
import {Button, CardPanel, Collection, CollectionItem} from 'react-materialize';

export default class DisplayBounties extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      price: 12,
      // ownerAddress: "",
      accepted: false
    }
  }

  async componentDidMount() {
    let bounty = await this.props.instance.getBountyByOwnerAddress(this.props.ownerAddress)
    console.log('bounty', bounty);
    console.log('this.state', this.state)
  }

  render(props) {
    return(
      <div>
      <h3>Display Created Bounties</h3>
      <p>{this.state.title}</p>
      </div>
    )
  }
}
