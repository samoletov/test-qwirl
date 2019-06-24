import bodyParser from 'body-parser';

import { Application } from 'express';
import AccountService from '../account';
import QuoteService from '../quote';
import ErrorResponses from '../../shared/errorHandling';
import ClientError from '../../shared/clientError';

class OrdersService {

  init(app: Application, quoteModule: QuoteService, accountModule: AccountService) {
    app.use(bodyParser.json()).post('/orders', async (req: any, res: any) => {

      try {
        const amount = Number(req.body.amount);
        if (isNaN(amount)) {
          throw new ClientError('Amount not valid');
        }

        const quote = await quoteModule.getQuote(req.body.symbol);

        const { type } = req.body;

        if (type === 'buy') {
          accountModule.addShares(quote, amount);
        } else if (type === 'sell') {
          accountModule.removeShares(quote, amount);
        }
        res.send(accountModule.getAccount());
      } catch(error) {
        res.status(400).send(ErrorResponses.ClientError(error.message));
      }
    });
  }

}

export default OrdersService;