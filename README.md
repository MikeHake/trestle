# Trestle

This is a example architecture for a full stack, multi tenant web application. The technology stack includes:

* ReactJS Frontend
* AWS Lambda hosting a GraphQL API secured behind a AWS API Gateway
* AWS Cognito Authentication
* AWS DynamoDB
* Serverless (https://serverless.com/) framework to simplify authoring and deploying code to AWS.
* Serverless Offline and Serverless Offline DynamoDB to enable running/debugging entire stack locally
* Javascript best practices such as ESLint, Jest unit testing and code coverage reporting.

## Design Choices
There are countless ways to architect an app and organize a codebase these days, I dont claim this to be better than any other way,
its just an approach that I have found to be effective and enjoyable to work with.

* How is the frontend built?
  * The frontend is a pretty basic ReactJS app. I try to author as little CSS as possible so its using the React-MD
  (https://react-md.mlaursen.com/) component library which provides a nice Google Material Design look. AWS Amplify
  (https://aws-amplify.github.io/) is used for all interaction with the backend including AWS Cognito authentication
  and GraphQL API interaction.
* Why AWS Lambda for backend?
  * I like AWS Lambda for its simplicity, security, scalability, and cost. Its simple in that I dont need to worry about
  managing a host to run my code. Deployment and even Continuous Deployment is simplified via the tools that are
  provided by Serverless (https://serverless.com/). Security is achieved by integrating AWS API Gateway and AWS Cognito
  in both a declarative and programmatic manner. The overall architecture is simplified as there is no need
  to implement a multi tier backend (public/private) with your own firewalls and load balancers. And finally AWS Lambda
  will automatically scale based on traffic and you pay for only what you use, which makes it very cost effective.
* Why the Serverless Framework (https://serverless.com/)?
  * I was first exposed to the Serverless Framework in the Spring of 2018 and have found it to be a huge help with
  developing and deploying serverless style applications to AWS. It abstracts and simplifies the process of getting 
  your code up and running in the cloud. Working with AWS can be complex, especially if you have to start writing
  your own CloudFormation Templates. When using the Serverless Framework you configure how your service will be 
  deployed using the file `serverless.yml`. This is a very well documented format with countless examples from the 
  community. The framework then generates and maintains a Cloud Formation Template for you. I have found this to be 
  much simpler to use than trying to use Cloud Formation directly. The question of how to do CI/CD is also simplified
  with the Serverless Framework as it comes with tooling to package and deploy your code to multiple stages, making 
  it easy to run several stages such as dev/staging/production/ect... 
* Why GraphQL for the API?
  * I got exposed to GraphQL around the Spring of 2018 and quickly fell in love with it. I find that the Schema Definition
  Language allows a schema and operations to be defined clearly, simply and succinctly. There is no ambiguity which simplifies
  the process of integrating the frontend and backend. 
* Why use JavaScript in the backend?
  * I have spent the majority of my career as a Java and Java EE developer, so why did I choose to use NodeJS/Javascript in the backend,
  especially since AWS Lambda supports Java? There were a couple of reasons for this. First, pretty much all front end
  dev these days requires JavaScript. This stack has a ReactJS front end and I personally found it a little easier to
  use the same language for both frontend/backend. I also found that when learning AWS Lambda back in the Spring of 2018
  that the majority of tutorials and examples I could find were NodeJS based, so it felt like the path of least resistance 
  to just go ahead and use NodeJS. And finally, the community and tooling support seems stronger with NodeJS. For example,
  the Serverless Framework supports a completely offline mode for NodeJS, allowing you to run/debug your Lambdas locally,
  but only if using NodeJS.
* What are some best practices being used?
  * Unit testing and code coverage with Jest 
  * Integration tests, separate from the unit tests, that run with a local DB and reset data between tests.
  * ESLint with the AirBnB rule set. This automatically checks Javascript code for programming errors and enforces consistent
  code style. Its very strict and can be shocking when first exposed to it, but its worth it.
* Why is everything in 1 repo? 
  * There are pros/cons of having separate repos for separate services and the UI. If the project is mature and there
  are different groups maintaining different services or the UI then separate repos makes sense. However when the project
  is just starting, with only 1 or 2 developers then everything in one repo does reduce complexity. I think a reasonable
  practice would be to put everything on 1 repo, but keep the distinct services separate within the repo to facilitate
  moving to separate repos when necessary.
* Why DynamoDB?
  * I have found DynamoDB to be great when prototyping and you dont know exactly what your data is going to look like.
  Its also very easy to use and get started with. However as the project and understanding of the data matures, DynamoDB 
  may not be the best choice. So always define some sort of persistence abstraction so you can change out the implementation
  later if necessary.
   


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

