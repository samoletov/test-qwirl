export class Order {
    symbol: string;
    type: string;
    amount: number;

    constructor(type: string, symbol: string, amount: number) {
        this.type = type;
        this.symbol = symbol;
        this.amount = amount;
    }
}