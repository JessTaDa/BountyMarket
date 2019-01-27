# Bounty Market
A simple decentralised app simulating a bounty marketplace. Here, bounties can be created with Tasks and rewards. These bounties then appear in a marketplace for all to see. Other users can view and make submissions in response to the task of each bounty. Successfully chosen submissions will be rewarded with the reward promised.

# Design Process
User stories were drafted to meet the user basic requirements for the task.

![screen shot 2019-01-27 at 10 56 01 pm](https://user-images.githubusercontent.com/17763644/51800702-1f25a180-2287-11e9-8e09-52fe2d7b0911.png)

# Installation and Setup

### Truffle
Install truffle on your device as per the docs here: http://truffleframework.com/docs. This project requires truffle v5.0.0 or above.

### Ganache
Install and run Ganache. More information on installation found [here](npm install -g ganache-cli).
The project has been created and tested using ganache desktop app on port 7545. To change this port (i.e. if you are using ganache-cli) please go to ```truffle-config.js``` in the root folder and change the port number at ```port: 7545 ```. Make sure your Ganache accounts are up an running with available ETH balances.

### Metamask
Install the Metamask Google Chrome Browser extension from [here](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) and follow instructions to set up accounts. Ensure accounts on Metamask are linked to the accounts running on Ganache and connected on the correct network.

### Launch Dapp!
You're ready to run the project! Ensure Google Chrome is open and that your are signed into metamask, with your accounts matching your ganache accounts.
1. In your terminal window, navigate to project root folder and run ```truffle compile```.
2.  Once compilation is successful, run ```truffle migrate```.
3.  Still in the root folder, install the OpenZepplin library by running ```npm install openzeppelin-solidity```
4. In the root folder, navigate to /client. From here on your command line, run ```npm install```. Then ```npm run start```. A new tab should open and you should see the following page running on ```localhost:3000```:

*Note: Your current address will always be the address displayed at the top of the page. When switching between accounts on Metamask, it is important to ensure the address is the correct one for you.*

![screen shot 2019-01-27 at 11 20 40 pm](https://user-images.githubusercontent.com/17763644/51800864-37e38680-228a-11e9-8586-9d66d848c2c6.png)

# Interacting with the Dapp
### Creating a bounty
Simply fill out the 'Create New Bounty' form with the desired title, description and reward (in ETH) you would like to offer successful submission for the bounty. When you are happy with the inputs for your new bounty, click on the 'Create Bounty' button.

A metamask modal will pop up displaying the transaction details. Check this is correct, then proceed with the transaction. Once the transaction has successfully gone through and your bounty has been created, you can view it (along with all your other created bounties) by clicking on the 'My Created Bounties' button.

### Reviewing Bounty Submissions
If the browser session is your address, you are able to view your created bounties as well as view submission other people have made on your bounties. For the submission responses you like, you can transfer the writer the bounty reward amount by clicking 'See Bounty Submissions'

![screen shot 2019-01-27 at 11 40 11 pm](https://user-images.githubusercontent.com/17763644/51801061-f4d6e280-228c-11e9-87b7-6fe71d58eb7b.png)

Clicking this will trigger another metamask modal, asking to confirm the transaction. Once the transaction succeeds, the bounty reward amount (determined during bounty creation) will be transferred from the bounty owner account to the submittor's account.

### Submitting responses to a bounty
*Note: Make sure you are logged into the right account. At the moment it is required to refresh the browser each time you want to switch between metamask accounts.*

First, click on the 'Display all bounties' button to view all available bounties in the marketplace. For each bounty there is an input field where you can write your submission and respond to the bounty.

![screen shot 2019-01-27 at 11 46 33 pm](https://user-images.githubusercontent.com/17763644/51801126-d58c8500-228d-11e9-96d0-2ee864898a39.png)

Submissions will be made under the address and account you are signed into so make sure you check that this is correct. If metamask is having issues recognising your address, refresh the browser page.

## Future features
