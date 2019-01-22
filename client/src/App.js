import React, { Component } from "react";
import BountyMarket from "./contracts/BountyMarket.json";
import getWeb3 from "./utils/getWeb3";
import CreateBounty from './components/CreateBounty';
import DisplayBounties from './components/DisplayBounties';

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
  }

  componentDidMount = async () => {
    try {
      console.log('this.state.instance1', this.state.instance)
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BountyMarket.networks[networkId];
      const initialBountyinstance = new web3.eth.Contract(BountyMarket.abi,deployedNetwork && deployedNetwork.address,);
      this.setState({ instance: initialBountyinstance, web3: web3, ownerAddress: accounts[0]})
      console.log('this.state', this.state)
      console.log('this.state.instance.createBounty', this.state.instance._address )
      console.log('componentDidMount')
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  async handleDocClick(event) {
  event.preventDefault();
  let rawBountyIds = await this.state.instance.getBountyByOwnerAddress(this.state.ownerAddress, {from: this.state.ownerAddress})
  let myBountyIds = await rawBountyIds.map(bignum => bignum.toNumber())
  this.setState({myBountyIds: myBountyIds})
}

  render() {
    console.log('this.state.instance', this.state.instance)
     return (
       <div>
         <CreateBounty id={this.state.id} instance={this.state.instance} ownerAddress={this.state.ownerAddress}/>

         <br/>
        {this.state.myBountyIds.map((bountyId, index) =>
          <DisplayBounties id={bountyId} instance={this.state.instance}/>
        )}
         // <Button class="btn waves-effect waves-light" type="submit" name="action" value="Button" onClick={this.handleClick}>See My Prescriptions</Button>
         // <br/>
         // <br/>
         // <Button class="btn waves-effect waves-light" type="submit" name="action" value="Button" onClick={this.handleDocClick}>My created Prescriptions</Button>
         </div>

     )
  }


}

export default App;
  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();
  //
  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();
  //
  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = SimpleStorageContract.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       SimpleStorageContract.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );
  //
  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };
  //
  // runExample = async () => {
  //   const { accounts, contract } = this.state;
  //
  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });
  //
  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();
  //
  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };
  //
  // render() {
  //   if (!this.state.web3) {
  //     return <div>Loading Web3, accounts, and contract...</div>;
  //   }
  //   return (
  //     <div className="App">
  //       <h1>Good to Go!</h1>
  //       <p>Your Truffle Box is installed and ready.</p>
  //       <h2>Smart Contract Example</h2>
  //       <p>
  //         If your contracts compiled and migrated successfully, below will show
  //         a stored value of 5 (by default).
  //       </p>
  //       <p>
  //         Try changing the value stored on <strong>line 40</strong> of App.js.
  //       </p>
  //       <div>The stored value is: {this.state.storageValue}</div>
  //     </div>
  //   );
  // }
