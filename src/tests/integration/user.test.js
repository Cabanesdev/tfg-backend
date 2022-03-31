const app = require('../server');
const request = require('supertest');

describe('Get /user', () => {
	test('Pagination User', async () => {
		const response = await request(app).get('/user?username=te').send();
		expect(response.statusCode).toBe(200);
		expect(response.body.data).toBeInstanceOf(Array);
		expect(response.body.data.length).toBe(3);
	});

	test('should responde a 200 status code', async () => {
		const response = await request(app).get('/user?username=te').send();
		expect(response.statusCode).toBe(200);
	});
});

describe('Post Create ---> Joi Validations', () => {
	test('should response an Error to Create', async () => {
		const response = await request(app).post('/user').send(joiData);
		expect(response.body.data).toBe('"email" must be a valid email');
	});
});

let joiData = {
	name: 'test',
	email: 'Test@slfkjhaskj',
	username: 'test',
	password: 'test',
};
