pragma solidity ^0.5.0;

contract BountyMarket {

  event BountyCreated(uint _id, string _title, string _description, uint _price, address _ownerAddress, bool _accepted);
  event retrieveFromAddress(uint[] ids);

  struct Bounty {
    string title;
    string description;
    uint price;
    address ownerAddress;
    bool accepted;
  }

  Bounty[] public bounties;
  mapping (uint => address) public bountyToOwner;
  mapping (address => uint[]) public ownerToBounty;

  function createBounty(string memory _title, string memory _description, uint _price, bool _accepted) public {
    uint id = bounties.push(Bounty(_title, _description, _price, msg.sender, _accepted)) -1;
    bountyToOwner[id] = msg.sender;
    emit BountyCreated(id, _title, _description, _price, msg.sender, _accepted);
  }

  function getBountyByOwnerAddress(address ownerAddress) external returns(uint[] memory ids) {
    ids = ownerToBounty[ownerAddress];
    emit retrieveFromAddress(ids);
    return(ids);
  }
}
