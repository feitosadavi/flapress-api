import { ArticleModel } from '../models/article-model';

export type ArticleParams = Omit<ArticleModel,'id'>

export interface AddArticle {
	add (article: ArticleParams): Promise<ArticleModel>
}
