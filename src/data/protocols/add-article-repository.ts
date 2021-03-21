import { ArticleModel } from '@/domain/models/article-model';
import { ArticleParams } from '@/domain/usecases/add-article';

export interface AddArticleRepository {
	add (article: ArticleParams): Promise<ArticleModel>
}
