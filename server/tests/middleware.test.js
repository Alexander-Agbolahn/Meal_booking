/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

/*MEAL TESTS*/
describe('POST /meals', () =>{
  it('should return 400 if no title', (done) =>{
    chai.request(app)
    .post('/api/v1/meals')
    .send(
    {
      id: 1,
      title: '',
      price: 350,
      imageurl: 'sample.jpg',
      available: false,
      catererId: 2
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('error');
      done();
    });
  });
});

describe('POST /orders', () =>{
  it('should return 400 if no catererId', (done) =>{
    chai.request(app)
    .post('/api/v1/orders')
    .send(
    {
      id: 1,
      meal_title: 'food test',
      quantity: 2,
      amount: 700,
      delivery_address: '3 Oshodi road',
      time_placed: new Date(2018, 4, 24, 8, 0 ),
      customerId: 1
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('error');
      done();
    });
  });

  it('should return 400 if catererId is not a number', (done) =>{
    chai.request(app)
    .post('/api/v1/orders')
    .send(
    {
      id: 1,
      meal_title: 'food test',
      quantity: 2,
      amount: 700,
      delivery_address: '3 Oshodi road',
      time_placed: new Date(2018, 4, 24, 8, 0 ),
      customerId: 1,
      catererId: 'id'
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('error');
      done();
    });
  });

  it('should return 400 if no customerId', (done) =>{
    chai.request(app)
    .post('/api/v1/orders')
    .send(
    {
      id: 1,
      meal_title: 'food test',
      quantity: 2,
      amount: 700,
      delivery_address: '3 Oshodi road',
      time_placed: new Date(2018, 4, 24, 8, 0 ),
      catererId: 1
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('error');
      done();
    });
  });

  it('should return 400 if customerId is not a number', (done) =>{
    chai.request(app)
    .post('/api/v1/orders')
    .send(
    {
      id: 1,
      meal_title: 'food test',
      quantity: 2,
      amount: 700,
      delivery_address: '3 Oshodi road',
      time_placed: new Date(2018, 4, 24, 8, 0 ),
      customerId: 'id',
      catererId: 1
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('error');
      done();
    });
  });

  it('should return 400 if meal not found', (done) =>{
    chai.request(app)
    .put('/api/v1/orders/9')
    .send({
      id: 1,
      meal_title: 'Rice And Chicken',
      quantity: 'quan',
      amount: 700,
      delivery_address: 'house 33 ikeji',
      time_placed: new Date(2018, 4, 24, 8, 0 ),
      customerId: 1,
      catererId: 1
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      done();
    });
  });


  it('should return 400 if meal not found', (done) =>{
    chai.request(app)
    .put(`/api/v1/meals/1/5`)
    .send({
      id: 5,
      title: 'Rice with chicken',
      price: 'price',
      imageurl: 'images/ricechicken.jpg',
      available: false,
      catererId: 1,
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      done();
    });
  });

  it('should return 400 if meal not found', (done) =>{
    chai.request(app)
    .put(`/api/v1/meals/1/5`)
    .send({
      id: 5,
      title: 'Rice with chicken',
      price: 350,
      available: false,
      catererId: 1,
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      done();
    });
  });

  it('should return 400 if catererId is not a number', (done) =>{
    chai.request(app)
    .post('/api/v1/meals')
    .send(
    {
      id: 1,
      title: '',
      price: 350,
      imageurl: 'sample.jpg',
      available: false,
      catererId: 'cat'
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('error');
      done();
    });
  });

  it('should return 400 if no catererId', (done) =>{
    chai.request(app)
    .post('/api/v1/meals')
    .send(
    {
      id: 1,
      title: 'food test',
      price: 350,
      imageurl: 'sample.jpg',
      available: false
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('error');
      done();
    });
  });

  it('should return 400 if price is not a number', (done) =>{
    chai.request(app)
    .post('/api/v1/meals')
    .send(
    {
      id: 1,
      title: 'food test',
      imageurl: 'sample.jpg',
      price: 'price',
      available: false,
      catererId: 1
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('error');
      done();
    });
  });


  it('should return 400 if caterer email invalid', (done) => {
    chai.request(app)
    .post('/api/v1/caterer/signup')
    .send({
      id: 1,
      username: 'solz',
      password: 'slim'
    })
    .end((err, res) => {
      expect(res).to.have.status(400);
      done();
    });
  });
});