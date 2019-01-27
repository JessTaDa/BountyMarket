const BountyMarket = artifacts.require('BountyMarket.sol');

contract('BountyMarket', function(accounts) {

  const owner = accounts[0]
  const alice = accounts[1];
  const bob = accounts[2];

  let instance
  beforeEach('setup new contract for each test', async function() {
    instance = await BountyMarket.new({gas: 6721975})
  })

  it('creates new bounty', async function() {
    await instance.createBounty("testTitle", "testDescription", 100, true);
    fetchBounty = await instance.getBountyById(0);
    console.log(fetchBounty[0]);
      assert.equal("testTitle", fetchBounty[0]);
  })

  it('creates new submission', async function() {
    await instance.createBountySubmission(0, "testDescription100");
    fetchNewSubmissionId = await instance.retrieveSubmissionsIds(0);
    console.log(fetchNewSubmissionId[0]);
      assert.equal(0, fetchNewSubmissionId[0]);
  })

  it('retrieve Submissions Texts From Ids', async function() {
    await instance.createBountySubmission(0, "testSubmission");
    fetchNewSubmissionId = await instance.retrieveSubmissionsIds(0);
    fetchSubmissionTextandAddress = await instance.retrieveSubmissionsTextandAddressFromIds(fetchNewSubmissionId);
    console.log(fetchSubmissionTextandAddress[0]);
      assert.equal(fetchSubmissionTextandAddress[0], "testSubmission");
  })

  it('retrieve Submittor address From Ids', async function() {
    await instance.createBountySubmission(0, "testSubmission");
    submittorAddress = '0x4228769D0bdeB21Ba331c3f05a05f4B790706232' // msg.sender when running tests
    fetchNewSubmissionId = await instance.retrieveSubmissionsIds(0);
    fetchSubmissionTextandAddress = await instance.retrieveSubmissionsTextandAddressFromIds(fetchNewSubmissionId);
    console.log(fetchSubmissionTextandAddress[1]);
      assert.equal(fetchSubmissionTextandAddress[1], '0x4228769D0bdeB21Ba331c3f05a05f4B790706232');
  })

})
