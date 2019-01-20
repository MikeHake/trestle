/**
 * This file encapsulates all the knowledge of how the data model
 * is represented in DynamoDB.
 */

const uuidv4 = require('uuid/v4');
const {
  put,
  pageAwareQuery,
} = require('./dynamoClient');

const dataTypes = {
  TENANT: 'Tenant',
  USER: 'User',
};

const getAllTenants = async () => {
  const params = {
    KeyConditionExpression: 'dataType = :type',
    ExpressionAttributeValues: {
      ':type': dataTypes.TENANT,
    },
  };
  const result = await pageAwareQuery(params);
  return result;
};

const getTenant = async (tenantId) => {
  const params = {
    KeyConditionExpression: 'dataType = :type and id = :tid',
    ExpressionAttributeValues: {
      ':type': dataTypes.TENANT,
      ':tid': tenantId,
    },
  };

  const result = await pageAwareQuery(params);
  return result;
};

const getTenantUsers = async (tenantId) => {
  const params = {
    KeyConditionExpression: 'dataType = :type',
    FilterExpression: 'tenantId = :tid',
    ExpressionAttributeValues: {
      ':type': dataTypes.USER,
      ':tid': tenantId,
    },
  };

  const result = await pageAwareQuery(params);
  return result;
};


const createTenant = async (name, email) => {
  const id = uuidv4();
  const data = {
    id,
    dataType: dataTypes.TENANT,
    name,
    email,
  };

  await put(data);
  return data;
};


const getUserByCode = async (code) => {
  const params = {
    KeyConditionExpression: 'dataType = :type',
    FilterExpression: 'code = :code',
    ExpressionAttributeValues: {
      ':type': dataTypes.USER,
      ':code': code,
    },
  };
  const result = await pageAwareQuery(params);
  return result;
};


const createUser = async (tenantId, firstName, lastName) => {
  // ensure tenant is valid
  const tenant = await getTenant(tenantId);
  if (!tenant) {
    throw new Error(`Invalid tenant Id:${tenantId}`);
  }

  const id = uuidv4();
  const createDate = (new Date()).toISOString().substring(0, 10);
  const data = {
    id,
    dataType: dataTypes.USER,
    firstName,
    lastName,
    createDate,
  };
  await put(data);
  return data;
};

module.exports = {
  createUser,
  createTenant,
  getUserByCode,
  getAllTenants,
  getTenant,
  getTenantUsers,
};
