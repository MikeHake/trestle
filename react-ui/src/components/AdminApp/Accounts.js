import React, { Component } from 'react';
import { API } from "aws-amplify";
import { Card, CardTitle, CardText } from 'react-md';
import LoadingIndicator from "../LoadingIndicator";
// import "./accounts.css";

export default class Accounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      fetchStatus: undefined,
    };
  }

  async componentDidMount() {
    try {
      this.setState({fetchStatus: 'FETCHING'});
      const response = await API.get("accounts", "/accounts");
      this.setState({
        accounts: response.data,
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
      <Card className="md-cell" key={account.sortKey}>
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
