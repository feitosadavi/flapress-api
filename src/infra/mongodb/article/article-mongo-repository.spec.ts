import { MongoHelper } from '../helpers/mongo-helper';
import { ArticleMongoRepository } from './article-mongo-repository';
import {Collection} from 'mongodb';
import env from '@/config/env';


describe('Article Mongo Repository', () => {
	let articlesCollection: Collection;
	beforeAll(async () => {
		await MongoHelper.connect(env.mongoUrl);
	});
	afterAll(async () => {
		await MongoHelper.disconnect();
	});
	beforeEach(async () => {
		articlesCollection = await MongoHelper.getCollection('articles');
		articlesCollection.deleteMany({});
	});

	const makeSut = () => {
		return new ArticleMongoRepository();
	};

	test('Should create a article on success', async () => {
		const sut = makeSut();
		await sut.add({
			category: 'any_category',
			title: 'any_title',
			body: 'any_body',
			source: 'any_source.com',
			date: new Date()
		});

		const article = await articlesCollection.findOne({ title: 'any_title', body: 'any_body' });

		expect(article._id).toBeTruthy();
		expect(article.title).toBe('any_title');
	});
});
