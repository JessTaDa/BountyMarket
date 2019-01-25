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
    let submissionPkg = await this.props.instance.methods.retrieveSubmissionsTextandAddressFromIds(this.props.submissionId).call({from: this.props.ownerAddress});
    this.setState({
      submissionText: submissionPkg[0],
      submittorAddress: submissionPkg[1]
    });
  }

  render(props) {
    'Submissions'
    return(
      <div>
      <CardPanel className="teal lighten-4 black-text">
        <p><strong>Response: </strong> {this.state.submissionText}</p>
        <p><strong>Submitted By: </strong> {this.state.submittorAddress}</p>
      </CardPanel>
      </div>
    )
  }
}
