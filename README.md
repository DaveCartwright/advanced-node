# Advanced Node

## CI/CD With DB Integration Tests

This branch uses GitHub actions to start a PostgreSQL instance in the CI and run tests against it; which removes the necessity for mocking the DB.

The example App contains a single endpoint to create a new user. The corresponding test provides the new user details and checks the response for the data. Since the DB has not been mocked, the data returned is the actual new user from the DB.

## Example CI/CD Run

You can see the CI/CD workflow [here](https://github.com/DaveCartwright/advanced-node/actions/runs/5791050854).
