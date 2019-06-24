/* eslint-disable import/no-extraneous-dependencies */
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
import app from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);

describe('/GET google price', () => {
  it('it should GET images', (done) => {
    chai.request(app)
      .get('/quote/googl').then(res => {
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).price).greaterThan(1);
        done();
      });
  });
});

describe('/GET companies with text goo', () => {
  it('it should companies with text goo', (done) => {
    chai.request(app)
      .get('/companies?query=goo').then(res => {
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).length).greaterThan(1);
        done();
      });
  });
});
