# Trestle API 

# Run locally

```bash
yarn install
serverless dynamodb install  // first time only
yarn start
```

Then, in a separate terminal launch the integration tests:

```bash
yarn integration-test
```
# Currently implement features

- TODO


# Local debugging and troubleshooting tips

If you get an error when starting in offline mode is most likely an issue with 
starting the local Dynamo. Make sure you have Java istalled, JAVA_HOME set and
that you have run `serverless dynamodb install`. Also, there seems to be known
issue with the most recent version of `serverless-dynamodb-local`, so I had to
roll back to a prior version (0.2.30)

## View seed data in local DynamoDB instance
When the app is started in offline mode, an offline DynamoDB is started and pre populated
with the seed data at offline/migrations/table-seed.json. You can run queries directly against
the offline DynamoDB by pointing a web browser at: http://localhost:8000/shell/

Below are some queries to try:

### List tables:
```javascript
var params = {
};
dynamodb.listTables(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
```

### Scan entire table:
```javascript
var params = {
    TableName: 'trestle-api-dev',
   
};
dynamodb.scan(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
```

# Deployment with custom API domain name
For a complete understanding of how domain name mapping works please review the following
resources:
* Serverless Blog Post: https://serverless.com/blog/api-gateway-multiple-services/
* serverless-domain-manager plugin doc: https://www.npmjs.com/package/serverless-domain-manager 

## Domain name deployment quick reference
First, it is important to know that the serverless-domain-manager plugin is disabled by default.
This is to allow developers to continue to test the project by deploying to a test AWS account
that is not configured with a custom domain. Developers can continue to deploy as normal using 
the standard `serverless deploy`

Before the API can be mapped to a domain, the domain must first exist in Route53 and
API Gateway. This is accomplished by running the `create-domain` command. Note: this is required only the first time a given domain name mapping is used.

Suppose we want to map the API to domain: `trestle-api.mikehake.com`. This
is accomplished with the following command:

`serverless create_domain --domain trestle-api.mikehake.com --enableDomainManager true`

Note the CLI parameter: `--enableDomainManager true`. This is required to enable the 
serverless-domain-manager plugin. Please see serverless.yml and look at how this 
is mapped to the serverless-domain-manager plugin. There is a bit of variable substitution trickery going on to map a command line parameter to a boolean. This 
is a bit of a workaround for this know issue with CLI parameters that need to map to boolean: https://forum.serverless.com/t/passing-boolean-values-from-cli-into-serverless-yml/1997  

Once the domain has been created, the project can be deployed and mapped to the domain via this command:

`serverless deploy --domain trestle-api.mikehake.com --enableDomainManager true` 

Once deployment is complete, the API's can be accessed at:
   
`https://{custom.customDomain.domainName}/{custom.customDomain.basePath}/{functions.<name>.events.http.path}` 