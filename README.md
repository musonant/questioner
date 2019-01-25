# Questioner
[![Build Status](https://travis-ci.com/musonant/questioner.svg?branch=develop)](https://travis-ci.com/musonant/questioner)
[![Coverage Status](https://coveralls.io/repos/github/musonant/questioner/badge.svg?branch=develop)](https://coveralls.io/github/musonant/questioner?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/6019dd2da9bd745b29db/maintainability)](https://codeclimate.com/github/musonant/questioner/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6019dd2da9bd745b29db/test_coverage)](https://codeclimate.com/github/musonant/questioner/test_coverage)

Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To get a development environment running on your local machine, these softwares should be installed first:

* [Node.js](https://nodejs.org)
* [Postman](https://www.getpostman.com)


### Installing

To install this project installed, follow the following steps:

On terminal, run
* `npm install` to install dependencies
* `npm run start` to start server OR 
* `npm run start:dev` to start server in development mode
* The server should start on port 8000


To test, navigate to Postman and make a get request to `localhost:8000`

## Running the tests

To run tests, run `npm run test` This would test different routes and methods to ensure that they return valid responses.

## Deployment

This project is hosted on [Heroku](https://heroku.com)
[View App](https://musonant-questioner.herokuapp.com/api/v1/meetups)

## Built With

* HyperText Mark-up Language (HTML)
* Cascade Style Sheet (CSS)
* Javascript
* Nodejs (With Express framework)
* Mocha (Test Framework)
* Chai (Assertion Library)

## Authors

* **Emmanuel Osuh** - [Musonant](https://github.com/musonant)

See also the list of [contributors](https://github.com/musonant/questioner/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Medium tutorials on node and express
* [This amazing Node.js tutorial](https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-postgresql-db-and-jwt-3-mke10c5c5)
* [Scotch.io](scotch.io)
* Inspiration: [Eventbrite](eventbrite.com)
