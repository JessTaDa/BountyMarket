import React from 'react';
import {Button, Input} from 'react-materialize';

export default class CreateBounty extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      price: null,
      accepted: false
    }
  }

  render(props) {
    return(
      <div>
      <h3>Create New Bounty</h3>
      <form onSubmit={async (event) => {
          event.preventDefault()
          console.log('this.props', this.props)
          const result = await this.props.instance.methods.createBounty(this.state.title, this.state.description, this.state.price, this.state.accepted).send({from: this.props.ownerAddress})
          console.log('result', result)
        }}>
          <Input s={12} label="Title" type="text" onChange={event => this.setState({title: event.target.value})} />
          <Input s={12} label="Description" type="text" onChange={event => this.setState({description: event.target.value})} />
          <Input s={12} label="Price" type="text" onChange={event => this.setState({price: event.target.value})} />
          <Input s={12} label="Accepted by Owner?" type="text" onChange={event => this.setState({accepted: event.target.value})} />
          <Button class="btn waves-effect waves-light" type="submit" name="action">Create Bounty</Button>
        </form>
      </div>
    )
  }
}
