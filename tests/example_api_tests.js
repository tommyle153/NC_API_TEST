describe('example tests with GET and POST', () => {
    it('grabs random activity with GET', async function({supertest}) {
        await supertest
          .request("https://www.boredapi.com/api")
          .get("/activity")
          .expect(200)
          .expect('Content-Type', /json/)
          .then(function(response){
            expect(JSON.parse(response.text).activity).to.be.exist;
          });
      });

    it('creates a new pet object with POST', async function({supertest}) {
      await supertest
        .request("https://petstore.swagger.io/v2")
        .post("/pet")
        .send({
          "id": 0,
          "category": {
            "id": 0,
            "name": "string"
          },
          "name": "doggie",
          "photoUrls": [
            "string"
          ],
          "tags": [
            {
              "id": 0,
              "name": "string"
            }
          ],
          "status": "available"
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function(response){
            expect(response._body.name).to.be.equal("doggie");
        });
    });  
})
  