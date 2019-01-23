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
    console.log('bounty.title', bounty.title);
    console.log('bounty.description', bounty.description);
    console.log('bounty.price', bounty.price);
    console.log('bounty.accepted', bounty.accepted);

    this.setState({
      title: bounty.title,
      description: bounty.description,
      price: bounty.price,
      accepted: bounty.accepted
    })

    console.log('display this.state', this.state)
  }

  render(props) {
    return(
      <div>
      <h3>Display Created Bounties</h3>
      <p>{this.state.title}</p>
      <p>{this.state.description}</p>
      <p>{this.state.price}</p>
      <p>{this.state.accepted}</p>
      </div>
    )
  }
}
