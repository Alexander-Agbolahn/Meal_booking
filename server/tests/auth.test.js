/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const Caterer = {
	id: 1,
	name: 'EmmaStore',
	username: 'emmz',
	email: 'testuser@gmail.com',
	password: 'pazzw0rd',
	role: 'caterer'
}

const User = {
	id: 2,
	name: 'Micheal',
	username: 'mikkyb',
	email: 'mikkyb@gmail.com',
	password: 'pa22w0rd',
	role: 'user'
}

let catererToken ;
let userToken;

describe('Users', () => {
	before((done) =>{
		chai.request(app)
			.post('/api/v1/user/signup')
			.send(Caterer)
			.end((err, res) => {
				catererToken = res.body.token;
				console.log(catererToken);
				done();
			});
	});

	before((done) =>{
		chai.request(app)
			.post('/api/v1/user/signup')
			.send(User)
			.end((err, res) => {
				userToken = res.body.token;
				done();
			});
	});
})

//  POST - Sign up
describe('POST /signup', () => {
  //  POST - Should create a new User
  it('should create new user', (done) => {
    chai.request(app)
      .post('/api/v1/user/signup')
      .set('Authorization', `Bearer ${userToken}`)
      .send(User)
      .end((err, res) => {
      	expect(res).to.have.status(201);
      	expect(res.body.user.name).to.equal('Micheal');
      	expect(res.body.user.username).to.equal('mikkyb');
        done();
      });
  });

  it('should return 400 if no email', (done) => {
    chai.request(app)
      .post('/api/v1/user/signup')
      .send({
        name: 'Jay',
				username: 'jay',
				password: 'pa22w0rd',
				role: 'user'        
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal('error');
        done();
      });
  });

  // POST Sign up- should return 400 if no password
  it('should return 400 if no password', (done) => {
    chai.request(app)
      .post('/api/v1/user/signup')
      .send({
        name: 'Jay',
				username: 'jay',
				email: 'jay@gmail.com',
				role: 'user'        
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal('error');
        done();
      });
  });

   // POST Sign up- should return 400 if no role
  it('should return 400 if no role', (done) => {
    chai.request(app)
      .post('/api/v1/user/signup')
      .send({
        name: 'Jay',
				username: 'jay',
				email: 'jay@gmail.com',
				password: 'pass'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal('error');
        done();
      });
  });

  // POST Sign up- should return 409 if email exists already
 /* it('should return 409 if no role', (done) => {
    chai.request(app)
      .post('/api/v1/user/signup')
      .send({
        name: 'Jay',
				username: 'jay',
				email: 'mikkyb@gmail.com',
				password: 'pass',
				role: 'user'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal('error');
        done();
      });
  });*/

});

//  Post Log in - Should Login Successfully
describe('POST user/signin/', () => {
  it('should authenticate successfully', (done) => {
    chai.request(app)
      .post('/api/v1/user/signin')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        email: User.email,
        password: User.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 401 if password not valid', (done) => {
    chai.request(app)
      .post('/api/v1/user/signin')
      .send({
        email: User.email,
        password: 'james',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal('error');
        done();
      });
  });

  it('should return 401 if email not valid', (done) => {
    chai.request(app)
      .post('/api/v1/user/signin')
      .send({
        email: 'wrongemail@gmail.com',
        password: User.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal('error');
        done();
      });
  });

});