const BountyMarket = artifacts.require('BountyMarket.sol');

// tests for bounty market contract
contract('BountyMarket', function(accounts) {

  // set up contract instance for all tests
  let instance
  beforeEach('setup new contract for each test', async function() {
    instance = await BountyMarket.new({gas: 6721975})
  })

  // test to create new bounty
  it('creates new bounty', async function() {
    await instance.createBounty("testTitle", "testDescription", 100, true);
    fetchBounty = await instance.getBountyById(0);
    console.log(fetchBounty[0]);
      assert.equal("testTitle", fetchBounty[0]);
  })

  // test to create new submission in response to a bounty posted
  it('creates new submission', async function() {
    await instance.createBountySubmission(0, "testDescription100");
    fetchNewSubmissionId = await instance.retrieveSubmissionsIds(0);
    console.log(fetchNewSubmissionId[0]);
      assert.equal(0, fetchNewSubmissionId[0]);
  })

  // test to retrieve the response of a submission from a submission id
  it('retrieve Submissions Texts From Ids', async function() {
    await instance.createBountySubmission(0, "testSubmission");
    fetchNewSubmissionId = await instance.retrieveSubmissionsIds(0);
    fetchSubmissionTextandAddress = await instance.retrieveSubmissionsTextandAddressFromIds(fetchNewSubmissionId);
    console.log(fetchSubmissionTextandAddress[0]);
      assert.equal(fetchSubmissionTextandAddress[0], "testSubmission");
  })

  // test to retrieve the response of a submission from a submission id
  it('retrieve Submittor address From Ids', async function() {
    await instance.createBountySubmission(0, "testSubmission");
    submittorAddress = instance.address // msg.sender when running tests
    fetchNewSubmissionId = await instance.retrieveSubmissionsIds(0);
    fetchSubmittorAddress = await instance.submissions[fetchNewSubmissionId].submittorAddress;
    fetchSubmissionTextandAddress = await instance.retrieveSubmissionsTextandAddressFromIds(fetchNewSubmissionId);
    console.log(fetchSubmissionTextandAddress[1]);
      assert.equal(fetchSubmissionTextandAddress[1], fetchSubmittorAddress);
  })
})
