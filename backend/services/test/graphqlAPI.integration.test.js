const TestUtils = require('./integrationTestUtils');

/**
 * Reset local DynamnoDB data between each test
 */
beforeEach(async (done) => {
  await TestUtils.resetTestData();
  done();
});

describe('Tenant Type', () => {
  test('Get Tenants', async () => {
    const query = `{
      tenants{
        id
        name
        users{
          id
          firstName
          lastName
        }
      }
    }`;

    const result = await TestUtils.invokeGraphqlQuery(query);
    expect(result.body.errors).toBeUndefined();
    expect(result.statusCode).toEqual(200);
    const { tenants } = result.body.data;
    expect(tenants.length).toEqual(2);

    const acmeTenant = tenants.find(item => item.name === 'ACME');
    expect(acmeTenant.name).toBe('ACME');
    expect(acmeTenant.users.length).toBe(2);
  });

  test('Create New Tenant', async () => {
    const mutation = `mutation {
      createTenant(name: "ABC Inc."){
        id
        name
        createDate
      }
    }`;

    const result = await TestUtils.invokeGraphqlQuery(mutation);
    expect(result.body.errors).toBeUndefined();
    expect(result.statusCode).toEqual(200);
    const createdTenant = result.body.data.createTenant;

    // Query for new tenant
    const query = `{
      tenant(id: "${createdTenant.id}"){
        id
        name
        createDate
      }
    }`;

    const queryResult = await TestUtils.invokeGraphqlQuery(query);
    expect(result.body.errors).toBeUndefined();
    expect(result.statusCode).toEqual(200);
    const fetchedTenant = queryResult.body.data.tenant;
    expect(createdTenant).toEqual(fetchedTenant);
  });
});
