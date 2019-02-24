import React, {PureComponent} from 'react';
import {
  Button,
  Card,
  CardTitle,
  CardText
} from 'react-md';
import NewTenantDialog from './NewTenantDialog';
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

  handleCreateSuccess = () => {
    this.setState({dialogVisible: false});
    this.fetchTenants();
  }

  fetchTenants = async () => {
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
      console.log("Tenants.fetchTenants() results:", result);
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
  };

  async componentDidMount() {
    this.fetchTenants();
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

    return (
      <div className="md-grid md-text-container">
        <LoadingIndicator isLoading={isLoading}/>
        <h2 className="md-cell md-cell--12">
          Tenants
        </h2>
        {accountCards}
        <Button id="add-btn" floating primary onClick={this.show}>add</Button>
        <NewTenantDialog onCancel={this.hide} onSuccess={this.handleCreateSuccess} visible={dialogVisible}/>
      </div>
    );
  }
}
