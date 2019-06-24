import { Component, OnInit } from '@angular/core';

import { BalanceService } from '../balance.service';
import { Balance } from '../model/balance';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  balance: Balance;
  adjustingBalance = false;
  adjust: {
    amount: number
  };

  constructor(private balanceService: BalanceService) { }

  ngOnInit() {
    this.adjust = {
      amount: 1000
    };
    this.getBalance();
    // @ts-ignore: Typescript error TODO fix it
    this.balanceService.currentBalance.subscribe(balance => this.balance = balance);
  }

  getBalance() {
    this.balanceService.getBalance().subscribe(balance => this.balance = balance);
  }

  adjustBalance() {
    this.adjustingBalance = !this.adjustingBalance;
  }

  addToBalance() {
      this.balanceService.addToBalance(this.adjust.amount).subscribe(balance => {
        this.balance = balance;
        this.adjustingBalance = false;
      });
  }

  removeFromBalance() {
    this.balanceService.removeFromBalance(this.adjust.amount).subscribe(balance => {
      this.balance = balance;
      this.adjustingBalance = false;
    });
  }

}
