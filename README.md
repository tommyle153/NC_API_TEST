Purpose of this file is to automate functional testing of API service https://census-toy.nceng.net/prod/toy-census

Language: JavaScript
Framework: Nightwatch.js
Reasoning: I elected to use this framework as it supports BDD test syntax for easier readability.
Package.json should prevent any module dependency issues and allow the tests to run out the box.

Set-up:
1. Install git
2. Install Node.js
3. In a new directory, run cli command: "git clone https://github.com/tommyle153/NC_API_TEST.git"
4. Run cli command: "npm install" to install dependencies listed in package.json
5. Run cli command: "npx nightwatch --env api_testing" to kick off tests located under ./tests directory

Test description:
test all 3 actionType {CountByGender, CountByCountry, CountPasswordComplexity} + top >= 1
test when top > usersArray.length
how does actionType + top = 1 react when result is equal? 
    e.g users[2 female, 2 male] what will CountByGender + top=1 return? think its defaulting to alphabetically?

unhappy path:
    top {letter, special character, null, negative, 0}
    