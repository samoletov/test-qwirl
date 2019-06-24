/**
 * Models for module
 */
class Shares {
  symbol: string;
  amount: number;

  constructor(symbol: string, amount: number) { 
    this.symbol = symbol;
    this.amount = amount;
  };
}

class Account { 

  balance: number;
  shares: Shares[];

  constructor(){
    this.balance = 1000000;
    this.shares = [new Shares('GOOG', 10)];
  }
};

class Quote {

  symbol: string;
  price: number; 
  constructor(symbol: string, price: number) { 
    this.symbol = symbol; 
    this.price = price; 
  };
}

class Company {
  symbol: string;
  name: string;
  constructor (symbol: string, name: string)  { 
    this.symbol = symbol;
    this.name = name;
  }
}

export {
  Account, Shares, Quote, Company
};
