import React, {PureComponent} from 'react';
import {
  Button,
  Card,
  CardTitle,
  CardText,
  DialogContainer,
  TextField
} from 'react-md';

import LoadingIndicator from "../LoadingIndicator";
import {API, graphqlOperation} from 'aws-amplify'
import './Tenants.css';

export default class Tenants extends PureComponent {

  state = {
    dialogVisible: false,
    accounts: [],
    fetchStatus: undefined,

  };

  show = () => {
    this.setState({dialogVisible: true});
  };

  hide = () => {
    this.setState({dialogVisible: false});
  };


  async componentDidMount() {

    const ListTenants = `query ListTenants {
      tenants{
        id
        name
        createDate
        users {
          id
          firstName
        }
      }
    }`;

    try {
      this.setState({fetchStatus: 'FETCHING'});
      const result = await API.graphql(graphqlOperation(ListTenants));
      console.log("RESULT:", result);
      this.setState({
        accounts: result.data.tenants,
        fetchStatus: 'SUCCESS'
      });
    } catch (e) {
      this.setState({
        fetchStatus: 'FAIL'
      });
      console.error('ERROR:', e);
    }
  }

  render() {
    const {accounts, dialogVisible, fetchStatus} = this.state;
    const isLoading = fetchStatus === 'FETCHING';

    const accountCards = accounts.map(account => (
      <Card className="md-cell" key={account.id}>
        <CardTitle title={account.name}/>
        <CardText>
          <p>Account</p>
        </CardText>
      </Card>
    ));

    const actions = [{
      id: 'dialog-cancel',
      secondary: true,
      children: 'Cancel',
      onClick: this.hide,
    }, {
      id: 'dialog-ok',
      primary: true,
      children: 'Ok',
      onClick: this.hide,
    }];

    const newDialog = (
      <DialogContainer
        id="new-tenant-dialog"
        title="New Tenant"
        visible={dialogVisible}
        actions={actions}
        modal={true}
        initialFocus='name'
        focusOnMount={true}
        containFocus={true}
        contentClassName="md-grid"
      >
        <TextField id="name" label="Name" placeholder="Name" className="md-cell md-cell--12"/>
        <TextField id="description" label="Description" placeholder="Description" rows={2}
                   className="md-cell md-cell--12"/>
      </DialogContainer>
    );

    return (
      <div className="md-grid md-text-container">
        <LoadingIndicator isLoading={isLoading}/>
        <h2 className="md-cell md-cell--12">
          Tenants
        </h2>
        {accountCards}
        <Button id="add-btn" floating primary onClick={this.show}>add</Button>
        {newDialog}
      </div>
    );
  }
}
