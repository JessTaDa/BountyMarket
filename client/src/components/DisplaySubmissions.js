import React from 'react';
import {Button, CardPanel, Collection, CollectionItem} from 'react-materialize';

export default class DisplaySubmissions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submissionId: null,
      submissionText: "no text yet",
      submittorAddress: ""
    }
  }

  async componentDidMount() {
    console.log("Display Submission componentDidMount hello");
    let submissionPkg = await this.props.instance.methods.retrieveSubmissionsTextandAddressFromIds(this.props.submissionId).call({from: this.props.ownerAddress});
    // console.log('recieved pkg submissionPkg[0]',submissionPkg[0]);
    // console.log('recieved pkg submissionPkg[1]',submissionPkg[1]);
    this.setState({
      submissionText: submissionPkg[0], 
      submittorAddress: submissionPkg[1]
    });
    console.log("hancleClick this.state.submissionText", this.state.submissionText);
    console.log("hancleClick this.state.submittorAddress", this.state.submittorAddress);
  }

  render(props) {
    'Submissions'
    return(
      <div>
        <p>Submitted Response: {this.state.submissionText}</p>
        <p>Submitted By: {this.state.submittorAddress}</p>

      </div>
    )
  }
}
