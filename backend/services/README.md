# Trestle API 

# Run locally

```bash
yarn install
yarn start
```

Then, in a separate terminal launch the integration tests:

```bash
yarn integration-test
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

Suppose we want to map the API to domain: `trestle-services.mikehake.com`. This
is accomplished with the following command:

`serverless create_domain --domain trestle-services.mikehake.com --enableDomainManager true --stage prod`

Note the CLI parameter: `--enableDomainManager true`. This is required to enable the 
serverless-domain-manager plugin. Please see serverless.yml and look at how this 
is mapped to the serverless-domain-manager plugin. There is a bit of variable substitution trickery going on to map a command line parameter to a boolean. This 
is a bit of a workaround for this know issue with CLI parameters that need to map to boolean: https://forum.serverless.com/t/passing-boolean-values-from-cli-into-serverless-yml/1997  

Once the domain has been created, the project can be deployed and mapped to the domain via this command:

`serverless deploy --domain trestle-services.mikehake.com --enableDomainManager true --stage prod` 

Once deployment is complete, the API's can be accessed at:
   
`https://{custom.customDomain.domainName}/{custom.customDomain.basePath}/{functions.<name>.events.http.path}` 