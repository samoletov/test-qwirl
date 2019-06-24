import ClientError from '../../shared/clientError'
import { Account, Shares, Quote } from '../../models/models';
import { Application } from 'express';
import ErrorResponses from '../../shared/errorHandling';

class AccountService {
  private account: Account;

  constructor() {
    this.account = new Account();
  }

  init(app: Application) {

    app.get('/account/balance', (req, res) => {
      res.send(this.account);
    });
    app.patch('/account/balance', (req, res) => {
      try {
        const amount = Number(req.body.amount);
        if (isNaN(amount)) {
          throw new ClientError('Amount not valid');
        }
        if (amount > 0) {
          this.addToBalance(amount);
        } else {
          this.removeFromBalance(-amount);
        }
      
        res.send(this.account);
      } catch(error) {
        res.status(400).send(ErrorResponses.ClientError(error.message));  
      }
    });
    return this;
  }

  addToBalance(amount: number) {
    this.account.balance += amount;
  }

  removeFromBalance(amount: number) {
    if (this.account.balance < amount) {
      throw new ClientError('Not enough balance')
    }
    this.account.balance -= amount;
  }

  getAccount() {
    return this.account;
  }

  addShares(quote: Quote, amount: number) {
    const total = quote.price * amount;

    this.removeFromBalance(total);

    let index = this.account.shares.findIndex((obj => obj.symbol == quote.symbol));
    if (index === -1) {
      this.account.shares.push(new Shares(quote.symbol, amount))
    } else {
      this.account.shares[index].amount += amount;
    }
  }

  removeShares(quote: Quote, amount: number) {
    const total = quote.price * amount;

    let index = this.account.shares.findIndex(((obj: any) => obj.symbol == quote.symbol));
    if (index === -1) {
      throw new ClientError(`You have no shares ${quote.symbol}`);
    } else {
      if (amount > this.account.shares[index].amount) {
        throw new ClientError(`You have no enough shares`)
      }
      this.account.shares[index].amount -= amount;
    }
    this.addToBalance(total);
  }
}

export default AccountService;
