# Avoid Common Attacks

### Circuit breaker
A future feature for the app would be to implement a circuit breaker in case of emergencies. This was not implemented due to limited time but will be implemented in the future.

### Integer overflow and underflow
A future feature for the app would be to implement SafeMath.sol from the OpenZepplin library for reward values, which currently is being converted to ETH by using  ```Web3.utils.toWei```. Currently, the contract is checking the balance of the bounty owner in the ```approveAndTransfer``` function, but this is not fool proof because one can call the transaction with an amount of ETH that is lower than the reward. An account can have lots of ETH, but msg.value can be too low. To improve this, ```msg.value``` should be first checked in the modifier before it reaches the ```approveAndTransfer``` function. This security vulnerability in the contract will be improved in future versions of the contract.


### Logic bugs
Throughout the contract, logic bugs are mitigated through good coding practices and rigorous testing with unit tests. Future feathers would be to create more unit tests so there would be at least one test for each function called in the contract. Using battle tested code where possible, e.g. from battle tested libraries like OpenZepplin, is good practice to ensure logic bugs are minimised.

### Prevent re-entrancy
Steps have been taken to prevent re-entrancy in the contract. Use of address.transfer() instead of address.send()
The contract makes use of ```.address.transfer()``` in the contract function ```approveAndTransfer``` instead of ```address.send()```. This is a safer way of implementing transactions.
