import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-md';
import LoadingIndicator from "../LoadingIndicator";
import { API, graphqlOperation } from 'aws-amplify'

export default class Accounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      fetchStatus: undefined,
    };
  }



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
      console.log("RESULT:",result);
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
    const { accounts, fetchStatus } = this.state;
    const isLoading = fetchStatus === 'FETCHING';

    const accountCards = accounts.map(account => (
      <Card className="md-cell" key={account.id}>
        <CardTitle title={account.name} />
        <CardText>
          <p>Account</p>
        </CardText>
      </Card>
    ));

    return (
      <div className="md-grid md-text-container">
      <LoadingIndicator isLoading={isLoading} />
      <h2 className="md-cell md-cell--12">
        Accounts
      </h2>
      { accountCards }
    </div>
    );
  }
}
