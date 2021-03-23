import {Express, Router} from 'express';
import { readdirSync } from 'fs';


export default async (app: Express): Promise<void> => {
	const router = Router();
	app.use('/api', router);
	readdirSync(`${__dirname}/../routes`).map((async (file) => {
		if (!file.includes('.test.')) {
			(await import(`${__dirname}/../routes/${file}`)).default(router);
		}
	}));
};
