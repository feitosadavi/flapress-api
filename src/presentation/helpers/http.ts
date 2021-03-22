import { HttpResponse } from '../protocols';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const success = (data: any): HttpResponse => ({
	statusCode: 200,
	body: data
});

export const noContent = (): HttpResponse => ({
	statusCode: 204,
	body: null
});
