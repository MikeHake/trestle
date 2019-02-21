const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Tenant {
    id: String!
    name: String!
    createDate: String!
    users: [User!]!
  }
  
  type User {
    id: String!
    firstName: String!
    lastName: String!
    createDate: String!
    tenant: Tenant!
  }

  type Query {
    tenants: [Tenant!]!
    tenant(id: String): Tenant
    user(id: String): User
  }

  type Mutation {
    createTenant(name: String): Tenant
    createUser(tenantId: String, lastName: String, firstName: String): User
  }
`;

module.exports = typeDefs;
