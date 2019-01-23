import React from 'react';
import {Button, CardPanel, Collection, CollectionItem} from 'react-materialize';

export default class DisplayBounties extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "Not real title",
      description: "",
      price: 12,
      // ownerAddress: "",
      accepted: false
    }
  }

  async componentDidMount() {
    let bounty = await this.props.instance.methods.getBountyById(this.props.id).call({from: this.props.ownerAddress});
    console.log('bounty', bounty);
  }

  render(props) {
    return(
      <div>
      <h3>Display Created Bounties</h3>
      </div>
    )
  }
}
