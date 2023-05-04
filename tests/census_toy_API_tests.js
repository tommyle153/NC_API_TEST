const users = [
  {
    gender: "female",
    name: {
      title: "miss",
      first: "lorraine",
      last: "bryant",
    },
    location: {
      street: "4422 harrison ct",
      city: "gladstone",
      state: "tasmania",
      postcode: 3294,
    },
    email: "lorraine.bryant@example.com",
    login: {
      username: "smallduck444",
      password: "increasePwdComplexity1!?",
      salt: "fYBp4g4a",
      md5: "5d0785427febd6d262f00929c10247e7",
      sha1: "a12a6925740eefebebcbc79add949fa108a78bf0",
      sha256:
        "61a79aebd11cd5910dd9e77dd49b3dd11df2b4b397e328697f33b86e5b082b84",
    },
    dob: "1956-09-17 02:13:36",
    registered: "2009-05-03 14:40:51",
    phone: "00-3540-6154",
    cell: "0498-678-691",
    id: {
      name: "TFN",
      value: "377488473",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/38.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/38.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/38.jpg",
    },
    nat: "AU",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Warren",
      last: "Robertson",
    },
    location: {
      street: {
        number: 2296,
        name: "Rolling Green Rd",
      },
      city: "Norman",
      state: "Idaho",
      country: "United States",
      postcode: 53719,
      coordinates: {
        latitude: "84.4951",
        longitude: "-162.7084",
      },
      timezone: {
        offset: "+7:00",
        description: "Bangkok, Hanoi, Jakarta",
      },
    },
    email: "warren.robertson@example.com",
    login: {
      uuid: "fcc3b937-298d-4ea0-a489-c6071c4ee4d1",
      username: "orangemeercat809",
      password: "debbie",
      salt: "kKG15Oaz",
      md5: "73dcedf44f3a6d2613419d6c3a233801",
      sha1: "abc23c46dc343042bfc1fce9cacb7b0589c8626c",
      sha256:
        "2a3692dfc7422c7183adc4e443c8e077cef986ee92004a50a88ec2287e5fb941",
    },
    dob: {
      date: "1968-08-23T19:27:45.247Z",
      age: 54,
    },
    registered: {
      date: "2002-07-18T01:30:39.560Z",
      age: 20,
    },
    phone: "(282) 993-8048",
    cell: "(407) 455-5113",
    id: {
      name: "SSN",
      value: "715-56-0929",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/49.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/49.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/49.jpg",
    },
    nat: "US",
  },
  {
    gender: "female",
    name: {
      title: "Ms",
      first: "Alexandra",
      last: "Holt",
    },
    location: {
      street: {
        number: 6211,
        name: "Galway Road",
      },
      city: "Buncrana",
      state: "Offaly",
      country: "Ireland",
      postcode: 14142,
      coordinates: {
        latitude: "3.3284",
        longitude: "42.1052",
      },
      timezone: {
        offset: "-7:00",
        description: "Mountain Time (US & Canada)",
      },
    },
    email: "alexandra.holt@example.com",
    login: {
      uuid: "06c2922b-0c8a-41eb-8ca6-31c32083be0e",
      username: "heavyduck201",
      password: "person",
      salt: "VHOf3RqU",
      md5: "e83933bdba6bb93a29d124ebc83304ed",
      sha1: "37f7ffa15c1d0edbea3ff5932bca3061824d47cc",
      sha256:
        "61f8d77cc2a67ae0d7d2f1f1854b03a5a82b49b3400fc5a4648e7cc7e3602807",
    },
    dob: {
      date: "1990-09-09T16:22:06.209Z",
      age: 32,
    },
    registered: {
      date: "2006-07-09T05:36:37.801Z",
      age: 16,
    },
    phone: "011-527-9088",
    cell: "081-024-1986",
    id: {
      name: "PPS",
      value: "4483678T",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/17.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/17.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/17.jpg",
    },
    nat: "US",
  },
];
const emptyUsers = [];
describe("testing happy paths", () => {
  it("CountByGender returns all genders when top parameter is not specified", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByGender",
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        let genderArray = [];
        for (let i = 0; i < parsedResponse.length; i++){
          console.log(`parsedResponse element gender at ${i}: ${parsedResponse[i].name}`)
          genderArray.push(parsedResponse[i].name);
        }
        expect(genderArray.includes('female')).to.be.equal(true);
        expect(genderArray.includes('male')).to.be.equal(true);
      });
  });
  it("CountByGender returns majority gender of user list when top equals 1", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByGender",
        top: 1,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        expect(parsedResponse[0].name).to.be.equal("female");
        expect(parsedResponse[0].value).to.be.equal(2);
      });
  });
  it("CountByGender returns all genders when top equals 0", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByGender",
        top: 0,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        let genderArray = [];
        for (let i = 0; i < parsedResponse.length; i++){
          console.log(`parsedResponse element gender at ${i}: ${parsedResponse[i].name}`)
          genderArray.push(parsedResponse[i].name);
        }
        expect(genderArray.includes('female')).to.be.equal(true);
        expect(genderArray.includes('male')).to.be.equal(true);
      });
  });
  it("CountByGender returns all genders when value of top is greater than amount of users", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByGender",
        top: users.length + 1,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        let genderArray = [];
        for (let i = 0; i < parsedResponse.length; i++){
          console.log(`parsedResponse element gender at ${i}: ${parsedResponse[i].name}`)
          genderArray.push(parsedResponse[i].name);
        }
        expect(genderArray.includes('female')).to.be.equal(true);
        expect(genderArray.includes('male')).to.be.equal(true);
      });
  });
  it("CountByCountry returns all nationalities when top parameter is not specified", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByCountry",
        top: 0,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        let nationalityArray = [];
        for (let i = 0; i < parsedResponse.length; i++){
          nationalityArray.push(parsedResponse[i].name);
        }
        expect(nationalityArray.includes('US')).to.be.equal(true);
        expect(nationalityArray.includes('AU')).to.be.equal(true);
      });
  });
  it("CountByCountry returns majority user nationality when top equals 1", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByCountry",
        top: 1,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        expect(parsedResponse[0].name).to.be.equal("US");
        expect(parsedResponse[0].value).to.be.equal(2);
      });
  });
  it("CountByCountry returns all nationalities when top equals 0", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByCountry",
        top: 0,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        let nationalityArray = [];
        for (let i = 0; i < parsedResponse.length; i++){
          nationalityArray.push(parsedResponse[i].name);
        }
        expect(nationalityArray.includes('US')).to.be.equal(true);
        expect(nationalityArray.includes('AU')).to.be.equal(true);
      });
  });
  it("CountByCountry returns all nationalities when value of top is greater than amount of users", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByCountry",
        top: users.length + 1,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        let nationalityArray = [];
        for (let i = 0; i < parsedResponse.length; i++){
          nationalityArray.push(parsedResponse[i].name);
        }
        expect(nationalityArray.includes('US')).to.be.equal(true);
        expect(nationalityArray.includes('AU')).to.be.equal(true);
      });
  });
  it("CountPasswordComplexity returns all passwords when top parameter is not specified", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountPasswordComplexity",
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        console.log(`parsed response obj: ${JSON.stringify(parsedResponse, null, 4)}`);
        console.log(`parsedResponse[0]: ${JSON.stringify(parsedResponse)}`);
        console.log(`parsedResponse[1]: ${JSON.stringify(parsedResponse[0])}`);
        let passwordArray = [];
        for (let i = 0; i < parsedResponse.length; i++){
          passwordArray.push(parsedResponse[i].name);
        }
        expect(passwordArray.length === users.length).to.be.equal(true);
      });
  });
  it("CountPasswordComplexity returns most complex password when top equals 1", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountPasswordComplexity",
        top: 1,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        expect(parsedResponse[0].name).to.be.equal("increasePwdComplexity1!?");
      });
  });
  it("CountPasswordComplexity returns all passwords when top equals 0", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountPasswordComplexity",
        top: 0,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        console.log(`parsed response obj: ${JSON.stringify(parsedResponse, null, 4)}`);
        console.log(`parsedResponse[0]: ${JSON.stringify(parsedResponse)}`);
        console.log(`parsedResponse[1]: ${JSON.stringify(parsedResponse[0])}`);
        let passwordArray = [];
        for (let i = 0; i < parsedResponse.length; i++){
          passwordArray.push(parsedResponse[i].name);
        }
        expect(passwordArray.length === users.length).to.be.equal(true);
      });
  });
  it("CountPasswordComplexity returns all passwords when value of top is greater than amount of users", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountPasswordComplexity",
        top: users.length + 1,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        console.log(`parsed response obj: ${JSON.stringify(parsedResponse, null, 4)}`);
        console.log(`parsedResponse[0]: ${JSON.stringify(parsedResponse)}`);
        console.log(`parsedResponse[1]: ${JSON.stringify(parsedResponse[0])}`);
        let passwordArray = [];
        for (let i = 0; i < parsedResponse.length; i++){
          passwordArray.push(parsedResponse[i].name);
        }
        expect(passwordArray.length === users.length).to.be.equal(true);
      });
  });
});

describe("testing un-happy paths", () => {
  it("API returns an empty array when input user array is empty", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByGender",
        top: 0,
        users: emptyUsers,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        expect(response.text).to.be.equal("[]");
      });
  });
  it("API returns an empty result when given invalid action type: CountByInvalid", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByInvalid",
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        expect(response.text).to.be.equal("");
      });
  });
  it("API returns all results when top input is a negative integer", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByGender",
        top: -1,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        let parsedResponse = JSON.parse(response.text);
        let genderArray = [];
        for (let i = 0; i < parsedResponse.length; i++){
          console.log(`parsedResponse element gender at ${i}: ${parsedResponse[i].name}`)
          genderArray.push(parsedResponse[i].name);
        }
        expect(genderArray.includes('female')).to.be.equal(true);
        expect(genderArray.includes('male')).to.be.equal(true);
      });
  });
  it("API returns an empty result when top input is non-integer: float", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByGender",
        top: 1.1,
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        expect(response.text).to.be.equal("");
      });
  });
  it("API returns an empty result when top input is non-integer: letter", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByGender",
        top: "a",
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        expect(response.text).to.be.equal("");
      });
  });
  it("API returns an empty result when top input is non-integer: special character", async function ({
    supertest,
  }) {
    await supertest
      .request("https://census-toy.nceng.net")
      .post("/prod/toy-census")
      .send({
        actionType: "CountByGender",
        top: "?",
        users,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function (response) {
        expect(response.text).to.be.equal("");
      });
  });
});