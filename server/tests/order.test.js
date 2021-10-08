/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const Order =	{
	id: 1,
	meal_title: 'Rice And Chicken',
	quantity: 2,
	amount: 700,
	delivery_address: 'house 33 ikeji',
	time_placed: new Date(2018, 4, 24, 8, 0 ),
	customerId: 1,
	catererId: 1
};

/*ORDER TESTS*/
describe('POST /orders', () =>{
  it('should create a new Order', (done) =>{
    chai.request(app)
    .post('/api/v1/orders')
    .send(Order)
    .end((err, res) =>{
      expect(res).to.have.status(201);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('success');
      done();
    });
  });

  it('should return 400 if no meal_title', (done) =>{
    chai.request(app)
    .post('/api/v1/orders')
    .send(
    {
      id: 1,
			quantity: 2,
			amount: 700,
			delivery_address: '3 Oshodi road',
			time_placed: new Date(2018, 4, 24, 8, 0 ),
			customerId: 1,
			catererId: 1
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('error');
      done();
    });
  });

  it('should return 400 if no quantity', (done) =>{
    chai.request(app)
    .post('/api/v1/orders')
    .send(
    {
      id: 1,
			meal_title: 'Beans And Bread',
			amount: 700,
			delivery_address: '3 Oshodi road',
			time_placed: new Date(2018, 4, 24, 8, 0 ),
			customerId: 1,
			catererId: 1
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('error');
      done();
    });
  });

  it('should return 400 if no delivery_address', (done) =>{
    chai.request(app)
    .post('/api/v1/orders')
    .send(
    {
      id: 1,
			meal_title: 'Beans And Bread',
			quantity: 2,
			amount: 700,
			time_placed: new Date(2018, 4, 24, 8, 0 ),
			customerId: 1,
			catererId: 1
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('error');
      done();
    });
  });

  it('should return 400 if quantity is not an integer', (done) =>{
    chai.request(app)
    .post('/api/v1/orders')
    .send(
    {
      id: 1,
      meal_title: 'Rice And Chicken',
      quantity: "test",
      amount: 700,
      delivery_address: 'house 33 ikeji',
      time_placed: new Date(2018, 4, 24, 8, 0 ),
      customerId: 1,
      catererId: 1
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.quantity).to.not.be.a('string');
      done();
    });
  });

});

describe('GET /orders', () =>{
  it('should return orders for the day', (done) =>{
    chai.request(app)
    .get('/api/v1/orders/:catererId')
    .send(Order)
    .end((err, res) =>{
      expect(res).to.have.status(200);
      expect(res.body.status).to.be.equal('success');
      done();
    });
  });
});

describe('PUT /orders/:orderId', () =>{
  it('should successful update a meal', (done) =>{
    chai.request(app)
    .put(`/api/v1/orders/1`)
    .send(
    {
    	id: 1,
			meal_title: 'Beans And Bread',
			quantity: 2,
			amount: 700,
			delivery_address: '3 oshodi road',
			time_placed: new Date(2018, 4, 24, 8, 0 ),
			customerId: 1,
			catererId: 1
    })
    .end((err, res) =>{
      expect(res).to.have.status(201);
      expect(res).to.be.a('object');
      done();
    });
  });

  it('should return 400 if meal not found', (done) =>{
    chai.request(app)
    .put('/api/v1/orders/9')
    .send({
      id: 1,
			meal_title: 'Rice And Chicken',
			quantity: 2,
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

  it('should return 400 if fields are missing', (done) =>{
    chai.request(app)
    .put(`/api/v1/orders/1`)
    .send({
      id: 1,
			amount: 700,
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
});