pragma solidity ^0.5.0;

contract BountyMarket {

  event BountyCreated(uint _id, string _title, string _description, uint _price, address _ownerAddress, bool _accepted);

  event SubmissionCreated(uint _bountyId, address submittorAddress, uint submissionId, string _text);

  struct Bounty {
    string title;
    string description;
    uint price;
    address ownerAddress;
    bool accepted;
  }

  struct Submission {
    bool accepted;
    string text;
    address submittorAddress;
  }

  Bounty[] public bounties;
  Submission[] public submissions;
  mapping (uint => address) public bountyToOwner;
  mapping (address => uint[]) public ownerToBounty;
  mapping (uint => uint[]) public bountyIdToSubmissionIds;

  function createBounty(string memory _title, string memory _description, uint _price, bool _accepted) public {
    uint id = bounties.push(Bounty(_title, _description, _price, msg.sender, _accepted)) -1;
    bountyToOwner[id] = msg.sender;
    ownerToBounty[msg.sender].push(id);
    emit BountyCreated(id, _title, _description, _price, msg.sender, _accepted);
  }

  function createBountySubmission(uint _bountyId, string memory _text) public {
    uint submissionId = submissions.push(Submission(false, _text, msg.sender)) -1;
    bountyIdToSubmissionIds[_bountyId].push(submissionId);
    emit SubmissionCreated(_bountyId, msg.sender, submissionId, _text);
  }

  function retrieveSubmissionsIds(uint _bountyId) external view returns (uint[] memory _submissionIds) {
    return bountyIdToSubmissionIds[_bountyId];
  }

  function getBountyByOwnerAddress(address ownerAddress) external view returns(uint[] memory) {
    return ownerToBounty[ownerAddress];
  }

  function getBountyById(uint id) external view returns(string memory title, string memory description, uint price, address ownerAddress, bool accepted) {
    return (bounties[id].title, bounties[id].description, bounties[id].price, bounties[id].ownerAddress, bounties[id].accepted);
  }
}
