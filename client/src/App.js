import React, { Component } from "react";
import BountyMarket from "./contracts/BountyMarket.json";
import getWeb3 from "./utils/getWeb3";
import CreateBounty from './components/CreateBounty';
import DisplayMyBounties from './components/DisplayMyBounties';
import DisplayAllBounties from './components/DisplayAllBounties';
import {Button} from 'react-materialize';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      title: "",
      description: "",
      reward: "",
      ownerAddress: "",
      accepted: false,
      instance: null,
      web3: null,
      accounts: null,
      myBountyIds: [],
      allBountyIds: []
    }
    this.myBountiesHandleClick = this.myBountiesHandleClick.bind(this);
    this.allBountiesHandleClickAll = this.allBountiesHandleClickAll.bind(this);
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

  // call contract method 'getBountyByOwnerAddress' to retrieve bounties ids by owner address and set bounty ids to state
  async myBountiesHandleClick(event) {
    event.preventDefault();
    let rawBountyIds = await this.state.instance.methods.getBountyByOwnerAddress(this.state.ownerAddress).call({from: this.state.ownerAddress})
    this.setState({myBountyIds: rawBountyIds})
    console.log('App.js myBountiesHandleClick.this.state', this.state)
  }

  // call contract method 'getBountyByOwnerAddress' to retrieve all bounties ids from bounties created.
  async allBountiesHandleClickAll(event) {
    event.preventDefault();
    this.setState({allBountyIds: [0,1,2,3,4,5]}); //testing for now, should implement method to map through each bounty in bounties[] in the future})
    console.log('allBountiesHandleClickAll.this.state', this.state)
  }

  render() {
     return (
       <div>
       <br/>
       <br/>
       <h3>Hello! Welcome to the Bounty Market.</h3>
       <h6>Your address is {this.state.ownerAddress}</h6>
       <br/>
       <br/>
       <CreateBounty id={this.state.id} instance={this.state.instance} ownerAddress={this.state.ownerAddress}/>
       <br/>
       {this.state.myBountyIds.map((BountyId) =>
          <DisplayMyBounties bountyId={BountyId} instance={this.state.instance} ownerAddress={this.state.ownerAddress}/>)}
          <Button class="btn waves-effect waves-light" type="submit" name="action" value="Button" onClick={this.myBountiesHandleClick}>My created Bounties</Button>
       <br/>
       <br/>
       {this.state.allBountyIds.map((BountyId) =>
          <DisplayAllBounties bountyId={BountyId} instance={this.state.instance} ownerAddress={this.state.ownerAddress}/>)}
          <Button class="btn waves-effect waves-light" type="submit" name="action" value="Button" onClick={this.allBountiesHandleClickAll}>Display All Bounties</Button>
       </div>
     )
  }
}


export default App;
