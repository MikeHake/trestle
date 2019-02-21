# Trestle Serverless Resources

# Run locally

```bash
yarn install
serverless dynamodb install  // first time only
yarn start
```

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
    TableName: 'trestle-resources-prod',
   
};
dynamodb.scan(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
```