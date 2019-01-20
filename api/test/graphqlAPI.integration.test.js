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
    console.log(JSON.stringify(tenants));
    expect(tenants.length).toEqual(2);

    const acmeTenant = tenants.find(item => item.name === 'ACME');
    expect(acmeTenant.name).toBe('ACME');
    expect(acmeTenant.users.length).toBe(2);
  });
});
