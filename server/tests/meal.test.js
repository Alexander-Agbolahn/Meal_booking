/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const Meal ={
  id: 5,
  title: 'test meal',
  price: 350,
  imageurl: 'images/testMeal.jpg',
  available: false,
  catererId: 1
}


/*MEAL TESTS*/
describe('POST /meals', () =>{
  it('should create a new meal', (done) =>{
    chai.request(app)
    .post('/api/v1/meals')
    .send(Meal)
    .end((err, res) =>{
      expect(res).to.have.status(201);
      expect(res).to.be.a('object');
      expect(res.body.status).to.equal('success');
      done();
    });
  });

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

  it('should return 400 if no price', (done) =>{
    chai.request(app)
    .post('/api/v1/meals')
    .send(
    {
      id: 1,
      title: 'testMeal',
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

  it('should return 400 if no image', (done) =>{
    chai.request(app)
    .post('/api/v1/meals')
    .send(
    {
      id: 1,
      title: 'testMeal',
      price: 350,
      imageurl: '',
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

  it('should return 400 if meal already exists', (done) => {
    chai.request(app)
      .post('/api/v1/meals')
      .send({
        id: 2,
        title: 'test meal',
        price: 350,
        imageurl: 'images/test.jpg',
        available: false,
        catererId: 1
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.title).to.not.be.equal('test meal');
        done();
      });
  });

  it('should return 400 if price is not an integer', (done) =>{
    chai.request(app)
    .post('/api/v1/meals')
    .send(
    {
      id: 5,
      title: 'test meal',
      price: "350",
      imageurl: 'images/testMeal.jpg',
      available: false,
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


describe('DELETE /meals/:catererId/:id', () =>{
  it('should successful remove a meal', (done) =>{
    chai.request(app)
    .delete(`/api/v1/meals/1/1`)
    .send({
      id: 1,
      title: 'Rice with chicken',
      price: 350,
      imageurl: 'images/ricechicken.jpg',
      available: false,
      catererId: 1,
    })
    .end((err, res) =>{
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      done();
    });
  });

  it('should return 400 if meal not found', (done) =>{
    chai.request(app)
    .delete(`/api/v1/meals/1/5`)
    .send({
      id: 1,
      title: 'Rice with chicken',
      price: 350,
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
});

describe('PUT /meals/:catererId/:id', () =>{
  it('should successful update a meal', (done) =>{
    chai.request(app)
    .put(`/api/v1/meals/1/1`)
    .send({
      id: 1,
      title: 'Rice and chicken',
      price: 350,
      imageurl: 'images/ricechicken.jpg',
      available: false,
      catererId: 1,
    })
    .end((err, res) =>{
      expect(res).to.have.status(201);
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

  it('should return 400 if fields are missing', (done) =>{
    chai.request(app)
    .put(`/api/v1/meals/1/1`)
    .send({
      id: 5,
      available: false,
      catererId: 1,
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      done();
    });
  });

  it('should return 400 if updated price is not an integer', (done) =>{
    chai.request(app)
    .put('/api/v1/meals/1/1')
    .send(
    {
      id: 1,
      title: 'test meal',
      price: '350',
      imageurl: 'images/testMeal.jpg',
      available: false,
      catererId: 1
    })
    .end((err, res) =>{
      expect(res).to.have.status(400);
      expect(res).to.be.a('object');
      expect(res.body.price).to.not.be.a('string');
      done();
    });
  });
});

describe('GET /meals', () =>{
  describe('GET /meals/:catererId', () =>{
    it('should return 200', (done) =>{
      chai.request(app)
      .get(`/api/v1/meals/1`)
      .send(Meal)
      .end((err, res) =>{
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        done();
      });
    });

    it('should return 200 ', (done) =>{
      chai.request(app)
      .get(`/api/v1/meals`)
      .end((err, res) =>{
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        done();
      });
    });
  });


  describe('GET /meals/:catererId/:id', () =>{
    it('should return 404 if not found', (done) =>{
      chai.request(app)
      .get(`/api/v1/meals/1/9`)
      .send({Meal})
      .end((err, res) =>{
        expect(res).to.have.status(404);
        expect(res).to.be.a('object');
        done();
      });
    });

    it('should return 200', (done) =>{
      chai.request(app)
      .get(`/api/v1/meals/1/1`)
      .send(Meal)
      .end((err, res) =>{
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        done();
      });
    });
  });
});
