/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const Menu = {
  id: 3,
  catererId: 1,
  title: 'Fried Yam And Egg'
};

/*MENU TEST*/
describe('POST /menu/:catererId', () =>{
  it('should set menu', (done) =>{
    chai.request(app)
    .post('/api/v1/menu/1')
    .send(Menu)
    .end((err, res) =>{
      expect(res).to.have.status(201);
      expect(res.body.status).to.equal('success');
      done();
    });    
  });

  it('should return 400 if title not set', (done) =>{
    chai.request(app)
    .post('/api/v1/menu/1')
    .send({
      id: 4,
      catererId: 2
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res.body.status).to.be.equal('error');
      done();
    });
  });
});

describe('GET /menu', () =>{
  it('should return menu for the day', (done) =>{
    chai.request(app)
    .get('/api/v1/menu')
    .send(Menu)
    .end((err, res) =>{
      expect(res).to.have.status(200);
      expect(res.body.status).to.be.equal('success');
      done();
    });
  });
});
