import { AddArticleRepository } from '@/data/protocols/add-article-repository';
import { ArticleParams } from '@/domain/usecases/add-article';
import { MongoHelper } from '../helpers/mongo-helper';

export class ArticleMongoRepository implements AddArticleRepository {
	async add (article: ArticleParams): Promise<void> {
		const {category, title, body, source} = article;
		const articlesCollection = await MongoHelper.getCollection('articles');
		const res = await articlesCollection.insertOne({
			category,
			title,
			body,
			source,
			date: new Date()
		});
	}
}
