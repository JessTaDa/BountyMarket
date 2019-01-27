import React from 'react';
import {Button, Input} from 'react-materialize';

export default class CreateBounty extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      reward: null,
      accepted: false
    }
  }

  render(props) {
    return(
      <div>
      <h3>Create New Bounty</h3>
      <form onSubmit={async (event) => {
          event.preventDefault()
          await this.props.instance.methods.createBounty(this.state.title, this.state.description, this.state.reward, this.state.accepted).send({from: this.props.ownerAddress})
        }}>
          <Input s={12} label="Title" type="text" onChange={event => this.setState({title: event.target.value})} />
          <Input s={12} label="Description" type="text" onChange={event => this.setState({description: event.target.value})} />
          <Input s={12} label="Reward (ETH)" type="text" onChange={event => this.setState({reward: event.target.value})} />
          <Button class="btn waves-effect waves-light" type="submit" name="action">Create Bounty</Button>
        </form>
      </div>
    )
  }
}
