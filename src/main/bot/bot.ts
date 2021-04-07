import { create, Whatsapp } from 'venom-bot';
import { ValidatorInterface } from '@/validators/protocols/validator-interface';
import fetch, { Response } from 'node-fetch';
import env from '@/config/env';

const messages = {
	NOT_ALLOWED: 'Você não tem autorização para postar notícias',
	SUCCESS: 'Notícia enviada!',
	ERROR: 'Ocorreu um erro!'
};

export class Bot {

	constructor(
		private client: Whatsapp,
		private readonly validator: ValidatorInterface,
		private target?: string
	) { }

	public async init (): Promise<void> {
		this.client = await create('session');
		this.start();
	}

	public start (): void {
		this.client.onMessage(async (message) => {
			try {
				this.target = message.from;

				if (env.admins.includes(this.target)) {
					const article = this.toObjectMessage(message.body);
					const notFoundFields = this.validator.validate(article);

					if (notFoundFields.notFoundFields.length > 0) {
						this.sendMessage(`O(s) seguinte(s) campo(s) não foram preenchidos: ${notFoundFields.notFoundFields}`);
						return null;
					}

					const body = JSON.stringify({ ...article });
					const response = await this.saveArticle(body);

					if (response.ok) this.sendMessage(messages.SUCCESS);
					else this.sendMessage(messages.ERROR);

				} else {
					this.sendMessage(messages.NOT_ALLOWED);
				}
			} catch (error) {
				console.log(error);
			}
		});
	}

	sendMessage (message: string): void {
		this.client.sendText(this.target, message);
	}

	async saveArticle (article: string): Promise<Response> {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: article
		};

		const res = await fetch('http://localhost:5050/api/article', options);
		return res;
	}

	toObjectMessage (message: string): any {
		const article = {};
		// transformo a mensagem em um objeto
		const splitedMessage = message.split(' ## ');
		splitedMessage.forEach((part, i) => {
			if (i % 2 === 0) {
				article[part] = splitedMessage[i + 1];
			}
		});
		return article;
	}
}
