import app from '../config/app';
import request from 'supertest';
import { MongoHelper } from '@/infra/mongodb/helpers/mongo-helper';
import env from '@/config/env';
import { Collection } from 'mongodb';

let articlesCollection: Collection;
describe('Article Routes', () => {
	beforeAll(async () => {
		await MongoHelper.connect(env.mongoUrl);
	});
	afterAll(async () => {
		await MongoHelper.disconnect();
	});

	beforeEach(async () => {
		articlesCollection = await MongoHelper.getCollection('articles');
		await articlesCollection.deleteMany({});
	});

	describe('POST /article', () => {
		test('Should return 204 on signup', async () => {
			await request(app)
				.post('/api/article')
				.send({
					category: 'Geral',
					title: 'Flamengo desiste de Rafinha',
					body: 'blablablabla...',
					source: 'ge.com.br',
				})
				.expect(204);
		});
	});
});
