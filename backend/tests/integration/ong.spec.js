const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
   await connection.migrate.rollback();
   //avoid errors
   await connection.migrate.latest();
    /* migrate the tables to test DB */

  });
  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const res = await request(app)
    .post('/ongs')
    //add param prop set(), to the Headers auth
      .send({
        name: "APAD2",
        email: "contato@apad.com.br",
        whatsapp: "1111111111",
        city: "São Luis",
        uf: "MA"

      });
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toHaveLength(8);

  });
});



