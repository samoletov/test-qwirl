import { Component, OnInit } from '@angular/core';

import { OrderService } from '../order.service';
import { Order } from '../model/order';
import { BalanceService } from '../balance.service';
import { Observable , of} from 'rxjs';
import { QuoteService } from '../quote.service';
import {catchError, debounceTime, distinctUntilChanged, tap, switchMap} from 'rxjs/operators';
import { Quote } from '../model/quote';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  styles: [`.form-control { width: 300px; display: inline; }`]
})
export class OrderComponent implements OnInit {

  order: Order;
  error: string;
  price;

  searching = false;
  searchFailed = false;
  quoting = false;
  posting = false;

  constructor(private orderService: OrderService, private balanceService: BalanceService, private quoteService: QuoteService) { }

  ngOnInit() {
    this.order = new Order('buy', '', 1);
  }

  getQuote(symbol) {
    this.price = ''; this.quoting = true;
    symbol = symbol || this.order.symbol;
    this.quoteService.quote(symbol).subscribe((quote: Quote) => {
      this.quoting = false;
      this.price = quote.price;
    }, error => {
      this.price = 'Not found';
      this.quoting = false;
    });
  }

  add() {
    this.error = '';
    this.posting = true;
    // @ts-ignore: Typescript error TODO fix it
    if (this.order.symbol.symbol) {
      // @ts-ignore: Typescript error TODO fix it
      this.order.symbol = this.order.symbol.symbol;
    }
    this.orderService.add(this.order).subscribe(order => {
      this.balanceService.refreshBalance();
      this.posting = false;
    }, error => {
      this.error = error.error.message;
      this.posting = false;
    });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.quoteService.companies(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

    resultFormatSearch(value: any) {
      return value.symbol;
    }

    inputFormatSearch(value: any)   {
      if (value.symbol) {
        return value.symbol;
      }
      return value;
    }

    selectedItem(event){
      this.getQuote(event.item.symbol);
    }
}
