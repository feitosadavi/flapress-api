import { AddArticle } from '@/domain/usecases/add-article';
import { noContent } from '../helpers/http';
import { Controller, HttpRequest, HttpResponse } from '../protocols';

export class ArticleController implements Controller {
	constructor(private readonly addArticle: AddArticle) { }

	async handle (request: HttpRequest): Promise<HttpResponse> {
		await this.addArticle.add(request.body);
		return noContent();
	}
}
