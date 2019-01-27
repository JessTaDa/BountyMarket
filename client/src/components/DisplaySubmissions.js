import React from 'react';
import {Button, CardPanel} from 'react-materialize';
import Web3 from "web3";

export default class DisplaySubmissions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submissionId: null,
      submissionText: "no text yet",
      submittorAddress: "",
      approved: false
    }
    this.handleApproval = this.handleApproval.bind(this);
  }

  async componentDidMount() {
    console.log('DisplaySubmissions.componentDidMountthis.props',this.props)
    let submissionPkg = await
     this.props.instance.methods.retrieveSubmissionsTextandAddressFromIds(this.props.submissionId).call({from: this.props.ownerAddress});
    this.setState({
      submissionText: submissionPkg[0],
      submittorAddress: submissionPkg[1]
    });
    console.log('submissionPkg', submissionPkg)
  }

  async handleApproval(event) {
    event.preventDefault()
    let pkgApproveAndTransfer = await this.props.instance.methods.approveAndTransfer(this.props.bountyId, this.props.submissionId).send({from: this.props.ownerAddress, value: Web3.utils.toWei(this.props.bountyReward,'ether')});
    console.log('pkgApproveAndTransfer', pkgApproveAndTransfer);
  }

  render(props) {
    'Submissions'
    return(
      <div>
      <CardPanel className="teal lighten-4 black-text">
        <p><strong>Response: </strong> {this.state.submissionText}</p>
        <p><strong>Submitted By: </strong> {this.state.submittorAddress}</p>
        <p><strong>Approved?: </strong> {this.state.approved}
          <Button class="btn waves-effect waves-light" type="submit" name="action" value="button" onClick={this.handleApproval}>Send Winner Money!</Button></p>
      </CardPanel>
      </div>
    )
  }
}
