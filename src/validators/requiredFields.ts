export class RequiredFields {
	validate (article: string): string[] {

		const requiredFields = [ 'category', 'title', 'body', 'source' ];
		const messageFields = Object.keys(article); // pego os campos da mensagem

		const notFoundFields = [];
		for (const field of requiredFields) {
			!messageFields.includes(field) && notFoundFields.push(field);
		}

		return notFoundFields;
	}
}

// daquela outra forma para invalidFields
