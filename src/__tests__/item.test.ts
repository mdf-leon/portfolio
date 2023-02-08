import { expect } from 'chai';
import request from 'supertest';
import app from '../index';

describe('Items API', () => {
  it('Should return an empty array of items', async () => {
    const res = await request(app).get('/api/item');
    expect(res.status).to.equal(200);
    expect(res.body.items).to.be.an('array').that.is.empty;
  });
});