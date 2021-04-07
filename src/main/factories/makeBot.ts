import { Bot } from '../bot/bot';
import { create } from 'venom-bot';
import { Validator } from '@/validators/validator.';
import { RequiredFields } from '@/validators/requiredFields';

export const makeBot = async (): Promise<Bot> => {
	const client = await create('session');

	const requiredFields = new RequiredFields();
	const validator = new Validator(requiredFields);

	return new Bot(client, validator);
};
