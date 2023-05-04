Purpose of this file is to automate functional testing of API service https://census-toy.nceng.net/prod/toy-census

* Language: JavaScript
* Framework: Nightwatch.js
* Reasoning: I elected to use this framework as it supports BDD test syntax for easier readability.
Package.json should prevent any module dependency issues and allow the tests to run out the box.

Set-up:
1. Install git
2. Install Node.js
3. In a new directory, run cli command: "git clone https://github.com/tommyle153/NC_API_TEST.git"
4. Run cli command: "npm install" to install dependencies listed in package.json
5. Run cli command: "npx nightwatch --env api_testing" to kick off tests located under ./tests directory

Test description:
I used a hard-coded array containing 3 users with the following demographic:
* 2 female, 1 male
* 2 US nationality, 1 AU nationality
* ? password complexity

Majority of test plan involves happy path testing all 3 actionType {CountByGender, CountByCountry, CountPasswordComplexity} with different valid inputs for optional parameter top, where top can be:
* 0
* positive integer
* integer greater than user list array length

Additional un-happy path  testing involved sending requests with invalid parameter:
* invalid actionType
* top = {negative integer, non-integer such as letter or special character}
* empty user list
