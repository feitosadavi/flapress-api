import { AddArticleRepository } from '@/data/protocols/add-article-repository';
import { ArticleParams } from '@/domain/usecases/add-article';
import { MongoHelper } from '../helpers/mongo-helper';

export class ArticleMongoRepository implements AddArticleRepository {
	async add (article: ArticleParams): Promise<void> {
		const articlesCollection = await MongoHelper.getCollection('articles');
		await articlesCollection.insertOne(article);
	}
}
