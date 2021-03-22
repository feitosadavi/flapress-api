import { ArticleModel } from '../models/article-model';
import { ArticleParams } from '../usecases/add-article';

export const mockArticleParams = (): ArticleParams => ({
	category: 'any_category',
	title: 'any_title',
	body: 'any_body',
	date: new Date()
});

export const mockArticleModel = (): ArticleModel => ({
	id: 'any_id',
	category: 'any_category',
	title: 'any_title',
	body: 'any_body',
	date: new Date()
});

