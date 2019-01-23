import React, { Component } from "react";
import BountyMarket from "./contracts/BountyMarket.json";
import getWeb3 from "./utils/getWeb3";
import CreateBounty from './components/CreateBounty';
// import DisplayBounties from './components/DisplayBounties';

import {Button} from 'react-materialize';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      title: "",
      description: "",
      price: "",
      ownerAddress: "",
      accepted: false,
      instance: null,
      web3: null,
      accounts: null,
      contract: null,
      myBountyIds: []
    }
    this.handleDocClick = this.handleDocClick.bind(this);

  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BountyMarket.networks[networkId];
      const initialBountyinstance = new web3.eth.Contract(BountyMarket.abi,deployedNetwork && deployedNetwork.address,);
      this.setState({ instance: initialBountyinstance, web3: web3, ownerAddress: accounts[0]})
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  async handleDocClick(event) {
    event.preventDefault();
    console.log('hello handleDocClick')
    console.log('handleDocClick this.state.instance', this.state.instance)
    console.log('this.state.ownerAddress', this.state.ownerAddress)
    let rawBountyIds = await this.state.instance.methods.getBountyByOwnerAddress(this.state.ownerAddress).send({from: this.state.ownerAddress})

    console.log('rawBountyIds', rawBountyIds)
    // let myBountyIds = rawBountyIds.map(bignum => bignum.toNumber())
    // console.log('myBountyIds', myBountyIds)
    this.setState({myBountyIds: rawBountyIds})
    console.log('this.state', this.state)
  }

  render() {
    console.log('render. this.state.instance', this.state.instance)
     return (
       <div>
         <CreateBounty id={this.state.id} instance={this.state.instance} ownerAddress={this.state.ownerAddress}/>
         <br/>
         <Button class="btn waves-effect waves-light" type="submit" name="action" value="Button" onClick={this.handleDocClick}>My created Bounties</Button>
         </div>
     )
  }
}

export default App;
