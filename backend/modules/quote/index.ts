import { Application } from "express";

import AlphaVantage from './alphaVantage';
import ErrorResponses from "../../shared/errorHandling";

class QuoteService {

  client: AlphaVantage;

  constructor() {
    this.client = new AlphaVantage();
  }

  init(app: Application) {
    app.get('/quote/:symbol?', async (req: any, res: any) => {
      try {
        const quote = await this.client.getQuote(req.params.symbol);
        res.send(quote);
      } catch(err){
        res.status(400).send(ErrorResponses.ClientError(err.message));
      }
    });
    app.get('/companies', async (req: any, res: any) => {
      try {
        const quote = await this.client.search(req.query.query);
        res.send(quote);
      } catch(err){
        res.status(400).send(ErrorResponses.ClientError(err.message));
      }
  });
    return this;
  }

  async getQuote(symbol: string) {
    return await this.client.getQuote(symbol);
  }
}

export default QuoteService
