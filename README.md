# Trestle

This is a reference architecture for an enterprise multi tenant web application. The technology stack includes:

* ReactJS Frontend
* AWS Lambda hosting a GraphQL API
* AWS Cognito Authentication
* AWS DynamoDB
* Serverless (https://serverless.com/) framework to simplify authoring and deploying code to AWS.
* Serverless Offline and Serverless Offline DynamoDB to enable running/debugging entire stack locally
* Javascript best practices such as ESLint, Jest unit testing and code coverage reporting.

# To run stack locally

* Start local DynamoDB as documented in backend/resources/README.md
* Start local Lambda services as documented in backend/services/README.md
* Verify local backend is functioning by running integration tests as documented in backend/services/README.md
* Start ReactJS frontend by changing directory to `frontend` and running `yarn start`

# To deploy stack to AWS

* Deploy DynamoDB as documented in backend/resources/README.md. `yarn deploy`
* Deploy services as documented in backend/services/README.md. `yarn deploy`
* Deploy frontend, this takes a little one time set up work to configure a S3 bucket and CloudFront. But once 
its set up deployment is as simple as `yarn build` then `yarn deploy`, `yarn invalidate-cloudfront-cache`

