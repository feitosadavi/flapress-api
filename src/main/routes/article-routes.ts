import {Router} from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddArticleController } from '../factories/makeAddArticleController';

export default (router: Router): void => {
	router.post('/article', adaptRoute(makeAddArticleController()));
};
