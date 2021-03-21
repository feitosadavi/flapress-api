import { AddArticleRepository } from '@/data/protocols/add-article-repository';
import { ArticleModel } from '@/domain/models/article-model';
import { AddArticle, ArticleParams } from '../../../domain/usecases/add-article';

export class DbAddArticle implements AddArticle {
	constructor(private readonly addArticleRepository: AddArticleRepository) { }

	async add (data: ArticleParams): Promise<ArticleModel> {
		return null;
	}
}
