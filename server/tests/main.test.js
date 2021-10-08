/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const Caterer = {
  id: 3,
  email: 'user-test@gmail.com',
  username: 'admin',
  password: 'passworD'
};

//homepage
describe('GET /', () =>{
  it('should return the homepage', (done) =>{
    chai.request(app)
    .get('/api/v1/')
    .end((err, res) =>{
      expect(res).to.have.status(200);
      expect(res.body.status).to.be.equal('success');
      done();
    })
  });
});

/*describe("'Bad Request' POST caterer/signin", () => {

});

describe('POSt caterer/signin', () => {

});
*/
//  Get 404
describe('GET page not found', () => {
  it('should return 404', (done) => {
    chai.request(app)
      .get('/api/v1/kjdfkjwkbw')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Not found');
        done();
      });
  });
});