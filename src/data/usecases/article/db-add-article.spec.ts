import { AddArticleRepository } from '@/data/protocols/add-article-repository';
import { ArticleParams } from '@/domain/usecases/add-article';
import {DbAddArticle} from './db-add-article';
import MockDate from 'mockdate';
import { mockArticleParams } from '@/domain/tests/article';

const makeAddArticleRepository = (): AddArticleRepository => {
	class AddArticleRepositoryStub implements AddArticleRepository {
		async add (data: ArticleParams): Promise<void> {
			return Promise.resolve();
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

	test('Should throw if add throws', async () => {
		const { sut } = makeSut();
		jest.spyOn(sut, 'add').mockReturnValueOnce(Promise.reject(new Error()));
		const promise = sut.add(mockArticleParams());
		expect(promise).rejects.toThrow();
	});
});
