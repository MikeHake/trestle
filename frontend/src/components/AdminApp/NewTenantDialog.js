import React, { Component } from 'react';
import {DialogContainer, TextField} from "react-md";
import {API, graphqlOperation} from 'aws-amplify';


class NewTenantDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  handleNameChange = (value) => {
    this.setState({name: value});
  };

  handleSubmit = async () => {
    const { onSuccess } = this.props;
    const { name } = this.state;
    console.log("Submitting new tenant:", name);

    const mutation = `mutation {
      createTenant(name: "${name}"){
        id
        name
        createDate
      }
    }`;

    const result = await API.graphql(graphqlOperation(mutation));
    // TODO - handle potential errors
    console.log("NewTenantDialog.handleSubmit() result:", result);

    onSuccess();
  };

  render() {
    const { onCancel, visible } = this.props;

    const actions = [{
      id: 'dialog-cancel',
      secondary: true,
      children: 'Cancel',
      onClick: onCancel,
    }, {
      id: 'dialog-ok',
      primary: true,
      children: 'Ok',
      onClick: this.handleSubmit,
    }];

    return (
      <DialogContainer
        id="new-tenant-dialog"
        title="New Tenant"
        visible={visible}
        actions={actions}
        modal={true}
        initialFocus='name'
        focusOnMount={true}
        containFocus={true}
        contentClassName="md-grid"
      >
        <TextField id="name" label="Name" placeholder="Name" className="md-cell md-cell--12"
                   value={this.state.value} onChange={this.handleNameChange}/>
      </DialogContainer>
    );
  }
}

export default NewTenantDialog;