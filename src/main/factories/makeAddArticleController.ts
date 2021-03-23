import { ArticleController } from '@/presentation/controllers/article-controller';
import {ArticleMongoRepository} from '@/infra/mongodb/article/article-mongo-repository';
import { Controller } from '@/presentation/protocols';

export const makeAddArticleController = (): Controller => {
	const addSurveyMongoRepository = new ArticleMongoRepository();
	return new ArticleController(addSurveyMongoRepository);
};
