import chai from "chai";
import chaiHttp from "chai-http";

const expect = chai.expect;
const baseUrl = "http://localhost:8000";

chai.use(chaiHttp);

describe("Index Test", () => {
  it("server is live", function (done) {
    chai
      .request(baseUrl)
      .get("/")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
