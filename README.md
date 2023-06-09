* Language: JavaScript
* Framework: Nightwatch.js
* Reasoning: I elected to use this framework as it supports BDD test syntax for easier readability.
Package.json should prevent any module dependency issues and allow the tests to run out the box.
* Disclaimer: I moved the unstable test scenarios to the end of the test file due to bug reported at bottom of README.md. This is to prevent test suite from failing early and skipping stable test cases

Set-up:
1. Install git
2. Install Node.js
3. In a new directory, run cli command: "git clone https://github.com/tommyle153/NC_API_TEST.git"
4. Change directory inside cloned repo: cd .\NC_API_TEST\
5. While being in same directory as package.json, run cli command: "npm install" to install dependencies listed in package.json
6. Run cli command: "npx nightwatch --env api_testing" to kick off tests located under ./tests directory
7. Results can be viewed locally in path: tests_output\nightwatch-html-report\index.html

Test description:
I used a hard-coded array containing 3 users with the following demographic:
* 2 female, 1 male
* 2 US nationality, 1 AU nationality
* password complexity {3,0,0}

Majority of test plan involves happy path testing all 3 actionType {CountByGender, CountByCountry, CountPasswordComplexity} with different valid inputs for optional parameter top, where top can be:
* unspecified due to being an optional parameter
* 0
* positive integer
* integer greater than user list array length

Additional un-happy path testing involved sending requests with invalid parameter:
* empty user list
* invalid actionType
* top = {negative integer, non-integer (float, letter, special character)}



"Format descriptions of any bugs as if you were reporting a bug and opening a new ticket for it. 
These descriptions should be included in your project README"

Bug: API response inconsistently off by 1

Description: When sending a valid payload to API, the response would sometimes be off by 1 value.
Attached are videos demonstrating issue using external application Postman
* API_top_1.mp4: given array of 1 user and top = 1, action type CountPasswordComplexity should return 1 password. Recording shows expected behavior until 8th API request, returned (top - 1) = 1-1 = 0, empty array
* API_top_2.mp4: given array of 3 users belong to a different nationality (US, FI, and GB) and top = 2, action type CountByCountry should return 2 nationalities. Recording API returns either 1, 2, or 3 nationalities in response array

Steps to reproduce:
1. Send a POST request to https://census-toy.nceng.net/prod/toy-census
2. Payload should contain at least 3 user with different nationalities, action type = CountByCountry, and optional parameter "top" is set to value: 2
3. Repeat call 10-20 times

Actual result: some of the call returns are off by 1, either returning 1 nationality or 3 nationality

Expected result: all calls return 2 nationalities