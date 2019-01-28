pragma solidity ^0.5.0;

/* import Ownable contract from openzeppelin-solidity for basic authorization control */
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

/** @title Bounty Market */
contract BountyMarket is Ownable {

  /* event fires when bounty is created */
  event BountyCreated(uint _id, string _title, string _description, uint _reward, address _ownerAddress, bool _approved);
  /* event fires when submissio is created */
  event SubmissionCreated(uint _bountyId, address submittorAddress, uint submissionId, string _text);
  /* event fires when submission is approved by bounty owner and funds are transferred */
  event SubmissionApprovedTransferred(uint _bountyId, address _ownerAddress, address _submittorAddress, uint reward);


  /* checks that value is not zero */
  modifier valueNotZero(uint _value) {
    require(_value != 0, 'Please ensure bounty reward value is greater than zero');
    _;
  }
  /* check for sufficient funds for reward payment */
  modifier checkRewardDeposit(uint _bountyId) {
      require(bounties[_bountyId].ownerAddress.balance >= bounties[_bountyId].reward, 'You do not have enough funds to pay the reward');
      _;
  }
  /* only bounty owner is allowed to run the function */
  modifier onlyBountyOwner(uint _bountyId) {
    require(msg.sender == bounties[_bountyId].ownerAddress);
    _;
  }

  /* circuit breaker implemented in contract */
  modifier stopInEmergency() { require(!stopped); _; }

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
  /* circuit breaker implementation */
  bool public stopped = false;

  /** @dev creates new bounty
  @param _title - bounty title
  @param _description - bounty task description
  @param _reward - bounty reward issue by bounty creator/owner to successful submittors
  @param _approved - bounty chosen by bounty owner */
  function createBounty(string memory _title, string memory _description, uint _reward, bool _approved) public valueNotZero(_reward) {
    uint id = bounties.push(Bounty(_title, _description, _reward, msg.sender, _approved)) -1;
    bountyToOwner[id] = msg.sender;
    ownerToBounty[msg.sender].push(id);
    emit BountyCreated(id, _title, _description, _reward, msg.sender, _approved);
  }

  /** @dev create new submission for a bounty
  @param _bountyId - submission is created for this bounty
  @param _text - response created by the submittor for the bounty task */
  function createBountySubmission(uint _bountyId, string memory _text) public {
    uint submissionId = submissions.push(Submission(false, _text, msg.sender)) -1;
    bountyIdToSubmissionIds[_bountyId].push(submissionId);
    emit SubmissionCreated(_bountyId, msg.sender, submissionId, _text);
  }

  /** @dev retrieve submissions objects with submission ids, once they have been submitted
  @param _bountyId - submissions are retrieved for this bounty
  @return a list of submissionId's linked to the bounty */
  function retrieveSubmissionsIds(uint _bountyId) external view returns (uint[] memory _submissionIds) {
    return bountyIdToSubmissionIds[_bountyId];
  }

  /** @dev retrieve the text and submittor address of a submission with a submission id
  @param _submissionId - submissions id to retrieve submission text and submittor address
  @return text and submittor ddress of submission */
  function retrieveSubmissionsTextandAddressFromIds(uint _submissionId) external view returns (string memory _submissionText, address _submittorAddress) {
    return (submissions[_submissionId].text, submissions[_submissionId].submittorAddress);
  }
  /** @dev retrieve bounty with a bounty owners address
  @param ownerAddress - bounty owner address
  @return array of bountyId's associated with address for all bounties created byt this owner */
  function getBountyByOwnerAddress(address ownerAddress) external view returns(uint[] memory) {
    return ownerToBounty[ownerAddress];
  }

  /** @dev retrieve bounty with a bounty owners id
  @param id - bounty id
  @return title, description, bounty reward, owner address and approval state of Bounty retrieved by bounty id */
  function getBountyById(uint id) external view returns(string memory title, string memory description, uint reward, address ownerAddress, bool approved) {
    return (bounties[id].title, bounties[id].description, bounties[id].reward, bounties[id].ownerAddress, bounties[id].approved);
  }

  /** @dev bounty owner approves the submission and transfers reward amount to submittor
  @param _bountyId - bounty id of bounty in question
  @param _submissionId - submission id of winning submission to be rewarded */
  function approveAndTransfer(uint _bountyId, uint _submissionId) payable public checkRewardDeposit(_bountyId) onlyBountyOwner(_bountyId) stopInEmergency() {
    submissions[_submissionId].approved = true;
    submissions[_submissionId].submittorAddress.transfer(msg.value);
    emit SubmissionApprovedTransferred(_bountyId, bounties[_bountyId].ownerAddress, submissions[_submissionId].submittorAddress, bounties[_bountyId].reward);
  }
}
