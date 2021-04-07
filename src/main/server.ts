import 'module-alias/register';
import env from '@/config/env';
import { MongoHelper } from '@/infra/mongodb/helpers/mongo-helper';
import { makeBot } from './factories/makeBot';

MongoHelper.connect(env.mongoUrl)
	.then(async () => {
		const app = (await import('./config/app')).default;
		app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));

		const bot = await makeBot();
		bot.start();

		console.log('Bot is running');
	});
