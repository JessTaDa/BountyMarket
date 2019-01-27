# Design Pattern Decisions

### Fail early and fail loud
The ```Fail early and fail loud``` design pattern is applied throughout the ```bountyMarket.sol``` contract by using require validation in modifiers. This is done to check the condition required for execution as early as possible in the function body and throws an exception if the condition is not met. This is to ensure any errors are noticed early on and to avoid unnecessary code execution.

### Pull over push payments
A future feature that would make the contract more secure would be to implement the pull over push payments design pattern to the contract (particularly for the ```approveAndTransfer``` function contract in ```BountyMarket.sol```). This would better protect the contract against re-entrancy and denial of service attacks by handling the contract with better accounting practices.

### Restricting Access
At the moment anyone can be a bounty poster and a submittor. The restricting access design pattern could be a future feature that is implemented to only allow certain addresses to create bounties. This would ensure the marketplace does not become too crowded. This feature has not been implemented at this point as we are awaiting clarification from the client about who should have access to bounty creation.
