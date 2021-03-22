import { AddArticle } from '@/domain/usecases/add-article';
import { ArticleParams } from '@/domain/usecases/add-article';
import { HttpRequest } from '../protocols';
import { ArticleController } from './article-controller';
import MockDate from 'mockdate';

const mockRequest = (): HttpRequest => ({
	body: {
		category: 'any_category',
		title: 'any_title',
		body: 'any_body',
		date: new Date()
	}
});

const makeAddArticle = (): AddArticle => {
	class AddArticleStub implements AddArticle {
		async add (article: ArticleParams): Promise<void> {
			Promise.resolve(null);
		}
	}
	return new AddArticleStub();
};

type SutTypes = {
	sut: ArticleController,
	addArticleStub: AddArticle
}

const makeSut = (): SutTypes => {
	const addArticleStub = makeAddArticle();
	const sut = new ArticleController(addArticleStub);
	return {
		sut,
		addArticleStub
	};
};

describe('ArticleController', () => {
	beforeAll(() => {
		MockDate.set(new Date());
	});
	afterAll(() => {
		MockDate.reset();
	});
	test('Should call AddArticle with correct values', async () => {
		const { sut, addArticleStub } = makeSut();
		const addSpy = jest.spyOn(addArticleStub, 'add');
		await sut.handle(mockRequest());
		expect(addSpy).toHaveBeenCalledWith(mockRequest().body);
	});
});
