
const { UserInputError } = require('apollo-server-lambda');
const DataService = require('../core/dataService');


const getTenants = async () => {
  const tenants = await DataService.getAllTenants();
  return tenants;
};

const getTenant = async (parent, args) => {
  const { id } = args;
  const results = await DataService.getTenant(id);
  return results[0];
};

const createTenant = async (parent, args) => {
  const { name } = args;
  if (!name) {
    throw new UserInputError('Form Arguments invalid', {
      invalidArgs: Object.keys(args),
    });
  }
  const result = await DataService.createTenant(name);
  return result;
};

const createUser = async (parent, args) => {
  const { tenantId, firstName, lastName } = args;
  if (!tenantId || !firstName || !lastName) {
    throw new UserInputError('Form Arguments invalid', {
      invalidArgs: Object.keys(args),
    });
  }
  const result = await DataService.createUser(tenantId, firstName, lastName);
  return result;
};

const getUser = async (parent, args) => {
  const { id } = args;
  const results = await DataService.getUser(id);
  return results[0];
};

const getUsers = async (parent) => {
  const result = await DataService.getTenantUsers(parent.id);
  return result;
};

const getTenantForUser = async (parent) => {
  const results = await DataService.getTenant(parent.sellerId);
  return results[0];
};


const resolvers = {
  Query: {
    tenants: getTenants,
    tenant: getTenant,
    user: getUser,
  },
  Mutation: {
    createTenant,
    createUser,
  },
  Tenant: {
    users: getUsers,
  },
  User: {
    tenant: getTenantForUser,
  },
};

module.exports = resolvers;
