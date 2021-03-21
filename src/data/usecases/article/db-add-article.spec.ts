import { AddArticleRepository } from '@/data/protocols/add-article-repository';
import { ArticleModel } from '@/domain/models/article-model';
import { ArticleParams } from '@/domain/usecases/add-article';
import {DbAddArticle} from './db-add-article';
import MockDate from 'mockdate';

const mockArticleParams = (): ArticleParams => ({
	category: 'any_category',
	title: 'any_title',
	body: 'any_body',
	date: new Date()
});

const mockArticleModel = (): ArticleModel => ({
	id: 'any_id',
	category: 'any_category',
	title: 'any_title',
	body: 'any_body',
	date: new Date()
});

const makeAddArticleRepository = (): AddArticleRepository => {
	class AddArticleRepositoryStub implements AddArticleRepository {
		async add (data: ArticleParams): Promise<ArticleModel> {
			return Promise.resolve(mockArticleModel());
		}
	}
	return new AddArticleRepositoryStub();
};

type SutTypes = {
	addArticleRepositoryStub: AddArticleRepository,
	sut: DbAddArticle
}

const makeSut = (): SutTypes => {
	const addArticleRepositoryStub = makeAddArticleRepository();
	const sut = new DbAddArticle(addArticleRepositoryStub);
	return {
		addArticleRepositoryStub,
		sut
	};
};

describe('DbAddArticle', () => {
	beforeAll(() => {
		MockDate.set(new Date());
	});
	afterAll(() => {
		MockDate.reset();
	});

	test('Should call add with correct values', async () => {
		const { sut } = makeSut();
		const addSpy = jest.spyOn(sut, 'add');
		await sut.add(mockArticleParams());
		expect(addSpy).toHaveBeenCalledWith(mockArticleParams());
	});

	test('Should return void on add success', async () => {
		const { sut } = makeSut();
		jest.spyOn(sut, 'add');
		const article = await sut.add(mockArticleParams());
		expect(article).toBeUndefined();
	});
});
