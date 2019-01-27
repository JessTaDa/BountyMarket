pragma solidity ^0.5.0;

contract BountyMarket {

  event BountyCreated(uint _id, string _title, string _description, uint _reward, address _ownerAddress, bool _approved);
  event SubmissionCreated(uint _bountyId, address submittorAddress, uint submissionId, string _text);
  event SubmissionApprovedTransferred(uint _bountyId, address _ownerAddress, address _submittorAddress, uint reward);

  address payable public owner;

  constructor() public {
    owner = msg.sender;
  }

  struct Bounty {
    string title;
    string description;
    uint reward;
    address ownerAddress;
    bool approved;
  }

  struct Submission {
    bool approved;
    string text;
    address payable submittorAddress;
  }

  Bounty[] public bounties;
  Submission[] public submissions;
  mapping (uint => address) public bountyToOwner;
  mapping (address => uint[]) public ownerToBounty;
  mapping (uint => uint[]) public bountyIdToSubmissionIds;

  function createBounty(string memory _title, string memory _description, uint _reward, bool _approved) public {
    uint id = bounties.push(Bounty(_title, _description, _reward, owner, _approved)) -1;
    bountyToOwner[id] = owner;
    ownerToBounty[owner].push(id);
    emit BountyCreated(id, _title, _description, _reward, owner, _approved);
  }

  function createBountySubmission(uint _bountyId, string memory _text) public {
    uint submissionId = submissions.push(Submission(false, _text, owner)) -1;
    bountyIdToSubmissionIds[_bountyId].push(submissionId);
    emit SubmissionCreated(_bountyId, owner, submissionId, _text);
  }

  function retrieveSubmissionsIds(uint _bountyId) external view returns (uint[] memory _submissionIds) {
    return bountyIdToSubmissionIds[_bountyId];
  }

  function retrieveSubmissionsTextandAddressFromIds(uint _submissionId) external view returns (string memory _submissionText, address _submittorAddress) {
    return (submissions[_submissionId].text, submissions[_submissionId].submittorAddress);
  }

  function getBountyByOwnerAddress(address ownerAddress) external view returns(uint[] memory) {
    return ownerToBounty[ownerAddress];
  }

  function getBountyById(uint id) external view returns(string memory title, string memory description, uint reward, address ownerAddress, bool approved) {
    return (bounties[id].title, bounties[id].description, bounties[id].reward, bounties[id].ownerAddress, bounties[id].approved);
  }

  function approveAndTransfer(uint _bountyId, uint _submissionId) payable public {
    submissions[_submissionId].approved = true;
    submissions[_submissionId].submittorAddress.transfer(msg.value);
    emit SubmissionApprovedTransferred(_bountyId, bounties[_bountyId].ownerAddress, submissions[_submissionId].submittorAddress, bounties[_bountyId].reward);
  }
}
