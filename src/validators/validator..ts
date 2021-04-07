import { Fields, ValidatorInterface } from '@/validators/protocols/validator-interface';
import { RequiredFields } from './requiredFields';

export class Validator implements ValidatorInterface {
	constructor(private readonly requiredFields: RequiredFields) { }

	validate (message: string): Fields {
		const notFoundFields = this.requiredFields.validate(message);

		return {
			notFoundFields
		};
	}
}
