import React from 'react';
import {Button, CardPanel, Collection, CollectionItem} from 'react-materialize';

export default class DisplaySubmissions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submissionId: null,
      submissionText: "no text yet",
      submissionOwner: ""
    }
  }

  async componentDidMount() {
    console.log("Display Submission componentDidMount hello");
    let submissionText = await this.props.instance.methods.retrieveSubmissionsTextFromIds(this.props.submissionId).call({from: this.props.ownerAddress});
    this.setState({submissionText: submissionText});
    console.log("hancleClick this.state.submissionText", this.state.submissionText);
  }

  render(props) {
    return(
      <div>
      <CardPanel className="teal lighten-4 black-text">
      <Collection header="Submissions">
        <CollectionItem>{this.state.submissionText}</CollectionItem>
        </Collection>
      </CardPanel>
      </div>
    )
  }
}
