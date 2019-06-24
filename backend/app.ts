import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import config from './config';
import logger from './shared/logger';
import ErrorResponses from './shared/errorHandling';
import QuoteService from './modules/quote';
import AccountService from './modules/account';
import OrdersService from './modules/orders';

const app: express.Application = express();
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (_, res) => res.send('API'));

app.use(cors());
const quoteModule = new QuoteService().init(app);
const accountModule = new AccountService().init(app);
new OrdersService().init(app, quoteModule, accountModule);

app.use((_, res) => {
  res.status(404).send(ErrorResponses.NotFound);
});

app.listen(config.port, () => logger.info(`App listening on port ${config.port}`));

export default app;
