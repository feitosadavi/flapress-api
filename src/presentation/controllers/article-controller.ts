import { AddArticle } from '@/domain/usecases/add-article';
import { noContent, serverError } from '../helpers/http';
import { Controller, HttpRequest, HttpResponse } from '../protocols';

export class ArticleController implements Controller {
	constructor(private readonly addArticle: AddArticle) { }

	async handle (request: HttpRequest): Promise<HttpResponse> {
		try {
			await this.addArticle.add(request.body);
			return noContent();
		} catch (error) {
			return serverError(error);
		}
	}
}
