# aws-example-app

## Deploy UI
Take a look at the react-ui package.json and note how the deploy command is
using a AWS named profile. You must have a named profile configured that can deploy
to S3. For more info on named AWS profiles see: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html
- `yarn build`
- `yarn deploy`
